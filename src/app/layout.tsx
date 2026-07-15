import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Dev Bhavsar | AI Engineer & Full Stack Developer",
  description: "Building AI-Powered Applications, Intelligent Automations, and Scalable Full-Stack Products. Portfolio of Dev Bhavsar, AI/ML Engineer and Full Stack Developer.",
  keywords: ["Dev Bhavsar", "AI Engineer", "Full Stack Developer", "Machine Learning", "Laravel", "React", "Next.js", "Portfolio"],
};

import { fetchPortfolioData } from "@/lib/api";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settingsData = null;
  let socialMediaData = [];
  let homeData = null;
  try {
    const data = await fetchPortfolioData();
    if (data) {
      settingsData = data.settings;
      socialMediaData = data.social_media || [];
      homeData = data.home;
    }
  } catch (error) {
    console.error("Failed to fetch layout data", error);
  }

  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans relative">
        <SmoothScrollProvider>
          <CustomCursor />
          <ScrollIndicator />
          <Navbar settings={settingsData} socialMedia={socialMediaData} home={homeData} />
          <main className="flex-1 flex flex-col relative">{children}</main>
          <Footer settings={settingsData} socialMedia={socialMediaData} homeData={homeData} />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
