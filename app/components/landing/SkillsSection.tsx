"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { platforms, tools, coreStrengths } from "@/app/utils";

const platformColors: Record<string, string> = {
  TikTok: "#00D4FF",
  Instagram: "#E1306C",
  Facebook: "#1877F2",
};

export default function SkillsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D4FF]/2 to-transparent pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-label mb-6"
        >
          Skills & Tools
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl lg:text-6xl leading-tight"
          >
            Built for{" "}
            <span className="gradient-text italic">Modern Growth</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-muted-foreground leading-relaxed"
          >
            A modern toolkit built for the platforms, formats, and attention
            spans of today — continuously evolving as the landscape changes.
          </motion.p>
        </div>

        <div ref={ref} className="grid lg:grid-cols-3 gap-8">
          {/* Platforms */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="glass rounded-3xl p-8 border border-border/40"
          >
            <h3 className="font-semibold text-sm font-mono uppercase tracking-wider text-muted-foreground mb-6">
              Platforms
            </h3>
            <div className="flex flex-col gap-5">
              {platforms.map((p, i) => (
                <div key={p.name}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{p.icon}</span>
                      <span className="font-medium text-sm">{p.name}</span>
                    </div>
                    <span
                      className="text-xs font-mono"
                      style={{ color: platformColors[p.name] }}
                    >
                      {p.level}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-border/40 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${platformColors[p.name]}, ${platformColors[p.name]}80)`,
                      }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${p.level}%` } : { width: 0 }}
                      transition={{
                        duration: 1.2,
                        delay: 0.3 + i * 0.15,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass rounded-3xl p-8 border border-border/40"
          >
            <h3 className="font-semibold text-sm font-mono uppercase tracking-wider text-muted-foreground mb-6">
              Tools
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl glass border border-border/40 hover:border-[#00D4FF]/25 transition-all duration-300 cursor-default"
                >
                  <span className="text-lg">{tool.icon}</span>
                  <span className="text-xs font-medium text-foreground/80 leading-tight">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Core Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass rounded-3xl p-8 border border-border/40"
          >
            <h3 className="font-semibold text-sm font-mono uppercase tracking-wider text-muted-foreground mb-6">
              Core Strengths
            </h3>
            <div className="flex flex-wrap gap-2">
              {coreStrengths.map((strength, i) => (
                <motion.span
                  key={strength}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium cursor-default transition-all duration-300"
                  style={{
                    background: `rgba(0,212,255,${0.04 + (i % 3) * 0.03})`,
                    border: "1px solid rgba(0,212,255,0.15)",
                    color:
                      i % 3 === 0
                        ? "#00D4FF"
                        : i % 3 === 1
                          ? "#7C3AED"
                          : "#10B981",
                    borderColor:
                      i % 3 === 0
                        ? "rgba(0,212,255,0.2)"
                        : i % 3 === 1
                          ? "rgba(124,58,237,0.2)"
                          : "rgba(16,185,129,0.2)",
                  }}
                >
                  {strength}
                </motion.span>
              ))}
            </div>

            {/* Quote */}
            <div className="mt-8 pt-6 border-t border-border/40">
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                &ldquo;Skills are tools. Strategy is knowing which tool to use,
                when, and why.&rdquo;
              </p>
              <p className="text-xs text-muted-foreground/50 font-mono mt-2">
                — Charles Jikeme
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 glass rounded-3xl p-6 border border-border/40 grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,212,255,0.04), rgba(124,58,237,0.04))",
          }}
        >
          {[
            { label: "Years Active", value: "2+", icon: "📅" },
            { label: "Industries Served", value: "5", icon: "🏭" },
            { label: "Content Pieces Created", value: "200+", icon: "🎬" },
            { label: "Avg. Video Performance", value: "Top 5%", icon: "⭐" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="font-display font-bold text-xl gradient-text">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
