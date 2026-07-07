"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Star, Code, Coffee } from "lucide-react";

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from);
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = to;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(totalMiliseconds / end, 10);
    const incrementAmount = Math.ceil(end / (totalMiliseconds / incrementTime));

    const timer = setInterval(() => {
      start += incrementAmount;
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, to, duration]);

  return <div ref={nodeRef}>{count}</div>;
}

const achievements = [
  { icon: Trophy, label: "Awards Won", value: 12, suffix: "+" },
  { icon: Code, label: "Open Source PRs", value: 150, suffix: "+" },
  { icon: Star, label: "GitHub Stars", value: 500, suffix: "+" },
  { icon: Coffee, label: "Cups of Coffee", value: 1000, suffix: "+" },
];

export function AchievementsSection({ data }: { data?: any }) {
  // Use CMS data or fallback
  const allAchievements = data && Array.isArray(data) && data.length > 0 ? data : achievements;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy': return Trophy;
      case 'Code': return Code;
      case 'Star': return Star;
      case 'Coffee': return Coffee;
      default: return Trophy;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-foreground/[0.02]">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {allAchievements.map((item: any, index: number) => {
            const IconComponent = typeof item.icon === 'string' ? getIcon(item.icon) : (item.icon || Trophy);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center mb-6 text-primary-accent border border-primary-accent/20">
                  <IconComponent size={28} />
                </div>
                <div className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-2 flex items-center">
                  <Counter from={0} to={Number(item.value) || 0} />
                  <span className="text-primary-accent">{item.suffix}</span>
                </div>
                <p className="text-muted-foreground font-medium">{item.title || item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
