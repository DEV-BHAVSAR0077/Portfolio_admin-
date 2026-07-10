"use client";

import { useRef, useMemo, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollLock } from "@/hooks/useScrollLock";
import { getImageUrl } from "@/lib/api";

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

export function ExperienceSection({ data }: { data?: any }) {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useScrollLock(!!selectedItem);

  const openModal = (item: any) => {
    if (item.enable_modal) {
      setSelectedItem(item);
      setCurrentMediaIndex(0);
    }
  };
  
  
  // Combine and sort
  const combinedData = useMemo(() => {
    let combined: any[] = [];
    if (data?.timeline_items && Array.isArray(data.timeline_items) && data.timeline_items.length > 0) {
      combined = data.timeline_items.map((item: any) => {
        
        // Format dates
        const formatDate = (dateString: string) => {
          if (!dateString) return '';
          const date = new Date(dateString);
          return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        };
        
        const start = formatDate(item.start_date);
        const end = item.is_current ? 'Present' : formatDate(item.end_date);
        
        return {
          ...item,
          role: item.title,
          company: item.organization,
          period: `${start} - ${end}`,
        };
      });
      
      // Sort ascending (past to latest)
      combined.sort((a, b) => {
        const dateA = new Date(a.start_date || 0).getTime();
        const dateB = new Date(b.start_date || 0).getTime();
        return dateA - dateB;
      });
    }
    
    if (combined.length === 0) {
      combined = experienceData; // Fallback
    }
    
    return combined;
  }, [data]);

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
            {data?.subtitle || "My professional journey and academic background."}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary-accent/70 to-transparent -translate-x-1/2 shadow-[0_0_15px_rgba(0,245,255,0.5)] z-0" />

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
                  className={`flex flex-col md:flex-row items-center w-full relative ${
                    isEven ? "md:justify-start" : "md:justify-end"
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
                  <div className={`w-full pl-14 md:pl-0 md:w-1/2 relative z-10 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 text-left"}`}>
                    <div 
                      onClick={() => openModal(item)}
                      className={`glass-panel p-6 md:p-8 rounded-3xl transition-transform duration-300 relative group overflow-hidden ${item.enable_modal ? "cursor-pointer hover:-translate-y-2" : ""}`}
                    >
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
      
      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-background/80 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-black/40 border border-primary-accent/20 p-6 md:p-10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative glass-panel shadow-[0_0_40px_rgba(0,245,255,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-6 md:gap-8">
                {/* Header */}
                <div className="border-b border-white/10 pb-6 pr-8">
                  <div className="flex items-center gap-2 mb-3 text-primary-accent font-medium text-sm">
                    <Calendar size={16} />
                    <span>{selectedItem.period}</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground mb-2">
                    {selectedItem.role || selectedItem.job_title}
                  </h2>
                  <h3 className="text-xl text-muted-foreground font-medium flex items-center gap-2">
                    {selectedItem.type === "work" ? <Briefcase size={20} /> : <GraduationCap size={20} />}
                    {selectedItem.company || selectedItem.company_name}
                  </h3>
                </div>

                {/* Details */}
                {selectedItem.details && (
                  <div 
                    className="prose prose-invert prose-cyan max-w-none prose-p:text-foreground/80 prose-headings:text-foreground prose-a:text-primary-accent hover:prose-a:text-primary-accent/80"
                    dangerouslySetInnerHTML={{ __html: selectedItem.details }}
                  />
                )}
                {!selectedItem.details && selectedItem.description && (
                  <p className="text-foreground/80 leading-relaxed text-lg">
                    {selectedItem.description}
                  </p>
                )}

                {/* Media Viewer */}
                {selectedItem.show_media && selectedItem.media && selectedItem.media.length > 0 && (
                  <div className="mt-4 border-t border-white/10 pt-8">
                    <h4 className="text-lg font-heading font-semibold text-foreground mb-4">Related Media</h4>
                    <div className="relative w-full rounded-xl overflow-hidden border border-foreground/10 bg-black/20 flex items-center justify-center min-h-[200px]">
                      {(() => {
                        const url = getImageUrl(selectedItem.media[currentMediaIndex]);
                        if (!url) return null;
                        
                        const isPdf = url.toLowerCase().endsWith('.pdf');
                        
                        return isPdf ? (
                          <iframe src={`${url}#toolbar=0&navpanes=0&scrollbar=0`} className="w-full h-[50vh] border-0" />
                        ) : (
                          <img src={url} alt={`${selectedItem.role} Media`} className="w-full h-auto max-h-[50vh] object-contain pointer-events-none" />
                        );
                      })()}
                      
                      {/* Navigation Arrows */}
                      {selectedItem.media.length > 1 && (
                        <>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentMediaIndex((prev) => (prev === 0 ? selectedItem.media.length - 1 : prev - 1));
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
                          >
                            <ChevronLeft size={24} />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentMediaIndex((prev) => (prev === selectedItem.media.length - 1 ? 0 : prev + 1));
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
                          >
                            <ChevronRight size={24} />
                          </button>
                          
                          {/* Dots */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                            {selectedItem.media.map((_: any, idx: number) => (
                              <button
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentMediaIndex(idx);
                                }}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  idx === currentMediaIndex ? 'bg-primary-accent w-4' : 'bg-white/30 hover:bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
