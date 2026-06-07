"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { siteConfig } from "@/app/utils";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY!;

export default function ContactSection() {
  const COOLDOWN_SECONDS = 600;

  const [cooldown, setCooldown] = useState(() => {
    if (typeof window === "undefined") return 0; // SSR guard
    const stored = localStorage.getItem("contactCooldown");
    if (!stored) return 0;
    const remaining = Math.floor((Number(stored) - Date.now()) / 1000);
    return remaining > 0 ? remaining : 0;
  });

  useEffect(() => {
    if (cooldown <= 0) return;

    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          company: form.company,
          message: form.message,
          reply_to: form.email,
          title: form.name,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("sent");
      setCooldown(COOLDOWN_SECONDS);
      localStorage.setItem(
        "contactCooldown",
        (Date.now() + COOLDOWN_SECONDS * 1000).toString(),
      );
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

  const contactDetails = [
    {
      icon: <MapPin size={15} />,
      label: "Location",
      value: siteConfig.location,
      href: null,
    },
    {
      icon: <Mail size={15} />,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: <Phone size={15} />,
      label: "Phone",
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone}`,
    },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isDisabled = status === "sending" || cooldown > 0;

  const inputClass =
    "w-full px-4 py-3 rounded-xl glass border border-border/40 text-sm text-foreground bg-transparent " +
    "placeholder:text-muted-foreground/40 focus:outline-none focus:border-[color:var(--electric)]/40 transition-colors";

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[color:var(--electric)]/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-[color:var(--violet)]/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto pt-10 pb-20 px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--electric)]">
            Get In Touch
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-6"
        >
          <h2 className="font-bold text-2xl sm:text-3xl leading-tight">
            Let&apos;s Build Your Next{" "}
            <span className="gradient-text italic">Growth Story</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Whether you&apos;re a founder looking to scale, a brand wanting
            better content, or a startup needing visibility — let&apos;s talk.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* ── Left column ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Identity card */}
            <div
              className="glass rounded-2xl p-7 border border-border/30"
              style={{
                background:
                  "linear-gradient(135deg, rgba(var(--electric-rgb),0.04), rgba(var(--violet-rgb),0.04))",
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg text-foreground"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(var(--electric-rgb),0.15), rgba(var(--violet-rgb),0.15))",
                    border: "1px solid rgba(var(--electric-rgb),0.2)",
                  }}
                >
                  CJ
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">
                    {siteConfig.name}
                  </h3>
                  <p className="text-xs text-[color:var(--electric)] font-mono">
                    {siteConfig.title}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {contactDetails.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg glass border border-border/30 flex items-center justify-center text-[color:var(--electric)] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-foreground hover:text-[color:var(--electric)] transition-colors flex items-center gap-1"
                        >
                          {item.value}
                          <ExternalLink size={10} className="opacity-40" />
                        </a>
                      ) : (
                        <p className="text-sm text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <motion.a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20Charles%2C%20I%27d%20like%20to%20discuss%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center btn-primary justify-center gap-2.5 rounded-xl font-semibold text-sm text-white transition-all"
            >
              <MessageCircle size={16} />
              WhatsApp Me
            </motion.a>

            <motion.a
              href={`mailto:${siteConfig.email}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm glass border border-border/30 hover:border-[color:var(--electric)]/30 transition-all"
            >
              <Mail size={16} />
              Send Email
            </motion.a>

            {/* TikTok */}
            <div className="glass rounded-xl p-4 border border-border/30 flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                style={{
                  background: "rgba(var(--electric-rgb),0.1)",
                  border: "1px solid rgba(var(--electric-rgb),0.15)",
                }}
              >
                📱
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                  TikTok
                </p>
                <a
                  href={`https://www.tiktok.com/${siteConfig.tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:text-[color:var(--electric)] transition-colors flex items-center gap-1"
                >
                  {siteConfig.tiktok}
                  <ExternalLink size={10} className="opacity-40" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── Right column — form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-8 border border-border/30">
              <AnimatePresence mode="wait">
                {/* ── Success state ── */}
                {status === "sent" && (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center gap-4 py-14 text-center"
                  >
                    <CheckCircle2 size={56} className="text-green-500" />
                    <h4 className="font-display text-2xl font-bold gradient-text">
                      Message Sent!
                    </h4>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      I&apos;ll get back to you soon. Looking forward to talking
                      growth.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-2 px-5 py-2 glass rounded-xl border border-border/30 text-sm hover:border-[color:var(--electric)]/30 transition-all"
                    >
                      Send Another
                    </button>
                  </motion.div>
                )}

                {/* ── Form ── */}
                {status !== "sent" && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    <h3 className="font-display text-2xl font-bold">
                      Send a Message
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      I typically respond within 24 hours.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          disabled={isDisabled}
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          disabled={isDisabled}
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Your startup or brand name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        disabled={isDisabled}
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about your brand, your goals, and how you found me..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Error banner */}
                    {status === "error" && (
                      <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                        Something went wrong. Please try again or email me
                        directly.
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isDisabled}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="
                      flex items-center justify-center gap-2.5
                      py-3.5 rounded-xl font-semibold text-sm text-white
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-all
"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--electric), var(--violet))",
                      }}
                    >
                      {status === "sending" ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 0.9,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Send Message
                        </>
                      )}
                    </motion.button>

                    {cooldown > 0 && (
                      <div className="flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm">
                        <Clock3 size={16} className="text-amber-500" />
                        <span>
                          You can send another message in{" "}
                          <strong>{formatTime(cooldown)}</strong>
                        </span>
                      </div>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
