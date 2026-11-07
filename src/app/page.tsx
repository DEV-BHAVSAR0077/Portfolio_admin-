import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { fetchPortfolioData } from "@/lib/api";
import { defaultPortfolioData } from "@/lib/defaultData";

export const revalidate = 60;

export default async function Home() {
  const data = (await fetchPortfolioData()) || defaultPortfolioData;

  return (
    <div className="w-full flex flex-col">
      <HeroSection data={data.home} />
      <AboutSection data={data.about} />
      <SkillsSection data={data.skills} sectionData={data.skill_section} />
      <ExperienceSection data={data.experience_section} />
      <ProjectsSection data={data.projects} sectionData={data.project_section} />
      <ServicesSection data={data.services} />
      <AchievementsSection data={data.project_section?.stats || data.achievements} />
      <ContactSection settings={data.settings} socialMedia={data.social_media} />
    </div>
  );
}
