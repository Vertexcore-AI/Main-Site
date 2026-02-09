import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import { BusinessProfileHeader } from "@/components/business-profile-header";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "VertexCore AI - Transforming Ideas into Digital Solutions",
    template: "%s | VertexCore AI",
  },
  description:
    "Revolutionary technology solutions, AI-powered systems, and enterprise software engineering that drive growth and innovation for forward-thinking businesses.",
  keywords: [
    "AI Solutions",
    "Digital Transformation",
    "Enterprise Software",
    "Web Development",
    "Mobile Apps",
    "VertexCore AI",
    "Artificial Intelligence",
    "Business Automation",
  ],
  authors: [{ name: "VertexCore AI Team" }],
  creator: "VertexCore AI",
  publisher: "VertexCore AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vertexcore.ai"), // Update with actual domain if different
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vertexcore.ai",
    siteName: "VertexCore AI",
    title: "VertexCore AI - Intelligence That Shapes The Future",
    description:
      "Transforming ideas into powerful digital solutions with cutting-edge AI technology.",
    images: [
      {
        url: "/images/og-image.png", // Ensure this exists or I'll need to create/find it
        width: 1200,
        height: 630,
        alt: "VertexCore AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VertexCore AI",
    description: "Building the intelligence that shapes the future.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/images/newlogo.png",
    shortcut: "/images/newlogo.png",
    apple: "/images/newlogo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <BusinessProfileHeader />
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
