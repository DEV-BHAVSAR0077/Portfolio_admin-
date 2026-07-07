"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, BrainCircuit, Rocket, Target, Heart, Zap, BookOpen } from "lucide-react";

export function AboutSection({ data }: { data?: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Fallbacks
  const biography = data?.biography || "I am an AI/ML Engineer and Full Stack Developer passionate about creating intelligent software that solves real-world problems. I specialize in AI-powered applications, SaaS platforms, automation systems, and scalable web technologies. I enjoy transforming ideas into production-ready products with beautiful user experiences.";
  const mission = data?.mission || "To democratize access to powerful AI tools by building intuitive interfaces, and to envision a future where intelligent automation empowers human creativity.";
  const workPhilosophy = data?.work_philosophy || "Clean code, user-centric design, and continuous learning. I believe the best products emerge from a deep empathy for the end-user.";
  
  // Try parsing JSON if they come as strings
  const parseJson = (val: any, fallback: any[]) => {
    if (!val) return fallback;
    if (Array.isArray(val)) return val;
    try {
      return JSON.parse(val);
    } catch {
      return fallback;
    }
  };

  const currentFocus = parseJson(data?.current_focus, [
    "Architecting scalable LLM applications",
    "Optimizing Full-Stack SaaS platforms",
    "Building intelligent automation agents",
    "Refining modern UI/UX design systems"
  ]);

  const learning = parseJson(data?.learning, [
    "Advanced RAG Techniques & Vector DBs",
    "Three.js & WebGL for immersive web",
    "Distributed Systems & Cloud Architecture",
    "Generative UI with AI Models"
  ]);

  const personalInterests = parseJson(data?.personal_interests, [
    "Open Source", "Hackathons", "Writing Tech Blogs", "Sci-Fi Books", "UI Design"
  ]);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Biography & Mission */}
          <motion.div
            style={{ y, opacity }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <BrainCircuit className="w-12 h-12 text-primary-accent mb-6" />
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Professional Biography</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {biography}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-panel p-8 rounded-3xl">
                <Target className="w-8 h-8 text-secondary-accent mb-4" />
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">Mission & Vision</h3>
                <p className="text-muted-foreground">
                  {mission}
                </p>
              </div>
              <div className="glass-panel p-8 rounded-3xl">
                <Heart className="w-8 h-8 text-success mb-4" />
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">Work Philosophy</h3>
                <p className="text-muted-foreground">
                  {workPhilosophy}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Current Focus & Learning */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="glass-panel p-8 rounded-3xl border border-foreground/10 bg-foreground/5 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-accent/20 rounded-full blur-[60px]" />
              <h3 className="text-2xl font-heading font-bold text-foreground mb-6 flex items-center gap-3">
                <Zap className="text-primary-accent" />
                Current Focus
              </h3>
              <ul className="space-y-4">
                {currentFocus.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary-accent mt-2 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-foreground/10 bg-foreground/5 relative overflow-hidden">
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-secondary-accent/20 rounded-full blur-[60px]" />
              <h3 className="text-2xl font-heading font-bold text-foreground mb-6 flex items-center gap-3">
                <BookOpen className="text-secondary-accent" />
                What I'm Learning
              </h3>
              <ul className="space-y-4">
                {learning.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary-accent mt-2 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="glass-panel p-8 rounded-3xl border border-foreground/10 bg-foreground/5">
              <h3 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
                <Code2 className="text-success" />
                Personal Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {personalInterests.map((interest: string, i: number) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-foreground/10 text-sm text-foreground/80 border border-foreground/5">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
