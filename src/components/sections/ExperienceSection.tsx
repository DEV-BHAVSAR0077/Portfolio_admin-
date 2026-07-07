"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const experienceData = [
  {
    role: "Senior AI/ML Engineer",
    company: "Tech Innovators Inc.",
    period: "2023 - Present",
    description: "Leading the development of generative AI models and intelligent automation agents for enterprise clients. Architecting scalable vector search pipelines.",
    type: "work"
  },
  {
    role: "Full Stack Developer",
    company: "SaaS Solutions",
    period: "2021 - 2023",
    description: "Built and scaled a flagship restaurant management SaaS (Dinely). Implemented core features including QR menus, billing systems, and analytics dashboards.",
    type: "work"
  },
  {
    role: "M.S. in Computer Science",
    company: "Tech University",
    period: "2019 - 2021",
    description: "Specialized in Artificial Intelligence and Machine Learning. Published research on natural language processing.",
    type: "education"
  },
  {
    role: "Software Developer Intern",
    company: "StartUp Hub",
    period: "2020 - 2021",
    description: "Developed full-stack web applications using Laravel and React. Improved database query performance by 40%.",
    type: "work"
  },
  {
    role: "B.S. in Computer Engineering",
    company: "State University",
    period: "2015 - 2019",
    description: "Graduated with honors. Led the university robotics team to a national championship.",
    type: "education"
  }
];

export function ExperienceSection({ data, education }: { data?: any, education?: any }) {
  const containerRef = useRef<HTMLElement>(null);
  
  // Combine and sort
  const combinedData = useMemo(() => {
    let combined: any[] = [];
    if (data && Array.isArray(data) && data.length > 0) {
      combined = [...combined, ...data.map((item: any) => ({ ...item, type: 'work' }))];
    }
    if (education && Array.isArray(education) && education.length > 0) {
      combined = [...combined, ...education.map((item: any) => ({ 
        ...item, 
        role: item.degree, 
        company: item.institution,
        period: `${item.start_date ? item.start_date.substring(0,4) : ''} - ${item.end_date ? item.end_date.substring(0,4) : 'Present'}`,
        type: 'education' 
      }))];
    }
    
    if (combined.length === 0) {
      combined = experienceData; // Fallback
    }
    
    // Simplistic sort by display order if available, otherwise just use as is
    return combined.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }, [data, education]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="experience" ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Experience & <span className="text-gradient">Education</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            My professional journey and academic background.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2" />

          <motion.div style={{ y }} className="space-y-12 relative">
            {combinedData.map((item: any, index: number) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-start gap-8 md:gap-0 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 w-10 h-10 rounded-full bg-background border-4 border-primary-accent flex items-center justify-center -translate-x-1/2 z-10 mt-1 md:mt-0 shadow-[0_0_15px_rgba(0,245,255,0.5)]">
                    {item.type === "work" ? (
                      <Briefcase size={16} className="text-primary-accent" />
                    ) : (
                      <GraduationCap size={16} className="text-secondary-accent" />
                    )}
                  </div>

                  {/* Content Card */}
                  <div className={`w-full pl-12 md:pl-0 md:w-1/2 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div className="glass-panel p-6 md:p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 relative group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className={`flex items-center gap-2 mb-3 text-primary-accent font-medium text-sm ${isEven ? "md:justify-end" : ""}`}>
                        <Calendar size={14} />
                        <span>{item.period || `${item.start_date ? item.start_date.substring(0,4) : ''} - ${item.end_date ? item.end_date.substring(0,4) : (item.is_current ? 'Present' : '')}`}</span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-1">
                        {item.role || item.job_title}
                      </h3>
                      <h4 className="text-muted-foreground font-medium mb-4">{item.company || item.company_name}</h4>
                      
                      <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
