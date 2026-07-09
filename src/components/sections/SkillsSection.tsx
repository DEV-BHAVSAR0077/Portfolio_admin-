"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

export function SkillsSection({ data }: { data?: any }) {
  const containerRef = useRef<HTMLElement>(null);
  
  // Group skills by category
  const groupedSkills = useMemo(() => {
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
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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
          <p className="text-muted-foreground text-lg">
            A comprehensive overview of my technical skills, tools, and expertise across the modern software development stack.
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
                {category.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm font-medium rounded-full bg-foreground/5 border border-foreground/10 text-muted-foreground group-hover:text-foreground/90 group-hover:border-foreground/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
