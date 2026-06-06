"use client";

import { motion } from "framer-motion";
import { brands } from "@/app/utils";

export default function TrustBar() {
  const duplicated = [...brands, ...brands, ...brands];

  return (
    <section className="py-12 relative overflow-hidden border-y border-border/40">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-muted/20 to-background" />

      <div className="max-w-7xl mx-auto px-6 mb-8 text-center relative z-10">
        <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
          Brands I&apos;ve Grown
        </p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div
          className="flex gap-8"
          style={{
            width: "max-content",
            animation: "marquee 20s linear infinite",
          }}
        >
          {duplicated.map((brand, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-8 py-4 glass rounded-2xl border border-border/40 whitespace-nowrap flex-shrink-0 group hover:border-[#00D4FF]/30 transition-all duration-300"
            >
              {/* Logo placeholder */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm font-mono transition-transform group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${brand.color}40, ${brand.color}20)`,
                  border: `1px solid ${brand.color}30`,
                }}
              >
                <span style={{ color: brand.color }}>{brand.shortName}</span>
              </div>
              <span className="font-medium text-sm text-foreground/70 group-hover:text-foreground transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
