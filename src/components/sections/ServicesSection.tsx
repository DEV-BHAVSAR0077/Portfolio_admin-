"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, Globe, Server, Smartphone, LayoutDashboard, SearchCode, Database, MessageSquareCode } from "lucide-react";

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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return Cpu;
      case 'Globe': return Globe;
      case 'Server': return Server;
      case 'LayoutDashboard': return LayoutDashboard;
      case 'SearchCode': return SearchCode;
      case 'Database': return Database;
      case 'MessageSquareCode': return MessageSquareCode;
      case 'Smartphone': return Smartphone;
      default: return Cpu;
    }
  };

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

        <motion.div style={{ opacity }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allServices.map((service: any, index: number) => {
            const IconComponent = typeof service.icon === 'string' ? getIcon(service.icon) : (service.icon || Cpu);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-panel p-8 rounded-3xl relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <IconComponent className={`w-12 h-12 mb-6 ${service.color || "text-primary-accent"}`} />
                <h3 className="text-xl font-heading font-bold text-foreground mb-4 group-hover:text-primary-accent transition-colors">
                  {service.title || service.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
