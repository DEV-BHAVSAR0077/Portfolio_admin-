"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, BrainCircuit, Target, Heart, Zap, BookOpen, Star, Lightbulb, Briefcase, Terminal, Cpu } from "lucide-react";

function getIconConfig(title: string) {
  if (!title) return { Icon: Star, color: "text-primary-accent", bg: "bg-primary-accent" };
  const t = title.toLowerCase();
  if (t.includes('biography') || t.includes('about')) return { Icon: BrainCircuit, color: "text-primary-accent", bg: "bg-primary-accent" };
  if (t.includes('mission') || t.includes('vision') || t.includes('goal')) return { Icon: Target, color: "text-secondary-accent", bg: "bg-secondary-accent" };
  if (t.includes('philosoph') || t.includes('heart') || t.includes('value')) return { Icon: Heart, color: "text-success", bg: "bg-success" };
  if (t.includes('focus') || t.includes('now') || t.includes('current')) return { Icon: Zap, color: "text-primary-accent", bg: "bg-primary-accent" };
  if (t.includes('learn') || t.includes('book') || t.includes('study')) return { Icon: BookOpen, color: "text-secondary-accent", bg: "bg-secondary-accent" };
  if (t.includes('interest') || t.includes('hobby') || t.includes('personal')) return { Icon: Code2, color: "text-success", bg: "bg-success" };
  if (t.includes('work') || t.includes('experience')) return { Icon: Briefcase, color: "text-primary-accent", bg: "bg-primary-accent" };
  if (t.includes('tech') || t.includes('code') || t.includes('dev')) return { Icon: Terminal, color: "text-secondary-accent", bg: "bg-secondary-accent" };
  if (t.includes('ai') || t.includes('machine') || t.includes('data')) return { Icon: Cpu, color: "text-success", bg: "bg-success" };
  if (t.includes('idea') || t.includes('think')) return { Icon: Lightbulb, color: "text-primary-accent", bg: "bg-primary-accent" };
  return { Icon: Star, color: "text-primary-accent", bg: "bg-primary-accent" };
}

export function AboutSection({ data }: { data?: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Fallback defaults if no cards exist
  const defaultCards = [
    {
      title: "Professional Biography",
      type: "text",
      width: "full",
      content_text: data?.biography || "I am an AI/ML Engineer and Full Stack Developer passionate about creating intelligent software that solves real-world problems. I specialize in AI-powered applications, SaaS platforms, automation systems, and scalable web technologies. I enjoy transforming ideas into production-ready products with beautiful user experiences."
    },
    {
      title: "Mission & Vision",
      type: "text",
      width: "half",
      content_text: data?.mission || "To democratize access to powerful AI tools by building intuitive interfaces, and to envision a future where intelligent automation empowers human creativity."
    },
    {
      title: "Work Philosophy",
      type: "text",
      width: "half",
      content_text: data?.work_philosophy || "Clean code, user-centric design, and continuous learning. I believe the best products emerge from a deep empathy for the end-user."
    },
    {
      title: "Current Focus",
      type: "bullets",
      width: "full",
      content_bullets: Array.isArray(data?.current_focus) ? data.current_focus.map((t: string) => ({ text: t })) : [
        { text: "Architecting scalable LLM applications" },
        { text: "Optimizing Full-Stack SaaS platforms" },
        { text: "Building intelligent automation agents" },
        { text: "Refining modern UI/UX design systems" }
      ]
    },
    {
      title: "What I'm Learning",
      type: "bullets",
      width: "full",
      content_bullets: Array.isArray(data?.learning) ? data.learning.map((t: string) => ({ text: t })) : [
        { text: "Advanced RAG Techniques & Vector DBs" },
        { text: "Three.js & WebGL for immersive web" },
        { text: "Distributed Systems & Cloud Architecture" },
        { text: "Generative UI with AI Models" }
      ]
    },
    {
      title: "Personal Interests",
      type: "pills",
      width: "full",
      content_pills: Array.isArray(data?.personal_interests) ? data.personal_interests : [
        "Open Source", "Hackathons", "Writing Tech Blogs", "Sci-Fi Books", "UI Design"
      ]
    }
  ];

  const cards = (data?.about_cards && Array.isArray(data.about_cards) && data.about_cards.length > 0) 
    ? data.about_cards 
    : defaultCards;

  // Split cards exactly as the original layout: first half on the left, second half on the right.
  // 6 cards = 3 left, 3 right.
  const midIndex = Math.ceil(cards.length / 2);
  const leftCards = cards.slice(0, midIndex);
  const rightCards = cards.slice(midIndex);

  return (
    <section id="about" ref={sectionRef} className="relative py-12 md:py-16 overflow-hidden">
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
          {/* Left Column (Biography, Mission, Philosophy) */}
          <motion.div
            style={{ y, opacity }}
            className="lg:col-span-7 flex flex-wrap gap-8 self-start content-start"
          >
            {leftCards.map((card: any, i: number) => {
              const { Icon, color } = getIconConfig(card.title);
              const isHalf = card.width === 'half';
              return (
                <div key={i} className={`${isHalf ? 'w-full md:w-[calc(50%-1rem)] flex-grow' : 'w-full'}`}>
                  <div className={`glass-panel ${isHalf ? 'p-8' : 'p-8 md:p-10'} rounded-3xl relative overflow-hidden group h-full`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <Icon className={`${isHalf ? 'w-8 h-8' : 'w-12 h-12'} ${color} mb-${isHalf ? '4' : '6'}`} />
                    <h3 className={`${isHalf ? 'text-xl' : 'text-2xl'} font-heading font-bold text-foreground mb-${isHalf ? '3' : '4'}`}>{card.title}</h3>
                    
                    {card.type === 'text' && (
                      <p className={`text-muted-foreground ${!isHalf ? 'leading-relaxed text-lg' : ''} whitespace-pre-wrap`}>
                        {card.content_text}
                      </p>
                    )}
                    {card.type === 'bullets' && card.content_bullets && (
                      <ul className="space-y-4 mt-4">
                        {card.content_bullets.map((bullet: any, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className={`w-2 h-2 rounded-full ${color.replace('text-', 'bg-')} mt-2 shrink-0`} />
                            <span className="text-muted-foreground">{typeof bullet === 'string' ? bullet : bullet.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {card.type === 'pills' && card.content_pills && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {card.content_pills.map((pill: string, idx: number) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-foreground/10 text-sm text-foreground/80 border border-foreground/5">
                            {pill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Right Column (Focus, Learning, Interests) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 grid grid-cols-1 gap-8 h-max self-start content-start"
          >
            {rightCards.map((card: any, i: number) => {
              const { Icon, color, bg } = getIconConfig(card.title);
              return (
                <div key={i} className="col-span-1">
                  <div className="glass-panel p-8 rounded-3xl relative overflow-hidden h-full">
                    <div className={`absolute -right-10 -top-10 w-40 h-40 ${bg}/20 rounded-full blur-[60px]`} />
                    
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-6 flex items-center gap-3">
                      <Icon className={`${color} w-6 h-6`} />
                      {card.title}
                    </h3>

                    {card.type === 'text' && (
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {card.content_text}
                      </p>
                    )}
                    {card.type === 'bullets' && card.content_bullets && (
                      <ul className="space-y-4">
                        {card.content_bullets.map((bullet: any, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className={`w-2 h-2 rounded-full ${bg} mt-2 shrink-0`} />
                            <span className="text-muted-foreground">{typeof bullet === 'string' ? bullet : bullet.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {card.type === 'pills' && card.content_pills && (
                      <div className="flex flex-wrap gap-2">
                        {card.content_pills.map((pill: string, idx: number) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-foreground/10 text-sm text-foreground/80 border border-foreground/5">
                            {pill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

