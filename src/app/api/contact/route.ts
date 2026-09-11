import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
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

    // 4. Submit to Web3Forms API with 8-second timeout
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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

    const data = await response.json();

    if (!response.ok || !data.success) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to submit message to Web3Forms",
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
