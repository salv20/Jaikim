"use client";

import { aboutTimeline, industries } from "@/app/utils";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Smartphone,
  Target,
  TrendingUp,
  Users,
  Globe,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// Map industries to lucide icons
const industryIcons: Record<string, React.ReactNode> = {
  Fintech: <TrendingUp size={14} />,
  "Trading Technology": <TrendingUp size={14} />,
  Beauty: <Lightbulb size={14} />,
  "AI Sports Technology": <Target size={14} />,
  "Consumer Apps": <Smartphone size={14} />,
};

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.13 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-40"
        style={{ background: "var(--glow-violet)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{ background: "var(--glow-electric)" }}
      />

      <div className="container mx-auto py-8 px-4">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="section-label mb-6"
        >
          About
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-start" ref={ref}>
          {/* ── LEFT: Story ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <motion.h2
              variants={itemVariants}
              className="font-display font-bold text-2xl sm:text-4xl leading-[1.08] mb-4"
            >
              Who Is&nbsp;
              <span className="gradient-text italic">Charles Jikeme?</span>
            </motion.h2>

            {/* Hook lines */}
            <motion.div
              variants={itemVariants}
              className="mb-6 pl-4 border-l-2"
              style={{ borderColor: "var(--electric)" }}
            >
              <p className="font-display text-xl text-foreground/70 italic leading-snug">
                Most people scroll.
              </p>
              <p className="font-display text-xl gradient-text font-semibold italic">
                I study why they stop.
              </p>
            </motion.div>

            {/* Body copy */}
            <motion.div
              variants={itemVariants}
              className="space-y-5 text-muted-foreground leading-relaxed text-[15px]"
            >
              <p>
                I&apos;m a Social Media Growth Strategist based in Port
                Harcourt, Nigeria — and a Nursing student at the University of
                Port Harcourt. I built my expertise not in a classroom, but by
                obsessively studying&nbsp;
                <span className="text-foreground font-medium">
                  audience behaviour, attention psychology,
                </span>
                &nbsp;and the mechanics behind why some content goes viral while
                other content disappears.
              </p>
              <p>
                I&apos;ve helped startups across multiple industries — from
                fintech to AI sports technology — build genuine social media
                presence. Not vanity metrics.&nbsp;
                <span className="text-foreground font-medium">
                  Real growth.
                </span>
                &nbsp;Real engagement. Content that makes people stop, watch,
                and care.
              </p>
              <p>
                Working across&nbsp;
                <span className="text-foreground font-medium">3 countries</span>
                &nbsp;and multiple industries has given me the ability to adapt
                fast, understand diverse audiences, and build strategies that
                work regardless of niche or market.
              </p>
            </motion.div>

            {/* Quick facts strip */}
            <motion.div
              variants={itemVariants}
              className="mt-10 grid grid-cols-3 gap-4"
            >
              {[
                {
                  icon: <Globe size={18} />,
                  label: "3 Countries",
                  sub: "International reach",
                },
                {
                  icon: <Users size={18} />,
                  label: "4+ Brands",
                  sub: "Scaled to growth",
                },
                {
                  icon: <TrendingUp size={18} />,
                  label: "1M+ Views",
                  sub: "Generated in total",
                },
              ].map((fact) => (
                <div
                  key={fact.label}
                  className="metric-card rounded-2xl p-4 flex flex-col gap-2"
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: "rgba(var(--electric-rgb), 0.10)",
                      color: "var(--electric)",
                    }}
                  >
                    {fact.icon}
                  </span>
                  <div>
                    <p className="font-display font-bold text-base text-foreground leading-none">
                      {fact.label}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {fact.sub}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Industries */}
            <motion.div variants={itemVariants} className="mt-10">
              <p className="text-[11px] font-mono tracking-widest uppercase text-muted-foreground mb-4">
                Industries Served
              </p>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind, i) => (
                  <motion.span
                    key={ind}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.55 + i * 0.08 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm
                               font-medium text-foreground/70 border transition-all cursor-default
                               hover:text-foreground"
                    style={{
                      background: "var(--metric-bg)",
                      borderColor: "var(--metric-border)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(var(--electric-rgb), 0.30)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "var(--metric-border)";
                    }}
                  >
                    <span style={{ color: "var(--electric)" }}>
                      {industryIcons[ind] ?? <CheckCircle2 size={13} />}
                    </span>
                    {ind}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="mt-10">
              <a
                href="#case-studies"
                className="btn-primary inline-flex items-center gap-2 group"
              >
                <span>See My Work</span>
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Timeline ── */}
          <div className="relative">
            {/* Profile summary card — replaces the image collage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="mb-12 rounded-3xl glass border p-6 relative overflow-hidden"
              style={{ borderColor: "var(--glass-border)" }}
            >
              {/* Decorative corner glow */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl pointer-events-none"
                style={{ background: "rgba(var(--violet-rgb), 0.12)" }}
              />

              <div className="flex items-center gap-5 mb-6">
                {/* Avatar — initials only, no image placeholder text */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 font-display font-bold text-2xl gradient-text border">
                  CJ
                </div>
                <div>
                  <p className="font-display font-semibold text-lg text-foreground leading-tight">
                    Charles Jikeme
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Social Media Growth Strategist
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-green-400">
                      Port Harcourt, Nigeria
                    </span>
                  </div>
                </div>
              </div>

              {/* Skill bars */}
              <div className="space-y-4">
                {[
                  { label: "Content Strategy", pct: 95 },
                  { label: "Audience Psychology", pct: 92 },
                  { label: "Trend Research", pct: 88 },
                  { label: "Community Growth", pct: 85 },
                ].map((skill) => (
                  <div key={skill.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs font-medium text-foreground/80">
                        {skill.label}
                      </span>
                      <span
                        className="text-xs font-mono font-semibold"
                        style={{ color: "var(--electric)" }}
                      >
                        {skill.pct}%
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full w-full"
                      style={{ background: "var(--metric-bg)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, var(--electric), var(--violet))",
                          width: "0%",
                        }}
                        animate={inView ? { width: `${skill.pct}%` } : {}}
                        transition={{
                          duration: 1.1,
                          delay: 0.5,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-[18px] top-0 bottom-0 w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--electric), rgba(var(--violet-rgb),0.5), transparent)",
                }}
              />

              <div className="space-y-8 pl-12">
                {aboutTimeline.map((t, i) => (
                  <motion.div
                    key={t.year}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.38 + i * 0.14, duration: 0.6 }}
                    className="relative group"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-12 top-0.5 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-all"
                      style={{
                        borderColor: "var(--electric)",
                        background: "hsl(var(--background))",
                        boxShadow: "0 0 10px rgba(var(--electric-rgb), 0.40)",
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--electric)" }}
                      />
                    </div>

                    {/* Year pill */}
                    <span
                      className="inline-block font-mono text-[11px] font-semibold tracking-widest px-2.5 py-1 rounded-md mb-2"
                      style={{
                        color: "var(--electric)",
                        background: "rgba(var(--electric-rgb), 0.10)",
                      }}
                    >
                      {t.year}
                    </span>

                    {/* Card */}
                    <div
                      className="rounded-2xl border p-4 transition-all group-hover:border-[rgba(var(--electric-rgb),0.25)]"
                      style={{
                        background: "var(--metric-bg)",
                        borderColor: "var(--metric-border)",
                      }}
                    >
                      <h4 className="font-display font-semibold text-[15px] text-foreground mb-1">
                        {t.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
