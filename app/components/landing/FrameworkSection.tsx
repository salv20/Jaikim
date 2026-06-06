"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { frameworkSteps } from "@/app/utils";

const stepColors = ["#00D4FF", "#7C3AED", "#10B981", "#F59E0B", "#EF4444"];

export default function FrameworkSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section
      id="framework"
      ref={containerRef}
      className="section-padding relative overflow-hidden"
    >
      {/* ambient blobs */}
      <div
        className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-label mb-6"
        >
          My Process
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-end mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl lg:text-7xl leading-[1.0] tracking-tight"
          >
            My Content
            <br />
            <span className="gradient-text italic">Framework</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Five deliberate steps that turn any product into content people
              genuinely stop to watch. No guesswork — only proven system.
            </p>
            <div className="flex items-center gap-3 glass rounded-2xl px-5 py-4 border border-border/40 w-fit">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="font-semibold text-sm">Consistent execution</p>
                <p className="text-xs text-muted-foreground">
                  Applied across 4 brands, 3 countries
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── DESKTOP: BIG HORIZONTAL CARDS ── */}
        <div ref={ref} className="hidden lg:block relative">
          {/* Animated connecting line */}
          <div className="absolute top-[2.6rem] left-[3.5rem] right-[3.5rem] h-px bg-border/30" />
          <motion.div
            className="absolute top-[2.6rem] left-[3.5rem] h-px bg-gradient-to-r from-[#00D4FF] via-[#7C3AED] to-[#EF4444]"
            style={{
              width: lineHeight.get ? undefined : "0%",
              right: "3.5rem",
            }}
            animate={inView ? { width: "85%" } : { width: "0%" }}
            transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="grid grid-cols-5 gap-5">
            {frameworkSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.3 + i * 0.18,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col"
              >
                {/* Step node */}
                <div className="flex justify-center mb-8 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="w-[4.5rem] h-[4.5rem] rounded-2xl flex flex-col items-center justify-center cursor-default"
                    style={{
                      background: `linear-gradient(145deg, ${step.color}22, ${step.color}08)`,
                      border: `1.5px solid ${step.color}50`,
                      boxShadow: `0 0 30px ${step.color}20, inset 0 1px 0 ${step.color}20`,
                    }}
                  >
                    <span
                      className="font-mono font-bold text-lg"
                      style={{ color: step.color }}
                    >
                      {step.step}
                    </span>
                    {/* Pulse ring on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{ border: `1px solid ${step.color}30` }}
                      whileHover={{ scale: 1.3, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 glass rounded-3xl p-6 border border-border/40 overflow-hidden relative"
                  style={{ "--step-color": step.color } as React.CSSProperties}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${step.color}10, transparent 70%)`,
                    }}
                  />

                  <div className="text-4xl mb-5">{step.icon}</div>
                  <h3
                    className="font-semibold text-base leading-snug mb-3"
                    style={{ color: step.color }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Bottom bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      background: `linear-gradient(90deg, ${step.color}, transparent)`,
                    }}
                  />
                </motion.div>

                {/* Arrow between cards */}
                {i < frameworkSteps.length - 1 && (
                  <div className="absolute top-[2.1rem] -right-3 z-20 flex items-center">
                    <motion.div
                      animate={
                        inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }
                      }
                      transition={{ delay: 0.6 + i * 0.18 }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="11"
                          stroke={step.color}
                          strokeOpacity="0.25"
                          strokeWidth="1"
                        />
                        <path
                          d="M10 8l4 4-4 4"
                          stroke={step.color}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── MOBILE: VERTICAL TIMELINE ── */}
        <div className="lg:hidden relative pl-10">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 bottom-2 w-px bg-border/30" />
          <motion.div
            className="absolute left-4 top-2 w-px bg-gradient-to-b from-[#00D4FF] via-[#7C3AED] to-[#EF4444]"
            animate={inView ? { height: "90%" } : { height: "0%" }}
            transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="flex flex-col gap-8">
            {frameworkSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
                className="relative"
              >
                {/* dot */}
                <div
                  className="absolute -left-[2.35rem] top-5 w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: step.color,
                    background: "rgb(var(--background))",
                    boxShadow: `0 0 8px ${step.color}60`,
                  }}
                />

                <div
                  className="glass rounded-2xl p-6 border border-border/40"
                  style={{ borderTopColor: `${step.color}40` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{step.icon}</span>
                    <div>
                      <span
                        className="font-mono text-xs"
                        style={{ color: step.color }}
                      >
                        Step {step.step}
                      </span>
                      <h3 className="font-semibold text-base">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM QUOTE ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 relative overflow-hidden rounded-3xl p-10 sm:p-14 border border-border/40 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(124,58,237,0.08) 50%, rgba(239,68,68,0.04) 100%)",
          }}
        >
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          {/* Big decorative quote mark */}
          <div className="absolute top-4 left-8 font-display text-8xl leading-none text-[#00D4FF]/10 select-none">
            &ldquo;
          </div>
          <div className="absolute bottom-4 right-8 font-display text-8xl leading-none text-[#7C3AED]/10 select-none rotate-180">
            &ldquo;
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="font-display text-2xl sm:text-3xl italic text-foreground/85 leading-relaxed mb-6">
              &ldquo;Every step is intentional.
              <br className="hidden sm:block" /> Every piece of content serves a
              purpose.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,212,255,0.3), rgba(124,58,237,0.3))",
                  border: "1px solid rgba(0,212,255,0.2)",
                }}
              >
                CJ
              </div>
              <span className="text-sm text-muted-foreground font-mono">
                — Charles Jikeme
              </span>
            </div>
          </div>

          {/* Step pills at bottom */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {frameworkSteps.map((step) => (
              <span
                key={step.step}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono"
                style={{
                  background: `${step.color}10`,
                  border: `1px solid ${step.color}25`,
                  color: step.color,
                }}
              >
                {step.icon} {step.title}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
