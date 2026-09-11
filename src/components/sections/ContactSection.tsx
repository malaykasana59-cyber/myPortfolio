"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactSchema, ContactFormSchema } from "@/lib/validations";
import { profileData } from "@/data/profile";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  Check,
  Copy,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/ui/Icons";

const quickSubjects = [
  "Software Engineering Internship",
  "Backend & Systems Collaboration",
  "C++ / DSA Project Inquiry",
  "General Tech Discussion ☕",
];

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      botcheck: "",
    },
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    toast.success("Email address copied to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSelectQuickSubject = (subject: string) => {
    setSelectedSubject(subject);
    setValue("subject", subject, { shouldValidate: true });
    toast.info(`Subject set: "${subject}"`);
  };

  const onSubmit = async (data: ContactFormSchema) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(result.message || "Thank you! Your message was sent.");
        reset();
        setSelectedSubject("");

        // Trigger celebratory confetti burst
        try {
          confetti({
            particleCount: 85,
            spread: 65,
            origin: { y: 0.75 },
          });
        } catch {
          // ignore if canvas unsupported
        }
      } else {
        toast.error(result.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Network error. Please try reaching out via direct email instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Github className="w-4 h-4" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "twitter / x":
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading
        badge="Get in Touch"
        title="Let's Build Something Great"
        subtitle="Have an engineering internship role, software project, or want to discuss low-level systems & algorithms? Drop a message below."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
        {/* Left Column: Direct Touchpoints */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Direct Channels & Availability
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              I am actively seeking Software Engineering internship opportunities. Feel free to connect via email, LinkedIn, or GitHub.
            </p>

            <div className="space-y-3 sm:space-y-4 pt-1">
              {/* Email Touchpoint with Copy Button */}
              <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-secondary/60 border border-border/60 gap-2">
                <div className="flex items-center gap-3 overflow-hidden min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase">
                      Direct Email
                    </p>
                    <a
                      href={`mailto:${profileData.email}`}
                      className="text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors truncate block"
                    >
                      {profileData.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 sm:p-2.5 rounded-xl hover:bg-card text-muted-foreground hover:text-foreground border border-transparent hover:border-border active:scale-95 transition-all shrink-0 min-w-[38px] min-h-[38px] flex items-center justify-center"
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location Touchpoint */}
              <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-secondary/60 border border-border/60">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase">
                    Location & Timezone
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-foreground">
                    {profileData.location}
                  </p>
                </div>
              </div>

              {/* Response Time Indicator */}
              <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-secondary/60 border border-border/60">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase">
                    Turnaround Time
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-foreground">
                    Prompt reply within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Social profiles list */}
            <div className="pt-3 sm:pt-4 border-t border-border/60">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 sm:mb-3">
                Connect on Social Networks
              </p>
              <div className="flex flex-wrap gap-2">
                {profileData.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-secondary/40 hover:bg-secondary text-xs font-medium text-foreground hover:border-primary/40 active:scale-95 transition-all min-h-[40px]"
                  >
                    {getSocialIcon(social.platform)}
                    <span>{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-5 sm:p-8 shadow-sm space-y-5 sm:space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                Send a Direct Message
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Fill out the fields or select a quick topic below to start a conversation.
              </p>
            </div>

            {/* Quick Topic Chips with interactive bounce */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-primary" />
                <span>Quick Topics:</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {quickSubjects.map((qs) => {
                  const isSelected = selectedSubject === qs;
                  return (
                    <button
                      key={qs}
                      type="button"
                      onClick={() => handleSelectQuickSubject(qs)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 min-h-[34px] ${
                        isSelected
                          ? "bg-primary text-white font-semibold shadow-sm"
                          : "bg-secondary/70 hover:bg-primary/10 hover:text-primary border border-border/80 text-muted-foreground"
                      }`}
                    >
                      {qs}
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {/* Anti-spam Honeypot */}
              <input
                type="text"
                {...register("botcheck")}
                className="sr-only"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold uppercase tracking-wider text-foreground"
                  >
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Alex Rivera"
                    {...register("name")}
                    className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-[border-color,box-shadow] min-h-[42px] ${
                      errors.name ? "border-red-500 ring-1 ring-red-500" : "border-border"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name.message}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-foreground"
                  >
                    Your Email <span className="text-primary">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. alex@example.com"
                    {...register("email")}
                    className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-[border-color,box-shadow] min-h-[42px] ${
                      errors.email ? "border-red-500 ring-1 ring-red-500" : "border-border"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email.message}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label
                  htmlFor="subject"
                  className="block text-xs font-semibold uppercase tracking-wider text-foreground"
                >
                  Subject <span className="text-primary">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="e.g. Software Engineering Opportunity / DTU Candidate"
                  {...register("subject")}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-[border-color,box-shadow] min-h-[42px] ${
                    errors.subject ? "border-red-500 ring-1 ring-red-500" : "border-border"
                  }`}
                />
                {errors.subject && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.subject.message}</span>
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold uppercase tracking-wider text-foreground"
                >
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Share details about your timeline, role scope, or tech stacks..."
                  {...register("message")}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-[border-color,box-shadow] resize-none ${
                    errors.message ? "border-red-500 ring-1 ring-red-500" : "border-border"
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.message.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button with tactile hover and tap feedback */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-md shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95 transition-all min-h-[48px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
