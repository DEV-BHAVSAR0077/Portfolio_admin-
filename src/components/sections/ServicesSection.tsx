"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, Globe, Server, Smartphone, LayoutDashboard, SearchCode, Database, MessageSquareCode, Code2, Rocket, ShieldCheck, Zap } from "lucide-react";

function getServiceIconConfig(title: string) {
  if (!title) return { Icon: Cpu, color: "text-primary-accent" };
  const t = title.toLowerCase();
  
  if (t.includes('web') || t.includes('full stack') || t.includes('frontend') || t.includes('site') || t.includes('react') || t.includes('laravel')) {
    return { Icon: Globe, color: "text-secondary-accent" };
  }
  if (t.includes('app') || t.includes('mobile') || t.includes('flutter') || t.includes('ios') || t.includes('android')) {
    return { Icon: Smartphone, color: "text-primary-accent" };
  }
  if (t.includes('api') || t.includes('backend') || t.includes('data') || t.includes('cloud')) {
    return { Icon: Database, color: "text-secondary-accent" };
  }
  if (t.includes('saas') || t.includes('platform') || t.includes('dashboard') || t.includes('panel')) {
    return { Icon: LayoutDashboard, color: "text-success" };
  }
  if (t.includes('bot') || t.includes('chat') || t.includes('message') || t.includes('agent')) {
    return { Icon: MessageSquareCode, color: "text-success" };
  }
  if (t.includes('auto') || t.includes('script') || t.includes('server') || t.includes('devops')) {
    return { Icon: Server, color: "text-primary-accent" };
  }
  if (t.includes('consult') || t.includes('review') || t.includes('audit') || t.includes('strategy') || t.includes('manage')) {
    return { Icon: SearchCode, color: "text-secondary-accent" };
  }
  if (t.includes('ai') || t.includes('machine') || t.includes('intel') || t.includes('model') || t.includes('train')) {
    return { Icon: Cpu, color: "text-primary-accent" };
  }
  if (t.includes('code') || t.includes('dev') || t.includes('software')) {
    return { Icon: Code2, color: "text-success" };
  }
  if (t.includes('fast') || t.includes('speed') || t.includes('perform') || t.includes('optimi')) {
    return { Icon: Zap, color: "text-primary-accent" };
  }
  if (t.includes('secure') || t.includes('protect') || t.includes('guard')) {
    return { Icon: ShieldCheck, color: "text-secondary-accent" };
  }
  if (t.includes('launch') || t.includes('startup') || t.includes('mvp')) {
    return { Icon: Rocket, color: "text-success" };
  }
  
  // Deterministic fallback based on title string hash
  const colors = ["text-primary-accent", "text-secondary-accent", "text-success"];
  const icons = [Cpu, Globe, Server, Database, Code2, Zap, Rocket];
  const hash = t.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  return { 
    Icon: icons[hash % icons.length], 
    color: colors[hash % colors.length] 
  };
}

const services = [
  {
    title: "AI Development",
    description: "Custom Large Language Models, Generative AI applications, and intelligent agent workflows tailored to your business needs.",
    icon: Cpu,
    color: "text-primary-accent"
  },
  {
    title: "Full Stack Apps",
    description: "End-to-end web application development using React, Next.js, Laravel, and Node.js with scalable architectures.",
    icon: Globe,
    color: "text-secondary-accent"
  },
  {
    title: "SaaS Platforms",
    description: "Architecting and building multi-tenant SaaS products with integrated billing, analytics, and user management.",
    icon: LayoutDashboard,
    color: "text-success"
  },
  {
    title: "Automation",
    description: "Streamlining business operations through custom scripts, API integrations, and AI-powered automation agents.",
    icon: Server,
    color: "text-primary-accent"
  },
  {
    title: "API Development",
    description: "Designing robust, secure, and high-performance RESTful APIs and microservices for web and mobile clients.",
    icon: Database,
    color: "text-secondary-accent"
  },
  {
    title: "AI Chatbots",
    description: "Context-aware conversational interfaces trained on your proprietary data using RAG (Retrieval-Augmented Generation).",
    icon: MessageSquareCode,
    color: "text-success"
  },
  {
    title: "Mobile Development",
    description: "Cross-platform mobile applications built with Flutter, delivering native-like performance and beautiful UIs.",
    icon: Smartphone,
    color: "text-primary-accent"
  },
  {
    title: "Consulting",
    description: "Technical architecture reviews, AI strategy, and performance optimization for your existing digital products.",
    icon: SearchCode,
    color: "text-secondary-accent"
  }
];

export function ServicesSection({ data }: { data?: any }) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Use CMS data or fallback
  const allServices = data && Array.isArray(data) && data.length > 0 ? data : services;

  return (
    <section id="services" ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background z-0" />
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Services & <span className="text-gradient">Offerings</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Leveraging cutting-edge technology to solve complex problems and deliver exceptional digital experiences.
          </p>
        </motion.div>

        <motion.div style={{ opacity }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {allServices.map((service: any, index: number) => {
            const dynamicConfig = getServiceIconConfig(service.title || service.name || "");
            
            // If the service has a hardcoded string icon/color, you can still respect it here if desired,
            // but dynamic fallback ensures CMS-created cards without an icon get a unique one.
            const IconComponent = typeof service.icon === 'object' && service.icon !== null ? service.icon : dynamicConfig.Icon;
            const finalColor = service.color || dynamicConfig.color;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-panel p-8 rounded-3xl relative group overflow-hidden h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <IconComponent className={`w-8 h-8 mb-4 ${finalColor}`} />
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  {service.title || service.name}
                </h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
