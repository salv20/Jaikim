"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Eye, X, ChevronRight, Zap, TrendingUp } from "lucide-react";
import { videoCategories, videos } from "@/app/utils";
import Image from "next/image";

type Video = (typeof videos)[0];

/* ─── VIDEO MODAL ─── */
function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(24px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl rounded-3xl overflow-hidden border border-border/40 shadow-2xl"
        style={{ background: "rgb(10,10,16)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient header bar */}
        <div
          className="h-1.5 w-full"
          style={{
            background: "linear-gradient(90deg, #00D4FF, #7C3AED, #EF4444)",
          }}
        />

        {/* Player area */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          {video.url ? (
            <iframe
              src={video.url}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              title={video.title}
            />
          ) : (
            <div className="flex flex-col items-center gap-5 text-center px-8">
              {/* Animated rings */}
              <div className="relative">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-[#00D4FF]/20"
                    animate={{ scale: [1, 1.8 + i * 0.4], opacity: [0.5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeOut",
                    }}
                  />
                ))}
                <div
                  className="relative w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #00D4FF20, #7C3AED20)",
                    border: "1.5px solid rgba(0,212,255,0.3)",
                  }}
                >
                  <Play size={30} className="text-[#00D4FF] ml-1" />
                </div>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-foreground mb-1">
                  {video.title}
                </p>
                <p className="text-sm text-muted-foreground font-mono">
                  Connect a video URL in{" "}
                  <code className="text-[#00D4FF]/70">src/data/index.ts</code>
                </p>
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
            style={{
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <X size={16} className="text-white" />
          </button>
        </div>

        {/* Info strip */}
        <div className="p-6 flex flex-wrap items-start gap-6 justify-between">
          <div>
            <p className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider mb-1">
              {video.client}
            </p>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">
              {video.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
              {video.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <div className="glass rounded-2xl px-5 py-3 border border-border/40 text-center">
              <div className="flex items-center gap-2">
                <Eye size={14} className="text-[#00D4FF]" />
                <span className="font-display font-bold text-xl gradient-text-blue">
                  {video.views}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Total Views
              </p>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-mono text-center"
              style={{
                background: "rgba(0,212,255,0.08)",
                color: "#00D4FF",
                border: "1px solid rgba(0,212,255,0.15)",
              }}
            >
              {video.category}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── WAVEFORM PLACEHOLDER ─── */
function Waveform({ active }: { active: boolean }) {
  const bars = Array.from({ length: 28 });
  const heights = [
    40, 60, 35, 80, 55, 70, 45, 90, 65, 50, 75, 88, 42, 68, 55, 78, 40, 65, 52,
    85, 48, 72, 58, 80, 45, 60, 38, 70,
  ];
  return (
    <div className="flex items-end gap-[3px] h-16">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            background:
              "linear-gradient(to top, rgba(0,212,255,0.6), rgba(124,58,237,0.4))",
          }}
          animate={
            active
              ? {
                  height: [
                    `${heights[i] * 0.4}%`,
                    `${heights[i]}%`,
                    `${heights[i] * 0.6}%`,
                    `${heights[i]}%`,
                  ],
                }
              : { height: `${heights[i] * 0.3}%` }
          }
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.04,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── VIDEO CARD ─── */
function VideoCard({
  video,
  featured = false,
  index,
  onClick,
}: {
  video: Video;
  featured?: boolean;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      className={`group relative glass rounded-3xl overflow-hidden border border-border/40 cursor-pointer ${featured ? "md:col-span-2" : ""}`}
      whileHover={{ borderColor: "rgba(0,212,255,0.3)", y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Thumbnail / Placeholder */}
      <div
        className={`relative ${featured ? "aspect-[16/7]" : "aspect-video"} overflow-hidden`}
        style={{
          background: featured
            ? "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(124,58,237,0.12))"
            : "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(0,212,255,0.08))",
        }}
      >
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <Waveform active={hovered} />
            {featured && (
              <p className="text-xs font-mono text-muted-foreground/60 mt-2">
                Add thumbnail to{" "}
                <code className="text-[#00D4FF]/60">videos</code> data
              </p>
            )}
          </div>
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #00D4FF, #7C3AED)" }}
            animate={{ scale: hovered ? 1 : 0.85, opacity: hovered ? 1 : 0.7 }}
            transition={{ duration: 0.25 }}
          >
            {/* Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={
                hovered ? { scale: 1.4, opacity: 0 } : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.5, repeat: hovered ? Infinity : 0 }}
            />
            <Play size={22} className="text-white ml-1" />
          </motion.div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {featured && (
            <span
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5"
              style={{
                background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
              }}
            >
              <Zap size={10} /> Featured
            </span>
          )}
          <span
            className={`${featured ? "" : "ml-auto"} flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono glass border border-white/10`}
          >
            <Eye size={10} className="text-[#00D4FF]" />
            {video.views}
          </span>
        </div>

        {/* Client bottom */}
        <div className="absolute bottom-3 left-4">
          <span className="text-xs font-mono text-white/70">
            {video.client}
          </span>
        </div>
      </div>

      {/* Info section */}
      <div className="p-5 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-mono"
              style={{
                background: "rgba(0,212,255,0.08)",
                color: "rgba(0,212,255,0.8)",
                border: "1px solid rgba(0,212,255,0.12)",
              }}
            >
              {video.category}
            </span>
            <span className="text-xs text-muted-foreground/50 font-mono">
              {video.date}
            </span>
          </div>
          <h3 className="font-semibold text-base text-foreground group-hover:text-white transition-colors duration-300 leading-snug truncate">
            {video.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">
            {video.description}
          </p>
        </div>
        <motion.div
          className="flex-shrink-0 w-9 h-9 glass rounded-xl flex items-center justify-center border border-border/40 group-hover:border-[#00D4FF]/40 transition-colors"
          animate={{ x: hovered ? 2 : 0 }}
        >
          <ChevronRight
            size={14}
            className="text-muted-foreground group-hover:text-[#00D4FF] transition-colors"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── MAIN SECTION ─── */
export default function VideoPortfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const filtered = videos.filter(
    (v) => activeCategory === "All" || v.category === activeCategory,
  );
  const featured = filtered.find((v) => v.featured);
  const rest = filtered.filter((v) => !v.featured);

  return (
    <>
      <section id="videos" className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C3AED]/3 to-transparent pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div
          className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* ── HEADER ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-label mb-6"
          >
            Video Portfolio
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-end mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl lg:text-7xl leading-[1.0] tracking-tight"
            >
              Content That
              <br />
              <span className="gradient-text italic">Performs</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Each video engineered for maximum retention. Hooks that stop the
                scroll, pacing that holds attention, endings that drive action.
              </p>
              {/* Mini stat strip */}
              <div className="flex gap-5">
                {[
                  { label: "Peak Video", val: "423K", icon: "🏆" },
                  { label: "2nd Best", val: "195K", icon: "⭐" },
                  { label: "Total Views", val: "800K+", icon: "👁️" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-lg">{s.icon}</p>
                    <p className="font-display font-bold text-base gradient-text-blue">
                      {s.val}
                    </p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── CATEGORY FILTERS ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {videoCategories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden"
                style={
                  activeCategory === cat
                    ? {
                        color: "white",
                        background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
                        boxShadow: "0 4px 20px rgba(0,212,255,0.25)",
                      }
                    : {}
                }
              >
                {activeCategory !== cat && (
                  <span className="relative z-10 glass px-5 py-2 rounded-full border border-border/40 text-muted-foreground hover:text-foreground -mx-5 -my-2 flex">
                    {cat}
                  </span>
                )}
                {activeCategory === cat && cat}
              </motion.button>
            ))}
          </motion.div>

          {/* ── VIDEO GRID ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {featured && (
                <VideoCard
                  video={featured}
                  featured
                  index={0}
                  onClick={() => setSelectedVideo(featured)}
                />
              )}
              {rest.map((v, i) => (
                <VideoCard
                  key={v.id}
                  video={v}
                  index={i + 1}
                  onClick={() => setSelectedVideo(v)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── EMPTY STATE ── */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-3xl border border-dashed border-border/40 p-16 flex flex-col items-center gap-4 text-center"
            >
              <span className="text-4xl">🎬</span>
              <p className="font-semibold text-muted-foreground">
                No videos in this category yet
              </p>
              <p className="text-sm text-muted-foreground/60 font-mono">
                Add videos to{" "}
                <code className="text-[#00D4FF]/60">src/data/index.ts</code>
              </p>
            </motion.div>
          )}

          {/* ── COMING SOON CARD ── */}
          {filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6"
            >
              <div className="glass rounded-3xl border border-dashed border-border/40 p-10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left hover:border-[#00D4FF]/25 transition-colors duration-500 group">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.15)",
                  }}
                >
                  <TrendingUp size={22} className="text-[#00D4FF]/60" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground/70 mb-1">
                    More high-performing videos coming
                  </p>
                  <p className="text-sm text-muted-foreground/60 font-mono">
                    Drop new videos into{" "}
                    <code className="text-[#00D4FF]/60">videos</code> array in{" "}
                    <code className="text-[#00D4FF]/60">src/data/index.ts</code>{" "}
                    — zero UI changes needed
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
