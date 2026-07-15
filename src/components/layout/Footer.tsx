import Link from "next/link";
import { Terminal, Briefcase, Hash, Mail, ArrowUp, Globe, Camera, MessageSquare } from "lucide-react";

export function Footer({ settings, socialMedia, homeData }: { settings?: any, socialMedia?: any[], homeData?: any }) {
  
  const socialLinks = homeData?.social_links || [
    { name: 'GitHub', icon: 'Terminal', href: "https://github.com/devbhavsar0077" },
    { name: 'LinkedIn', icon: 'Briefcase', href: "https://linkedin.com/in/devbhavsar" },
    { name: 'X / Twitter', icon: 'Hash', href: "https://twitter.com/devbhavsar" },
    { name: 'Email Me', icon: 'Mail', href: "https://mail.google.com/mail/?view=cm&fs=1&to=contact@devbhavsar.com" },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return Terminal;
      case 'Briefcase': return Briefcase;
      case 'Hash': return Hash;
      case 'Mail': return Mail;
      case 'Globe': return Globe;
      case 'Camera': return Camera;
      case 'MessageSquare': return MessageSquare;
      default: return Globe;
    }
  };

  return (
    <footer className="relative border-t border-foreground/10 bg-background overflow-hidden pt-16 pb-8">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary-accent to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-heading font-bold text-foreground">
                {settings?.site_name?.split(' ')[0] || 'DEV'}<span className="text-primary-accent">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-8">
              {homeData?.footer_description || settings?.site_description || "Building AI-Powered Applications, Intelligent Automations, and Scalable Full-Stack Products. Turning ideas into production-ready software."}
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social: any, i: number) => {
                const IconComponent = getIcon(social.icon);
                return (
                  <a
                    key={i}
                    href={(social.href?.includes('@') && !social.href?.startsWith('http')) ? `https://mail.google.com/mail/?view=cm&fs=1&to=${social.href.replace('mailto:', '')}` : social.href}
                    target="_blank"
                    rel="noreferrer"
                    title={social.name || ""}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground/5 border border-foreground/10 text-muted-foreground hover:text-primary-accent hover:border-primary-accent/50 hover:bg-primary-accent/10 transition-all duration-300"
                  >
                    <IconComponent size={20} />
                    {social.name && <span className="text-sm font-medium">{social.name}</span>}
                  </a>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="#about" className="text-muted-foreground hover:text-primary-accent transition-colors">About</Link></li>
              <li><Link href="#skills" className="text-muted-foreground hover:text-primary-accent transition-colors">Skills</Link></li>
              <li><Link href="#projects" className="text-muted-foreground hover:text-primary-accent transition-colors">Projects</Link></li>
              <li><Link href="#experience" className="text-muted-foreground hover:text-primary-accent transition-colors">Experience</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-6">Services</h3>
            <ul className="flex flex-col gap-3">
              <li className="text-muted-foreground">AI Development</li>
              <li className="text-muted-foreground">Full Stack Apps</li>
              <li className="text-muted-foreground">SaaS Platforms</li>
              <li className="text-muted-foreground">Automation</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-foreground/5">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} {settings?.site_name || 'Dev Bhavsar'}. All rights reserved.
          </p>
          <a
            href="#top"
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary-accent transition-colors"
          >
            Back to top <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
