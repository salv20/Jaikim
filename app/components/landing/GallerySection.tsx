"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { caseStudies } from "@/app/utils"; // adjust path as needed

type MediaType = "image" | "video";

interface GalleryItem {
  src: string;
  alt: string;
  type: MediaType;
  client: string;
  industry: string;
  color: string;
}

type Category = "All" | "Images" | "Videos";

function detectType(src: string, declared?: string): MediaType {
  if (declared === "video" || /\.(mp4|webm|mov)$/i.test(src)) return "video";
  return "image";
}

function buildGalleryItems(): GalleryItem[] {
  return caseStudies.flatMap((cs) =>
    cs.media.map((m) => ({
      src: m.src,
      alt: m.alt,
      type: detectType(m.src, (m as { type?: string }).type),
      client: cs.client,
      industry: cs.industry,
      color: cs.color,
    })),
  );
}

const ASPECT_RATIOS = [
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-video",
  "aspect-square",
  "aspect-[4/5]",
];

const CATEGORIES: Category[] = ["All", "Images", "Videos"];

function Lightbox({
  items,
  startIndex,
  onClose,
}: {
  items: GalleryItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);
  const item = items[current];

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + items.length) % items.length),
    [items.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % items.length),
    [items.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.94)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.32, 0, 0.18, 1] }}
        className="relative w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute -top-11 right-0 w-9 h-9 glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10 border border-border/30"
        >
          <X size={15} />
        </button>

        {/* Main panel */}
        <div className="glass rounded-2xl overflow-hidden border border-border/30">
          {/* Media area */}
          <div
            className="relative aspect-video flex items-center justify-center overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(var(--electric-rgb),0.06), rgba(var(--violet-rgb),0.06))",
            }}
          >
            {item.type === "video" ? (
              <video
                key={item.src}
                src={item.src}
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={item.src}
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            )}

            {/* Arrows */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-border/30"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-border/30"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Info bar */}
          <div className="px-5 py-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {item.alt}
              </p>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                {item.client}&nbsp;·&nbsp;{item.industry}
              </p>
            </div>
            <span className="text-xs font-mono text-muted-foreground/60 shrink-0">
              {current + 1}&nbsp;/&nbsp;{items.length}
            </span>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to item ${i + 1}`}
              className={`flex-shrink-0 w-14 h-9 rounded-lg glass border transition-all duration-200 overflow-hidden flex items-center justify-center ${
                i === current
                  ? "border-[color:var(--electric)] scale-105"
                  : "border-border/30"
              }`}
            >
              {it.type === "video" ? (
                <Play size={12} className="text-muted-foreground" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={it.src}
                  alt=""
                  aria-hidden
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  const aspectClass = ASPECT_RATIOS[index % ASPECT_RATIOS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: "easeOut" }}
      className="break-inside-avoid mb-4"
    >
      <div
        role={item.type === "image" ? "button" : undefined}
        tabIndex={item.type === "image" ? 0 : undefined}
        aria-label={item.type === "image" ? `View ${item.alt}` : undefined}
        onClick={item.type === "image" ? onClick : undefined}
        onKeyDown={(e) => {
          if (item.type === "image" && (e.key === "Enter" || e.key === " "))
            onClick();
        }}
        className={`group relative glass rounded-2xl overflow-hidden border border-border/30 transition-all duration-300 card-hover ${aspectClass} ${item.type === "image" ? "cursor-pointer hover:border-[color:var(--electric)]/40" : "cursor-default"}`}
      >
        {/* Image: gradient placeholder behind, real image on top */}
        {item.type === "image" && (
          <>
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3"
              style={{
                background: `linear-gradient(135deg, ${item.color}18, ${item.color}06)`,
              }}
            >
              <div className="text-2xl opacity-50">🖼</div>
              <p className="text-[10px] text-center text-muted-foreground/60 font-mono leading-tight px-1">
                {item.alt}
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </>
        )}

        {/* Video: renders inline, playable directly in the card */}
        {item.type === "video" && (
          <video
            src={item.src}
            className="absolute inset-0 w-full h-full object-cover"
            preload="metadata"
            controls
            onClick={(e) => e.stopPropagation()}
          />
        )}

        {/* Category badge */}
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono glass border border-border/30 text-muted-foreground">
            {item.industry.split(" ")[0]}
          </span>
        </div>

        {/* Hover overlay — images only; skip for video so controls stay usable */}
        {item.type === "image" && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-300 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
              <ZoomIn size={16} className="text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Client label below card */}
      <div className="mt-2 px-1">
        <p className="text-xs font-medium text-foreground/80 truncate">
          {item.client}
        </p>
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allItems = buildGalleryItems();

  const filtered = allItems.filter((item) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Videos") return item.type === "video";
    return item.type === "image";
  });

  return (
    <>
      <section
        id="gallery"
        className="section-padding relative overflow-hidden"
      >
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        <div className="container mx-auto py-8 px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--electric)]">
              Portfolio
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-2 items-end mb-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-bold text-2xl sm:text-3xl leading-tight"
            >
              Work &amp; <span className="gradient-text italic">Results</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed"
            >
              Screenshots, analytics, and campaign highlights — a visual record
              of growth achieved across clients.
            </motion.p>
          </div>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "text-white"
                    : "glass border border-border/30 text-muted-foreground hover:text-foreground"
                }`}
                style={
                  activeCategory === cat
                    ? {
                        background:
                          "linear-gradient(135deg, var(--electric), var(--violet))",
                      }
                    : {}
                }
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 text-[11px] opacity-60">
                    (
                    {
                      allItems.filter((i) =>
                        cat === "Videos"
                          ? i.type === "video"
                          : i.type === "image",
                      ).length
                    }
                    )
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Masonry grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="columns-2 md:columns-3 gap-4"
            >
              {filtered.length === 0 ? (
                <p className="text-muted-foreground text-sm col-span-full py-10 text-center">
                  No items in this category.
                </p>
              ) : (
                filtered.map((item, i) => (
                  <GalleryCard
                    key={`${item.src}-${i}`}
                    item={item}
                    index={i}
                    onClick={() => setLightboxIndex(i)}
                  />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filtered}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
