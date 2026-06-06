"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { differenceCards } from "@/app/utils";

export default function DifferenceSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#7C3AED]/5 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-label mb-6"
        >
          Differentiators
        </motion.div>

        <div className="max-w-2xl mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl lg:text-6xl leading-tight mb-6"
          >
            What Makes Me{" "}
            <span className="gradient-text italic">Different</span>
          </motion.h2>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative pl-6 border-l-2 border-[#00D4FF]/40"
          >
            <p className="text-xl text-foreground/80 italic font-display leading-relaxed">
              &ldquo;I don&apos;t create content for algorithms. I create
              content for people.&rdquo;
            </p>
            <cite className="text-sm text-muted-foreground mt-2 block not-italic font-mono">
              — Charles Jikeme
            </cite>
          </motion.blockquote>
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {differenceCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative glass rounded-3xl p-7 border border-border/40 hover:border-[#00D4FF]/25 transition-all duration-400 card-hover overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,212,255,0.05), rgba(124,58,237,0.05))",
                }}
              />

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>

              <h3 className="font-semibold text-lg text-foreground mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.desc}
              </p>

              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#00D4FF]/30 via-[#7C3AED]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}

          {/* Quote card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: differenceCards.length * 0.1, duration: 0.6 }}
            className="sm:col-span-2 lg:col-span-1 relative rounded-3xl p-7 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(124,58,237,0.12))",
              border: "1px solid rgba(0,212,255,0.15)",
            }}
          >
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative z-10">
              <div className="text-5xl font-display text-[#00D4FF]/30 leading-none mb-4">
                &ldquo;
              </div>
              <p className="font-display text-xl text-foreground italic leading-relaxed mb-4">
                Understanding people is the most powerful marketing tool that
                exists.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4FF]/30 to-[#7C3AED]/30 flex items-center justify-center text-xs font-bold font-mono">
                  CJ
                </div>
                <span className="text-xs text-muted-foreground">
                  Charles Jikeme
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
