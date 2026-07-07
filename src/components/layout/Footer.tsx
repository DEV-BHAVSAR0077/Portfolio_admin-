import Link from "next/link";
import { Terminal, Briefcase, Hash, Mail, ArrowUp, Globe, Camera, MessageSquare } from "lucide-react";

export function Footer({ settings, socialMedia }: { settings?: any, socialMedia?: any[] }) {
  
  const getSocialIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case 'github': return Terminal;
      case 'linkedin': return Briefcase;
      case 'twitter': return Hash;
      case 'x': return Hash;
      case 'youtube': return Camera;
      case 'facebook': return MessageSquare;
      case 'instagram': return Camera;
      default: return Globe;
    }
  };

  const socials = socialMedia && socialMedia.length > 0 ? socialMedia : [
    { platform: 'github', url: 'https://github.com/devbhavsar0077' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/devbhavsar' },
    { platform: 'twitter', url: 'https://twitter.com/devbhavsar' },
  ];

  return (
    <footer className="relative border-t border-foreground/10 bg-background overflow-hidden pt-16 pb-8">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary-accent to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-heading font-bold text-foreground">
                {settings?.site_name?.split(' ')[0] || 'DEV'}<span className="text-primary-accent">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-8">
              {settings?.site_description || "Building AI-Powered Applications, Intelligent Automations, and Scalable Full-Stack Products. Turning ideas into production-ready software."}
            </p>
            <div className="flex gap-4">
              {socials.map((social, idx) => {
                const IconComponent = getSocialIcon(social.platform);
                return (
                  <a key={idx} href={social.url} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors">
                    <IconComponent size={20} />
                  </a>
                );
              })}
              <a href={`mailto:${settings?.contact_email || 'contact@devbhavsar.com'}`} className="p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="#about" className="text-muted-foreground hover:text-primary-accent transition-colors">About</Link></li>
              <li><Link href="#skills" className="text-muted-foreground hover:text-primary-accent transition-colors">Skills</Link></li>
              <li><Link href="#projects" className="text-muted-foreground hover:text-primary-accent transition-colors">Projects</Link></li>
              <li><Link href="#blog" className="text-muted-foreground hover:text-primary-accent transition-colors">Blog</Link></li>
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
