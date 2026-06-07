"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/app/utils";

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.8;
    scrollRef.current.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C3AED]/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className=" mb-6"
        >
          Testimonials
        </motion.div>

        <div className="flex items-end justify-between mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl lg:text-6xl leading-tight max-w-lg"
          >
            What Clients <span className="gradient-text italic">Say</span>
          </motion.h2>

          {/* Navigation */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#00D4FF]/30 border border-border/40 transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#00D4FF]/30 border border-border/40 transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex-shrink-0 w-80 sm:w-96 glass rounded-3xl p-7 border border-border/40 hover:border-[#7C3AED]/30 transition-all duration-400 card-hover"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="fill-[#F59E0B] text-[#F59E0B]"
                  />
                ))}
              </div>

              {/* Quote mark */}
              <div className="text-5xl font-display text-[#7C3AED]/20 leading-none mb-2">
                &ldquo;
              </div>

              {/* Text */}
              <p className="text-sm text-foreground/80 leading-relaxed mb-6 italic">
                {t.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-border/40">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))",
                    border: "1px solid rgba(0,212,255,0.2)",
                  }}
                >
                  {t.placeholder ? "👤" : t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {t.name}
                    {t.placeholder && (
                      <span className="text-xs text-muted-foreground font-normal ml-1">
                        (Testimonial)
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add more placeholder */}
          <div
            className="flex-shrink-0 w-80 sm:w-96 glass rounded-3xl p-7 border border-dashed border-border/40 flex flex-col items-center justify-center gap-3 text-center"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="text-4xl">💬</div>
            <p className="font-semibold text-sm text-muted-foreground">
              More testimonials
            </p>
            <p className="text-xs text-muted-foreground/60 font-mono">
              Add to testimonials array in data/index.ts
            </p>
          </div>
        </div>

        {/* Mobile scroll hint */}
        <p className="text-xs text-muted-foreground/40 font-mono text-center mt-4 md:hidden">
          ← Scroll to see more →
        </p>
      </div>
    </section>
  );
}
