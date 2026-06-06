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

function isVideo(src: string) {
  return /\.(mp4|webm|mov|ogg)$/i.test(src);
}

function MediaItem({
  src,
  alt,
  color,
  index,
}: {
  src?: string;
  alt: string;
  color: string;
  index: number;
}) {
  if (src && isVideo(src)) {
    return (
      <div
        className="aspect-video rounded-xl overflow-hidden border bg-black"
        style={{ borderColor: "var(--metric-border)" }}
      >
        <video
          src={src}
          controls
          preload="metadata"
          className="w-full h-full object-cover"
          aria-label={alt}
        />
      </div>
    );
  }

  if (src) {
    return (
      <div
        className="aspect-video rounded-xl overflow-hidden border relative"
        style={{ borderColor: "var(--metric-border)" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div
      className="aspect-video rounded-xl border border-dashed flex flex-col items-center justify-center gap-2"
      style={{ borderColor: `${color}25`, background: `${color}05` }}
    >
      <ImageIcon
        size={18}
        style={{ color: "var(--color-muted-foreground)", opacity: 0.4 }}
      />
      <span className="text-[10px] font-mono text-muted-foreground opacity-40">
        Screenshot {index + 1}
      </span>
    </div>
  );
}

function CaseStudyModal({
  study,
  onClose,
}: {
  study: CaseStudy;
  onClose: () => void;
}) {
  const media: Array<{ src?: string; alt: string }> =
    study.media ??
    [0, 1, 2].map((i) => ({ alt: `${study.client} screenshot ${i + 1}` }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 36, scale: 0.97 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl my-8 rounded-3xl overflow-hidden"
        style={{
          background: "hsl(var(--background))",
          border: `1px solid ${study.color}28`,
          boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="h-[3px] w-full" style={{ background: study.color }} />

        <div className="p-8 sm:p-10">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-xl flex items-center justify-center
                       transition-colors border"
            style={{
              background: "var(--metric-bg)",
              borderColor: "var(--metric-border)",
              color: "hsl(var(--muted-foreground))",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "hsl(var(--foreground))")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "hsl(var(--muted-foreground))")
            }
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          {/* Number */}
          <p className="font-mono text-[11px] tracking-widest text-muted-foreground mb-2 uppercase">
            Case Study {study.number}
          </p>

          {/* Client + TikTok link */}
          <div className="flex flex-wrap items-start gap-4 mb-4">
            <h2
              className="font-display text-3xl sm:text-4xl font-bold leading-tight"
              style={{ color: study.color }}
            >
              {study.client}
            </h2>
            {study.website && (
              <a
                href={study.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono
                           font-medium border transition-all mt-1"
                style={{
                  background: `${study.color}10`,
                  borderColor: `${study.color}30`,
                  color: study.color,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    `${study.color}1e`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    `${study.color}10`;
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={11} />
                View on TikTok
              </a>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span
              className="px-3 py-1 rounded-full text-xs font-mono border"
              style={{
                background: "var(--metric-bg)",
                borderColor: "var(--metric-border)",
                color: "hsl(var(--foreground))",
                opacity: 0.85,
              }}
            >
              {study.role}
            </span>
            {study.period && (
              <span
                className="px-3 py-1 rounded-full text-xs font-mono border"
                style={{
                  background: "var(--metric-bg)",
                  borderColor: "var(--metric-border)",
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                {study.period}
              </span>
            )}
            <span
              className="px-3 py-1 rounded-full text-xs font-mono border"
              style={{
                borderColor: `${study.color}35`,
                color: study.color,
                background: `${study.color}10`,
              }}
            >
              {study.industry}
            </span>
          </div>

          {/* Description */}
          <p
            className="leading-relaxed mb-10 text-[15px]"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            {study.description}
          </p>

          {/* Results */}
          <div className="mb-10">
            <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Key Results
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {study.results.map((result: Result, i: number) => (
                <motion.div
                  key={result.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07 }}
                  className="rounded-2xl p-4 border"
                  style={{
                    background: "var(--metric-bg)",
                    borderColor: "var(--metric-border)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${study.color}14`,
                        color: study.color,
                      }}
                    >
                      <ResultIcon icon={result.icon} />
                    </span>
                    <p
                      className="text-xs font-mono"
                      style={{ color: "hsl(var(--muted-foreground))" }}
                    >
                      {result.label}
                    </p>
                  </div>
                  {result.before && (
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-sm line-through"
                        style={{ color: "hsl(var(--muted-foreground))" }}
                      >
                        {result.before}
                      </span>
                      <TrendingUp size={11} className="text-emerald-400" />
                    </div>
                  )}
                  <p
                    className="font-display font-bold text-xl leading-none"
                    style={{ color: study.color }}
                  >
                    {result.after}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key insight */}
          <div
            className="rounded-2xl p-5 border mb-10 flex gap-4 items-start"
            style={{
              background: `${study.color}07`,
              borderColor: `${study.color}22`,
            }}
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: `${study.color}15`, color: study.color }}
            >
              <Lightbulb size={16} />
            </span>
            <div>
              <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest mb-1.5">
                Key Insight
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "hsl(var(--foreground))", opacity: 0.82 }}
              >
                {study.highlight}
              </p>
            </div>
          </div>

          {/* Media */}
          <div>
            <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Analytics &amp; Screenshots
            </p>
            <div
              className={`grid gap-3 ${
                media.length === 1
                  ? "grid-cols-1"
                  : media.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-3"
              }`}
            >
              {media.map((m, i) => (
                <MediaItem
                  key={i}
                  src={m.src}
                  alt={m.alt}
                  color={study.color}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-label mb-6"
          >
            Case Studies
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-5xl lg:text-6xl leading-tight"
            >
              Real Results,{" "}
              <span className="gradient-text italic">Real Brands</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed text-lg"
            >
              Every case study is a story of strategy, consistency, and genuine
              audience connection. Click any card to see the full breakdown.
            </motion.p>
          </div>

          {/* Cards grid — 3 cols on xl so 5 cards sit cleanly */}
          <div ref={ref} className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
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
                    style={{ color: `${study.color}28` }}
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
