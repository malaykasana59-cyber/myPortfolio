import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { MouseSpotlight } from "@/components/ui/MouseSpotlight";
import { CommandMenu } from "@/components/ui/CommandMenu";
import { Toaster } from "sonner";
import { profileData } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profileData.name} | ${profileData.title}`,
  description: profileData.bio,
  keywords: [
    "Malay Kasana",
    "Delhi Technological University",
    "DTU",
    "Software Engineering",
    "C++ Developer",
    "Data Structures & Algorithms",
    "Backend Developer",
    "Python Developer",
    "PostgreSQL",
    "SQL Database Design",
  ],
  authors: [{ name: profileData.name, url: "https://github.com/malaykasana59-cyber" }],
  creator: profileData.name,
  metadataBase: new URL("https://malaykasana.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://malaykasana.dev",
    title: `${profileData.name} — Software Engineering Student @ DTU`,
    description: profileData.bio,
    siteName: `${profileData.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileData.name} | Software Engineering Student @ DTU`,
    description: profileData.bio,
    creator: "@JuluK480096",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-primary/20 selection:text-primary relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <ScrollProgress />
          <MouseSpotlight />
          <CommandMenu />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
