"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/app/utils";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate send — replace with real form endpoint
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", company: "", message: "" });
  };

  const contactDetails = [
    {
      icon: <MapPin size={16} />,
      label: "Location",
      value: siteConfig.location,
      href: null,
    },
    {
      icon: <Mail size={16} />,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: <Phone size={16} />,
      label: "Phone",
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone}`,
    },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#00D4FF]/5 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#7C3AED]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-label mb-6"
        >
          Get In Touch
        </motion.div>

        {/* Hero headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-5xl lg:text-7xl leading-tight mb-6">
            Let&apos;s Build Your Next{" "}
            <span className="gradient-text italic">Growth Story</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you&apos;re a founder looking to scale, a brand wanting
            better content, or a startup needing visibility — let&apos;s talk.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Identity card */}
            <div
              className="glass rounded-3xl p-8 border border-border/40"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,212,255,0.04), rgba(124,58,237,0.04))",
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))",
                    border: "1px solid rgba(0,212,255,0.2)",
                  }}
                >
                  CJ
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl">
                    {siteConfig.name}
                  </h3>
                  <p className="text-sm text-[#00D4FF] font-mono">
                    {siteConfig.title}
                  </p>
                </div>
              </div>

              {/* Contact items */}
              <div className="flex flex-col gap-4">
                {contactDetails.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg glass border border-border/40 flex items-center justify-center text-[#00D4FF] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-mono">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-foreground hover:text-[#00D4FF] transition-colors flex items-center gap-1"
                        >
                          {item.value}
                          <ExternalLink size={10} className="opacity-50" />
                        </a>
                      ) : (
                        <p className="text-sm text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col gap-3">
              <motion.a
                href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20Charles%2C%20I%27d%20like%20to%20discuss%20a%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                }}
              >
                <MessageCircle size={18} />
                WhatsApp Me
              </motion.a>

              <motion.a
                href={`mailto:${siteConfig.email}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold glass border border-border/40 hover:border-[#00D4FF]/30 transition-all duration-300"
              >
                <Mail size={18} />
                Send Email
              </motion.a>
            </div>

            {/* TikTok */}
            <div className="glass rounded-2xl p-5 border border-border/40 flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{
                  background: "rgba(0,212,255,0.1)",
                  border: "1px solid rgba(0,212,255,0.2)",
                }}
              >
                📱
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono">
                  TikTok
                </p>
                <a
                  href={`https://www.tiktok.com/${siteConfig.tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sm hover:text-[#00D4FF] transition-colors flex items-center gap-1"
                >
                  {siteConfig.tiktok}
                  <ExternalLink size={11} className="opacity-50" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-8 sm:p-10 border border-border/40">
              <h3 className="font-display text-2xl font-bold mb-2">
                Send a Message
              </h3>
              <p className="text-muted-foreground text-sm mb-8">
                I typically respond within 24 hours.
              </p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <div className="text-5xl">🎉</div>
                  <h4 className="font-display text-2xl font-bold gradient-text">
                    Message Sent!
                  </h4>
                  <p className="text-muted-foreground">
                    I&apos;ll get back to you soon. Looking forward to talking
                    growth.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 px-6 py-2.5 glass rounded-xl border border-border/40 text-sm hover:border-[#00D4FF]/30 transition-all"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl glass border border-border/40 text-sm text-foreground bg-transparent placeholder-muted-foreground/40 focus:outline-none focus:border-[#00D4FF]/40 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl glass border border-border/40 text-sm text-foreground bg-transparent placeholder-muted-foreground/40 focus:outline-none focus:border-[#00D4FF]/40 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                      Company / Brand
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your startup or brand name"
                      className="w-full px-4 py-3 rounded-xl glass border border-border/40 text-sm text-foreground bg-transparent placeholder-muted-foreground/40 focus:outline-none focus:border-[#00D4FF]/40 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell me about your brand, your goals, and how you found me..."
                      className="w-full px-4 py-3 rounded-xl glass border border-border/40 text-sm text-foreground bg-transparent placeholder-muted-foreground/40 focus:outline-none focus:border-[#00D4FF]/40 transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-white disabled:opacity-60 transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
                    }}
                  >
                    {sending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
