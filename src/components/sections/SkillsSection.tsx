"use client";

import { useRef, useMemo, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { getImageUrl } from "@/lib/api";
import { useScrollLock } from "@/hooks/useScrollLock";

const skillCategories = [
  {
    title: "Artificial Intelligence",
    skills: ["Machine Learning", "Generative AI", "LLMs", "Prompt Engineering", "AI Agents", "NLP", "OpenAI API", "Python"]
  },
  {
    title: "Full Stack",
    skills: ["PHP", "Laravel", "React", "Next.js", "TypeScript", "Node.js", "Express.js", "REST APIs", "JWT", "MVC"]
  },
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "Tailwind CSS", "Bootstrap", "Responsive Design", "Modern UI"]
  },
  {
    title: "Backend & Databases",
    skills: ["Laravel", "Node.js", "MySQL", "PostgreSQL", "Database Design", "Optimization"]
  },
  {
    title: "Cloud & DevOps",
    skills: ["Git", "GitHub", "Linux", "VPS", "Cron Jobs", "cPanel", "Deployment"]
  },
  {
    title: "Mobile & UI/UX",
    skills: ["Flutter", "Android Basics", "Figma", "Canva", "Wireframing", "Design Systems"]
  },
  {
    title: "Software Engineering",
    skills: ["OOP", "Clean Code", "Debugging", "Performance Optimization", "Architecture"]
  },
  {
    title: "Product & Soft Skills",
    skills: ["Leadership", "Communication", "Problem Solving", "Product Thinking", "Requirement Analysis"]
  }
];

export function SkillsSection({ data, sectionData }: { data?: any, sectionData?: any }) {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  
  useScrollLock(!!selectedSkill);

  const openSkillModal = (skillObj: any) => {
    setSelectedSkill(skillObj);
    setCurrentCertIndex(0);
  };
  
  // Group skills by category or use custom cards
  const groupedSkills = useMemo(() => {
    if (sectionData?.cards && Array.isArray(sectionData.cards) && sectionData.cards.length > 0) {
      return sectionData.cards;
    }
    if (!data || !Array.isArray(data) || data.length === 0) {
      return skillCategories; // Fallback
    }
    const groups: Record<string, string[]> = {};
    data.forEach((skill: any) => {
      const cat = skill.category || "Other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(skill.name);
    });
    return Object.keys(groups).map(key => ({
      title: key,
      skills: groups[key]
    }));
  }, [data, sectionData]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const subtitle = sectionData?.subtitle || "A comprehensive overview of my technical skills, tools, and expertise across the modern software development stack.";

  return (
    <section id="skills" ref={containerRef} className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-muted-foreground text-lg whitespace-pre-wrap">
            {subtitle}
          </p>
        </motion.div>

        <motion.div style={{ opacity }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {groupedSkills.map((category: any, index: number) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-panel p-6 rounded-3xl relative overflow-hidden group"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute -inset-px rounded-3xl border border-primary-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <h3 className="text-xl font-heading font-bold text-foreground mb-4 relative z-10">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-2 relative z-10">
                {category.skills.map((skill: string) => {
                  const skillObj = data?.find((s: any) => s.name === skill);
                  const color = skillObj?.color;
                  
                  let colorClasses = "bg-foreground/5 border-foreground/10 text-muted-foreground group-hover:text-foreground/90 group-hover:border-foreground/20";
                  
                  if (color === 'red') colorClasses = "bg-red-500/10 border-red-500/20 text-red-500 group-hover:bg-red-500/20 group-hover:border-red-500/40";
                  if (color === 'blue') colorClasses = "bg-blue-500/10 border-blue-500/20 text-blue-500 group-hover:bg-blue-500/20 group-hover:border-blue-500/40";
                  if (color === 'green') colorClasses = "bg-green-500/10 border-green-500/20 text-green-500 group-hover:bg-green-500/20 group-hover:border-green-500/40";
                  if (color === 'purple') colorClasses = "bg-purple-500/10 border-purple-500/20 text-purple-500 group-hover:bg-purple-500/20 group-hover:border-purple-500/40";
                  if (color === 'yellow') colorClasses = "bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400 group-hover:bg-yellow-500/20 group-hover:border-yellow-500/40";
                  if (color === 'grey') colorClasses = "bg-gray-500/10 border-gray-500/20 text-gray-500 group-hover:bg-gray-500/20 group-hover:border-gray-500/40";
                  if (color === 'cyan') colorClasses = "bg-cyan-500/10 border-cyan-500/20 text-cyan-500 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40";
                  if (color === 'orange') colorClasses = "bg-orange-500/10 border-orange-500/20 text-orange-500 group-hover:bg-orange-500/20 group-hover:border-orange-500/40";
                  if (color === 'brown') colorClasses = "bg-orange-900/10 border-orange-900/20 text-orange-900 dark:bg-orange-300/10 dark:border-orange-300/20 dark:text-orange-300 group-hover:bg-orange-900/20 group-hover:border-orange-900/40";

                  return (
                    <button
                      key={skill}
                      onClick={() => skillObj && openSkillModal(skillObj)}
                      className={`px-3 py-1 text-sm font-medium rounded-full border transition-colors cursor-pointer ${colorClasses}`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedSkill(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto overscroll-contain glass-panel p-6 md:p-8 rounded-3xl z-10"
            >
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4 pr-8">
                {selectedSkill.name}
              </h3>
              
              {selectedSkill.description && (
                <div className="mb-6 text-muted-foreground whitespace-pre-wrap">
                  {selectedSkill.description}
                </div>
              )}
              
              {selectedSkill.certificates && Array.isArray(selectedSkill.certificates) && selectedSkill.certificates.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center justify-between">
                    <span>Certifications</span>
                    {selectedSkill.certificates.length > 1 && (
                      <span className="text-sm font-normal text-muted-foreground">
                        {currentCertIndex + 1} of {selectedSkill.certificates.length}
                      </span>
                    )}
                  </h4>
                  
                  <div className="relative w-full rounded-xl overflow-hidden border border-foreground/10 bg-black/20 flex items-center justify-center">
                    {(() => {
                      const url = getImageUrl(selectedSkill.certificates[currentCertIndex]);
                      if (!url) return null;
                      
                      const isPdf = url.toLowerCase().endsWith('.pdf');
                      
                      return isPdf ? (
                        <iframe src={`${url}#toolbar=0&navpanes=0&scrollbar=0`} className="w-full aspect-[1.414/1] max-h-[70vh] border-0" />
                      ) : (
                        <img src={url} alt={`${selectedSkill.name} Certificate`} className="max-w-full w-auto h-auto max-h-[60vh] md:max-h-[70vh] object-contain pointer-events-none" />
                      );
                    })()}
                    
                    {/* Navigation Arrows */}
                    {selectedSkill.certificates.length > 1 && (
                      <>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setCurrentCertIndex(prev => prev === 0 ? selectedSkill.certificates.length - 1 : prev - 1); }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors backdrop-blur-md"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setCurrentCertIndex(prev => prev === selectedSkill.certificates.length - 1 ? 0 : prev + 1); }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors backdrop-blur-md"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
