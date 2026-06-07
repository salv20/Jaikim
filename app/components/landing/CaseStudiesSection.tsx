"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  X,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Users,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Lightbulb,
  BarChart2,
  Image as ImageIcon,
  Target,
  ShoppingCart,
  Package,
  Link,
} from "lucide-react";
import Image from "next/image";
import { caseStudies } from "@/app/utils";
import CaseStudyModal from "@/app/modals/CaseStudyModal";

type CaseStudy = (typeof caseStudies)[0];
type Result = CaseStudy["results"][0];

const RESULT_ICONS: Record<string, React.ReactNode> = {
  users: <Users size={15} />,
  eye: <Eye size={15} />,
  heart: <Heart size={15} />,
  share: <Share2 size={15} />,
  bookmark: <Bookmark size={15} />,
  "bar-chart": <BarChart2 size={15} />,
  target: <Target size={15} />,
  "shopping-cart": <ShoppingCart size={15} />,
  package: <Package size={15} />,
  "trending-up": <TrendingUp size={15} />,
};

function ResultIcon({ icon }: { icon: string }) {
  return <>{RESULT_ICONS[icon] ?? <BarChart2 size={15} />}</>;
}

export default function CaseStudiesSection() {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <>
      <section
        id="case-studies"
        className="section-padding relative overflow-hidden"
      >
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[130px] pointer-events-none opacity-25"
          style={{ background: "var(--glow-electric)" }}
        />

        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-semibold mb-2"
          >
            Case Studies
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-2 items-end">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-bold text-2xl sm:text-3xl"
            >
              Real Results,&nbsp;
              <span className="gradient-text italic">Real Brands</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-muted-foreground text-lg"
            >
              Every case study is a story of strategy, consistency, and genuine
              audience connection. Click any card to see the full breakdown.
            </motion.p>
          </div>

          {/* Cards grid — 3 cols on xl so 5 cards sit cleanly */}
          <div
            ref={ref}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6"
          >
            {caseStudies.map((study, i) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: i * 0.1,
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setSelectedStudy(study)}
                className="group relative rounded-3xl p-7 border cursor-pointer overflow-hidden
                           transition-all duration-300"
                style={{
                  background: "var(--metric-bg)",
                  borderColor: "var(--metric-border)",
                }}
                whileHover={{ borderColor: `${study.color}40`, y: -3 }}
              >
                {/* Left accent bar on hover */}
                <div
                  className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full opacity-0
                             group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: study.color }}
                />

                {/* Number + arrow */}
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="font-mono text-4xl font-bold leading-none select-none"
                    // style={{ color: `${study.color}28` }}
                  >
                    {study.number}
                  </span>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center
                               transition-transform duration-300
                               group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{
                      background: `${study.color}12`,
                      border: `1px solid ${study.color}28`,
                      color: study.color,
                    }}
                  >
                    <ArrowRight size={15} />
                  </div>
                </div>

                {/* Industry */}
                <span
                  className="inline-block px-2.5 py-1 rounded-full text-[11px] font-mono mb-4"
                  style={{
                    background: `${study.color}10`,
                    color: study.color,
                    border: `1px solid ${study.color}25`,
                  }}
                >
                  {study.industry}
                </span>

                {/* Client */}
                <h3
                  className="font-display text-xl font-bold mb-1"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {study.client}
                </h3>

                {/* Role */}
                <p
                  className="text-xs font-mono mb-3"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {study.role}
                </p>

                {/* Tagline */}
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {study.tagline}
                </p>

                {/* Top 2 results */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {study.results.slice(0, 2).map((result: Result) => (
                    <div
                      key={result.label}
                      className="rounded-xl p-3 border"
                      style={{
                        background: `${study.color}07`,
                        borderColor: `${study.color}18`,
                      }}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span style={{ color: study.color, opacity: 0.7 }}>
                          <ResultIcon icon={result.icon} />
                        </span>
                        <p
                          className="text-[10px] font-mono truncate"
                          style={{ color: "hsl(var(--muted-foreground))" }}
                        >
                          {result.label}
                        </p>
                      </div>
                      <p
                        className="font-bold text-sm leading-none"
                        style={{ color: study.color }}
                      >
                        {result.after}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer row — tiktok link + view prompt */}
                <div
                  className="flex items-center justify-between pt-4 border-t"
                  style={{ borderColor: "var(--metric-border)" }}
                >
                  {study.website ? (
                    <a
                      href={study.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono
                                 transition-colors duration-200"
                      style={{ color: study.color }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.opacity =
                          "0.75")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.opacity = "1")
                      }
                    >
                      <Link size={11} />
                      TikTok Profile
                    </a>
                  ) : (
                    <span />
                  )}

                  <div
                    className="flex items-center gap-1.5 text-[11px] font-mono
                               text-muted-foreground/50 group-hover:text-muted-foreground
                               transition-colors duration-300"
                  >
                    <ExternalLink size={11} />
                    <span>Full breakdown</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedStudy && (
          <CaseStudyModal
            study={selectedStudy}
            onClose={() => setSelectedStudy(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
