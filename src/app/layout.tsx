import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { fetchPortfolioData } from "@/lib/api";
import { defaultPortfolioData } from "@/lib/defaultData";

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

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Dev Bhavsar | AI Engineer & Full Stack Developer",
  description: "Building AI-Powered Applications, Intelligent Automations, and Scalable Full-Stack Products. Portfolio of Dev Bhavsar, AI/ML Engineer and Full Stack Developer.",
  keywords: ["Dev Bhavsar", "AI Engineer", "Full Stack Developer", "Machine Learning", "Laravel", "React", "Next.js", "Portfolio"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settingsData = defaultPortfolioData.settings;
  let socialMediaData = defaultPortfolioData.social_media;
  let homeData = defaultPortfolioData.home;

  try {
    const data = await fetchPortfolioData();
    if (data) {
      settingsData = data.settings || defaultPortfolioData.settings;
      socialMediaData = data.social_media?.length ? data.social_media : defaultPortfolioData.social_media;
      homeData = data.home || defaultPortfolioData.home;
    }
  } catch (error) {
    console.warn("Using default layout data:", error);
  }

  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans relative" suppressHydrationWarning>
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
