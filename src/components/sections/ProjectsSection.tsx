"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Terminal, ExternalLink, ArrowRight, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/lib/api";

const flagshipProject = {
  title: "Dinely - Restaurant SaaS Platform",
  category: "Full Stack SaaS",
  description: "A comprehensive restaurant management system that streamlines operations, from digital QR menus to billing and analytics.",
  problem: "Restaurants struggle with fragmented systems for menus, orders, billing, and analytics, leading to inefficiencies.",
  solution: "An all-in-one scalable platform that unifies operations into a single intuitive dashboard.",
  features: ["Dynamic QR Menu", "Real-time Order Management", "Automated Billing", "Advanced Analytics", "Multi-tenant Architecture"],
  tech: ["Next.js", "Laravel", "MySQL", "Tailwind CSS", "WebSockets"],
  image: "linear-gradient(to right bottom, #0F172A, #00F5FF20)", // Placeholder for actual image
  demoLink: "#",
  githubLink: "#",
  caseStudyLink: "#"
};

const otherProjects = [
  {
    title: "AI Automation Agent",
    category: "Artificial Intelligence",
    description: "An autonomous agent that handles customer inquiries and triggers workflows based on intent classification.",
    tech: ["Python", "LangChain", "OpenAI API", "FastAPI"],
  },
  {
    title: "E-Commerce Mobile App",
    category: "Flutter Development",
    description: "A cross-platform mobile application for seamless online shopping with integrated payment gateways.",
    tech: ["Flutter", "Dart", "Firebase", "Stripe"],
  },
  {
    title: "Financial Dashboard",
    category: "React / Dashboard",
    description: "A real-time analytics dashboard visualizing financial data with interactive charts and reports.",
    tech: ["React", "TypeScript", "Recharts", "Node.js"],
  },
  {
    title: "Booking System",
    category: "Laravel Application",
    description: "A robust appointment booking and scheduling system with email reminders and calendar integrations.",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
  }
];

export function ProjectsSection({ data, sectionData }: { data?: any, sectionData?: any }) {
  const containerRef = useRef<HTMLElement>(null);
  
  // Use CMS data or fallback
  const allProjects = data && Array.isArray(data) && data.length > 0 ? data : [flagshipProject, ...otherProjects];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (allProjects.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allProjects.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [allProjects.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allProjects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allProjects.length) % allProjects.length);
  };

  const flagship = allProjects[currentIndex] || flagshipProject;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="projects" ref={containerRef} className="relative py-24 md:py-32 overflow-hidden bg-foreground/[0.02]">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            {sectionData?.title ? (
              <span dangerouslySetInnerHTML={{ __html: sectionData.title.replace('Work', '<span class="text-gradient">Work</span>').replace('Projects', '<span class="text-gradient">Projects</span>') }} />
            ) : (
              <>Featured <span className="text-gradient">Work</span></>
            )}
          </h2>
          <p className="text-muted-foreground text-lg">
            {sectionData?.subtitle || "A selection of my best projects spanning AI, full-stack web, and mobile development."}
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center md:text-left"
        >
          {(sectionData?.stats && Array.isArray(sectionData.stats) && sectionData.stats.length > 0 
            ? sectionData.stats 
            : [
                { number: "12+", detail: "Awards Won" },
                { number: "150+", detail: "Open Source PRs" },
                { number: "500+", detail: "GitHub Stars" },
                { number: "1000+", detail: "Cups of Coffee" }
              ]
          ).map((stat: any, idx: number) => {
            const match = String(stat.number).match(/^([\d,.]+)(.*)$/);
            return (
              <div key={idx} className={`px-4 ${idx === 0 ? 'md:pl-0' : ''}`}>
                <div className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-2 tracking-tight">
                  {match ? (
                    <>
                      {match[1]}<span className="text-primary-accent">{match[2]}</span>
                    </>
                  ) : (
                    stat.number
                  )}
                </div>
                <div className="text-muted-foreground font-medium">{stat.detail}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Carousel Project */}
        <div className="relative mb-20 group">
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-6 z-20 p-3 rounded-full bg-background border border-foreground/10 text-foreground shadow-xl hover:text-primary-accent hover:border-primary-accent transition-all hidden md:flex"
            aria-label="Previous project"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-6 z-20 p-3 rounded-full bg-background border border-foreground/10 text-foreground shadow-xl hover:text-primary-accent hover:border-primary-accent transition-all hidden md:flex"
            aria-label="Next project"
          >
            <ChevronRight size={24} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-panel rounded-[2rem] overflow-hidden border border-primary-accent/20 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/5 via-transparent to-secondary-accent/5 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Placeholder */}
            {(() => {
              const hasActualImage = (flagship.banner_image || flagship.image) && 
                                     !String(flagship.banner_image).includes("linear-gradient") && 
                                     !String(flagship.image).includes("linear-gradient");
                                     
              return (
                <div 
                  className="h-64 lg:h-auto min-h-[400px] relative overflow-hidden flex items-center justify-center p-12"
                  style={
                    hasActualImage
                      ? { backgroundImage: `url(${getImageUrl(flagship.banner_image || flagship.image)})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                      : { background: flagship.banner_image || flagship.image || "linear-gradient(to right bottom, #0F172A, #00F5FF20)" }
                  }
                >
                  {!hasActualImage && (
                    <>
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                      <div className="relative z-10 text-center">
                        <Layers className="w-20 h-20 text-foreground/50 mx-auto mb-6" />
                        <h3 className="text-4xl font-heading font-bold text-foreground/80 uppercase tracking-widest border-4 border-foreground/20 inline-block p-4">{flagship.name || flagship.title || 'PROJECT'}</h3>
                      </div>
                    </>
                  )}
                </div>
              );
            })()}
            
            {/* Content */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-accent/10 border border-primary-accent/20 text-primary-accent text-sm font-medium mb-6 w-fit">
                {flagship.project_type || "Flagship Project"}
              </div>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                {flagship.name || flagship.title}
              </h3>
              <p className="text-muted-foreground text-lg mb-8">
                {flagship.description}
              </p>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="text-foreground font-semibold mb-2">The Problem</h4>
                  <p className="text-muted-foreground text-sm">{flagship.problem_statement || flagship.problem}</p>
                </div>
                <div>
                  <h4 className="text-foreground font-semibold mb-2">The Solution</h4>
                  <p className="text-muted-foreground text-sm">{flagship.solution}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {(flagship.tech_stack || flagship.tech || []).map((tech: string) => (
                  <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-foreground/5 border border-foreground/10 text-foreground/80">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 mt-auto">
                {flagship.show_live_demo !== false && flagship.show_live_demo !== 0 && (
                  <a href={flagship.live_demo || flagship.demoLink || "#"} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-primary-accent transition-colors">
                    Live Demo <ExternalLink size={16} />
                  </a>
                )}
                {flagship.show_github_link !== false && flagship.show_github_link !== 0 && (
                  <a href={flagship.github_link || flagship.githubLink || "#"} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground/10 text-foreground font-semibold hover:bg-foreground/20 transition-colors border border-foreground/10">
                    <Terminal size={16} /> GitHub
                  </a>
                )}
                {flagship.show_case_study !== false && flagship.show_case_study !== 0 && (
                  <a href={flagship.case_study_link || flagship.caseStudyLink || "#"} className="inline-flex items-center gap-2 text-primary-accent hover:text-foreground font-semibold transition-colors ml-auto">
                    Case Study <ArrowRight size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="mt-16 text-center">
          <a href="https://github.com/DEV-BHAVSAR0077" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-foreground hover:text-primary-accent transition-colors font-medium">
            View all projects on GitHub <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
