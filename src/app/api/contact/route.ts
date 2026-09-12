import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

// In-memory rate limiter: max 5 requests per 10 minutes per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Periodic cleanup if map grows too large
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // 0. Rate limiting check
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many messages sent. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // 1. Validate payload with Zod
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form input",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message, botcheck } = validation.data;

    // 2. Anti-spam honeypot check
    if (botcheck) {
      // Quietly reject bot submissions
      return NextResponse.json({
        success: true,
        message: "Message processed successfully",
      });
    }

    // 3. Web3Forms API Key from environment
    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey || accessKey === "your_web3forms_access_key_here") {
      // In local dev without key configured, log and return graceful simulated success
      console.warn(
        "Web3Forms access key not configured. Mocking successful submission."
      );
      return NextResponse.json({
        success: true,
        message:
          "Form received in development mode! Add your Web3Forms access key in .env.local for real email delivery.",
      });
    }

    // Forward client headers to satisfy Cloudflare/WAF policies
    const clientUserAgent =
      request.headers.get("user-agent") ||
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
    const clientReferer = request.headers.get("referer") || "http://localhost:3000";

    // 4. Submit to Web3Forms API with 8-second timeout
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": clientUserAgent,
        Referer: clientReferer,
      },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject: `[Portfolio Contact] ${subject}`,
        message,
        from_name: name,
      }),
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await response.json().catch(() => null) : null;

    if (!response.ok || !data?.success) {
      console.warn(
        "Web3Forms upstream submission failure:",
        response.status,
        data?.message || "(non-JSON response)"
      );

      return NextResponse.json(
        {
          success: false,
          message:
            data?.message ||
            "Failed to submit message to Web3Forms. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message delivered successfully!",
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "TimeoutError") {
      return NextResponse.json(
        {
          success: false,
          message: "Upstream contact service timed out. Please email directly.",
        },
        { status: 504 }
      );
    }

    console.error("Error processing contact form:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
