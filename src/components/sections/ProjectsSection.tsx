"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, ExternalLink, ArrowRight, Layers } from "lucide-react";

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

export function ProjectsSection({ data }: { data?: any }) {
  const containerRef = useRef<HTMLElement>(null);
  
  // Use CMS data or fallback
  const allProjects = data && Array.isArray(data) && data.length > 0 ? data : [flagshipProject, ...otherProjects];
  
  // First project is flagship if is_featured is true, otherwise just the first one
  let flagship = allProjects.find((p: any) => p.is_featured);
  if (!flagship && allProjects.length > 0) flagship = allProjects[0];
  if (!flagship) flagship = flagshipProject;
  
  // The rest are other projects
  const others = allProjects.filter((p: any) => p.id !== flagship.id).slice(0, 6); // Max 6 others
  if (others.length === 0 && data?.length === 0) {
      others.push(...otherProjects);
  }

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
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A selection of my best projects spanning AI, full-stack web, and mobile development.
          </p>
        </motion.div>

        {/* Flagship Project */}
        <motion.div
          style={{ y }}
          className="mb-20 glass-panel rounded-[2rem] overflow-hidden border border-primary-accent/20 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/5 via-transparent to-secondary-accent/5 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Placeholder */}
            <div 
              className="h-64 lg:h-auto min-h-[400px] relative overflow-hidden flex items-center justify-center p-12"
              style={{ background: flagship.banner_image || flagship.image || "linear-gradient(to right bottom, #0F172A, #00F5FF20)" }}
            >
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <div className="relative z-10 text-center">
                <Layers className="w-20 h-20 text-foreground/50 mx-auto mb-6" />
                <h3 className="text-4xl font-heading font-bold text-foreground/80 uppercase tracking-widest border-4 border-foreground/20 inline-block p-4">{flagship.name || flagship.title || 'PROJECT'}</h3>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-accent/10 border border-primary-accent/20 text-primary-accent text-sm font-medium mb-6 w-fit">
                Flagship Project
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
                <a href={flagship.live_demo || flagship.demoLink || "#"} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-primary-accent transition-colors">
                  Live Demo <ExternalLink size={16} />
                </a>
                <a href={flagship.github_link || flagship.githubLink || "#"} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground/10 text-foreground font-semibold hover:bg-foreground/20 transition-colors border border-foreground/10">
                  <Terminal size={16} /> GitHub
                </a>
                <a href={flagship.caseStudyLink || "#"} className="inline-flex items-center gap-2 text-primary-accent hover:text-foreground font-semibold transition-colors ml-auto">
                  Case Study <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {others.map((project: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-6">
                <div className="px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-xs font-medium text-foreground/70">
                  {project.project_type || project.category}
                </div>
                <div className="flex gap-2">
                  <a href={project.github_link || project.githubLink || "#"} className="text-muted-foreground hover:text-foreground transition-colors">
                    <Terminal size={20} />
                  </a>
                  <a href={project.live_demo || project.demoLink || "#"} className="text-muted-foreground hover:text-foreground transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4 group-hover:text-primary-accent transition-colors">
                {project.name || project.title}
              </h3>
              
              <p className="text-muted-foreground mb-8 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {(project.tech_stack || project.technologies || []).map((tech: string) => (
                  <span key={tech} className="text-xs font-medium text-foreground/50">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="https://github.com/devbhavsar0077" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-foreground hover:text-primary-accent transition-colors font-medium">
            View all projects on GitHub <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
