"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { startupReasons } from "@/app/utils";

export default function StartupSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D4FF]/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-label mb-6"
        >
          For Startups
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center" ref={ref}>
          {/* LEFT: text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="font-display text-5xl lg:text-6xl leading-tight mb-6"
            >
              Why Startups <span className="gradient-text italic">Love</span>{" "}
              Working With Me
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed mb-8"
            >
              I understand the startup mindset because I live it. Limited
              resources. Big ambitions. The pressure to show results fast. I
              build content strategies that deliver measurable growth without
              requiring massive production budgets.
            </motion.p>

            {/* Visual illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative glass rounded-3xl p-6 border border-border/40 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/5 to-[#7C3AED]/5" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00D4FF]/20 to-[#7C3AED]/20 flex items-center justify-center text-lg">
                    📊
                  </div>
                  <div>
                    <div className="font-semibold text-sm">
                      Growth Trajectory
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Cluster Clear Case Study
                    </div>
                  </div>
                </div>
                {/* Fake chart bars */}
                <div className="flex items-end gap-2 h-20">
                  {[10, 18, 15, 30, 25, 45, 40, 60, 75, 90, 100].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={inView ? { height: `${h}%` } : {}}
                      transition={{ delay: 0.5 + i * 0.07, duration: 0.5 }}
                      className="flex-1 rounded-t-sm"
                      style={{
                        background: `linear-gradient(to top, #00D4FF40, #7C3AED40)`,
                        minHeight: 4,
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Dec 2024</span>
                  <span>37 → 1,006+ followers</span>
                  <span>Mar 2026</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Reason cards */}
          <div className="grid grid-cols-2 gap-4">
            {startupReasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                className="glass rounded-2xl p-5 border border-border/40 hover:border-[#00D4FF]/20 transition-all duration-300 group card-hover"
              >
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {reason.icon}
                </div>
                <h4 className="font-semibold text-sm text-foreground mb-2">
                  {reason.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {reason.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
