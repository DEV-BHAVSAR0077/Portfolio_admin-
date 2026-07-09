import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { fetchPortfolioData } from "@/lib/api";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await fetchPortfolioData();

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading portfolio data or CMS is unavailable...</div>;
  }

  return (
    <div className="w-full flex flex-col">
      <HeroSection data={data.home} />
      <AboutSection data={data.about} />
      <SkillsSection data={data.skills} sectionData={data.skill_section} />
      <ExperienceSection data={data.experiences} education={data.education} />
      <ProjectsSection data={data.projects} />
      <ServicesSection data={data.services} />
      <AchievementsSection data={data.achievements} />
      <ContactSection settings={data.settings} socialMedia={data.social_media} />
    </div>
  );
}
