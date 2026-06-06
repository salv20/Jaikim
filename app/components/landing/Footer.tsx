"use client";

import { motion } from "framer-motion";
import { footerQuote, footerQuestion, siteConfig } from "@/app/utils";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[#7C3AED]/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-10 relative z-10">
        {/* Main Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="font-display text-5xl text-[#00D4FF]/15 leading-none mb-4">
            &ldquo;
          </div>
          <p className="font-display text-2xl sm:text-3xl text-foreground/80 italic leading-relaxed whitespace-pre-line">
            {footerQuote.replace(/"/g, "")}
          </p>
          <div className="mt-10 pt-8 border-t border-border/40">
            <p className="font-display text-xl sm:text-2xl font-bold gradient-text">
              {footerQuestion}
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent mb-12" />

        {/* Footer Links Row */}
        <div className="grid sm:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#7C3AED] flex items-center justify-center">
                <span className="text-white font-bold text-sm font-mono">
                  CJ
                </span>
              </div>
              <span className="font-display font-semibold">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {siteConfig.title}
            </p>
            <p className="text-xs text-muted-foreground/60 font-mono mt-2">
              {siteConfig.location}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                "About",
                "Framework",
                "Case Studies",
                "Gallery",
                "Skills",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-muted-foreground hover:text-[#00D4FF] transition-colors"
              >
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {siteConfig.phone}
              </a>
              <a
                href={`https://www.tiktok.com/${siteConfig.tiktok}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-[#00D4FF] transition-colors"
              >
                TikTok: {siteConfig.tiktok}
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-border/40 to-transparent mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60 font-mono">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for new projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
