"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Mail, Phone, Send, Loader2 } from "lucide-react";
import { submitInquiry } from "@/lib/api";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormData = z.infer<typeof formSchema>;

export function ContactSection({ settings, socialMedia }: { settings?: any, socialMedia?: any[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await submitInquiry({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });
      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {settings?.contact_subtitle || "Have a project in mind or looking for technical consultation? Let's discuss how we can work together."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-heading font-bold text-foreground mb-6">Contact Information</h3>
            <p className="text-muted-foreground mb-12">
              {settings?.contact_info_text || "I'm currently open for new opportunities, freelance projects, and consultations. Fill out the form or reach out directly."}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center shrink-0">
                  <Mail className="text-primary-accent" />
                </div>
                <div>
                  <h4 className="text-foreground font-medium mb-1">Email</h4>
                  <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${settings?.contact_email || 'contact@devbhavsar.com'}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary-accent transition-colors">
                    {settings?.contact_email || 'contact@devbhavsar.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center shrink-0">
                  <Phone className="text-secondary-accent" />
                </div>
                <div>
                  <h4 className="text-foreground font-medium mb-1">Phone</h4>
                  <a href={`tel:${settings?.phone_number?.replace(/[^0-9+]/g, '') || '+910000000000'}`} className="text-muted-foreground hover:text-secondary-accent transition-colors">
                    {settings?.phone_number || '+91 (000) 000-0000'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center shrink-0">
                  <MapPin className="text-success" />
                </div>
                <div>
                  <h4 className="text-foreground font-medium mb-1">Location</h4>
                  <p className="text-muted-foreground">
                    {settings?.location || 'Available Worldwide (Remote)'}
                  </p>
                </div>
              </div>
            </div>

            {/* Availability Badge */}
            {(() => {
              // Handle database 0/1, strings, or booleans, defaulting to true if undefined
              const isAvailable = settings?.is_available;
              const isAvailableBool = isAvailable === undefined ? true : (isAvailable === true || isAvailable === 1 || isAvailable === '1');
              
              return (
                <div className={`mt-12 inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel ${isAvailableBool ? 'border-success/30 bg-success/5' : 'border-yellow-500/30 bg-yellow-500/5'}`}>
                  <span className={`w-3 h-3 rounded-full animate-pulse ${isAvailableBool ? 'bg-success' : 'bg-yellow-500'}`} />
                  <span className={`font-medium ${isAvailableBool ? 'text-success' : 'text-yellow-500'}`}>
                    {isAvailableBool 
                      ? (settings?.availability_status || "Available for hire") 
                      : "Booking for the next available slot"}
                  </span>
                </div>
              );
            })()}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-accent/10 rounded-full blur-[80px]" />
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">Name</label>
                    <input
                      {...register("name")}
                      id="name"
                      className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-accent/50 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">Email</label>
                    <input
                      {...register("email")}
                      id="email"
                      type="email"
                      className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-accent/50 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground/80 mb-2">Subject</label>
                  <input
                    {...register("subject")}
                    id="subject"
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-accent/50 focus:border-transparent transition-all"
                    placeholder="Project Inquiry"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-destructive">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">Message</label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={5}
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-accent/50 focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-accent text-background font-semibold py-4 rounded-xl hover:bg-foreground transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Send Message <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <p className="text-center text-success mt-4 bg-success/10 py-2 rounded-lg border border-success/20">
                    Message sent successfully! I'll get back to you soon.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-center text-destructive mt-4 bg-destructive/10 py-2 rounded-lg border border-destructive/20">
                    Failed to send message. Please try again later.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
