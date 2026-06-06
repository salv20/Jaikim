"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { stats } from "@/app/utils";

export default function ResultsDashboard() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D4FF]/3 to-transparent pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-label mb-6"
        >
          Results
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-5xl lg:text-6xl leading-tight">
              Growth That <br />
              <span className="gradient-text italic">Speaks For Itself</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-end"
          >
            <p className="text-muted-foreground leading-relaxed">
              Every number here represents a real person who stopped scrolling,
              watched, engaged, and followed. Real growth from real strategy.
            </p>
          </motion.div>
        </div>

        {/* Stats grid */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="metric-card rounded-3xl p-6 relative overflow-hidden group card-hover"
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                style={{
                  background: `radial-gradient(circle at 50% 0%, rgba(0,212,255,0.08), transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div className="font-display font-bold text-4xl md:text-5xl mb-1 gradient-text">
                  {inView ? (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      delay={0.3 + i * 0.1}
                      separator=","
                      suffix={stat.suffix}
                    />
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </div>
                <div className="font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.sublabel}
                </div>

                {/* Bottom accent line */}
                <div className="mt-4 h-px bg-gradient-to-r from-[#00D4FF]/40 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
