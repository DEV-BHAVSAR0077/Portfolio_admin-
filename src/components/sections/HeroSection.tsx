"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Download, ArrowRight, Terminal, Briefcase, Hash, Mail } from "lucide-react";
import { getImageUrl, getResumeDownloadUrl } from "@/lib/api";

const NeuralNetwork = dynamic(() => import("@/components/3d/NeuralNetwork").then(mod => mod.NeuralNetwork), { ssr: false });
const Particles = dynamic(() => import("@/components/3d/Particles").then(mod => mod.Particles), { ssr: false });

export function HeroSection({ data }: { data?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fallback defaults if data is missing
  const heroTitle = data?.hero_title || "Hi, I'm Dev Bhavsar";
  const heroSubtitle = data?.hero_subtitle || "AI/ML Engineer";
  const heroDescription = data?.hero_description || "Building AI-Powered Applications, Intelligent Automations, and Scalable Full-Stack Products.";
  const resumeUrl = data?.resume ? getResumeDownloadUrl() : "/resume.pdf";
  
  const socialLinks = data?.social_links || [
    { icon: 'Terminal', href: "https://github.com/devbhavsar0077" },
    { icon: 'Briefcase', href: "https://linkedin.com/in/devbhavsar" },
    { icon: 'Hash', href: "https://twitter.com/devbhavsar" },
    { icon: 'Mail', href: "mailto:contact@devbhavsar.com" },
  ];

  const statistics = data?.statistics || [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "40+" },
    { label: "Happy Clients", value: "25+" },
    { label: "Technologies", value: "15+" },
  ];

  // Helper to resolve icon component from string
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return Terminal;
      case 'Briefcase': return Briefcase;
      case 'Hash': return Hash;
      case 'Mail': return Mail;
      default: return ArrowRight;
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <NeuralNetwork />
          <Particles count={400} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2 + 0.2}
            minPolarAngle={Math.PI / 2 - 0.2}
          />
        </Canvas>
      </div>

      {/* Decorative Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-accent/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-accent/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 mb-6 backdrop-blur-md"
          >
            {data?.available_for_hire !== false ? (
              <>
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-medium text-foreground/80">Available for new opportunities</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span className="text-sm font-medium text-foreground/80">Booking for the next available slot</span>
              </>
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight mb-6"
            dangerouslySetInnerHTML={{
                __html: heroTitle.replace(
                  "Dev Bhavsar", 
                  "<span class=\"text-foreground\">Dev Bhavsar</span>"
                ) + `<br /><span class="text-gradient">${heroSubtitle}</span>`
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium"
          >
            {heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a href="#projects" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-background bg-foreground rounded-full overflow-hidden transition-all hover:scale-105">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-accent to-secondary-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-foreground transition-colors duration-300">
                View Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a href={resumeUrl} download className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-foreground bg-foreground/5 border border-foreground/10 rounded-full hover:bg-foreground/10 transition-all hover:scale-105 backdrop-blur-sm">
              <Download size={18} />
              Download Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center justify-center gap-6"
          >
            {socialLinks.map((social: any, i: number) => {
              const IconComponent = getIcon(social.icon);
              return (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-foreground/5 border border-foreground/10 text-muted-foreground hover:text-primary-accent hover:border-primary-accent/50 hover:bg-primary-accent/10 transition-all duration-300"
                >
                  <IconComponent size={22} />
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* Statistics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 md:p-8 rounded-3xl glass-panel relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          
          {statistics.map((stat: any, i: number) => (
            <div key={i} className="text-center relative z-10">
              <div className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
