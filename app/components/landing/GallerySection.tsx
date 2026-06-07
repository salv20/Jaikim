"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryCategories, galleryItems } from "@/app/utils";

type GalleryItem = (typeof galleryItems)[0];

function Lightbox({
  item,
  items,
  onClose,
}: {
  item: GalleryItem;
  items: GalleryItem[];
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(
    items.findIndex((i) => i.id === item.id),
  );
  const currentItem = items[current];

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          <X size={16} />
        </button>

        {/* Image area */}
        <div className="glass rounded-3xl overflow-hidden border border-border/40">
          <div
            className="relative aspect-video flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,212,255,0.06), rgba(124,58,237,0.06))",
            }}
          >
            {/* Placeholder design — replace with real images */}
            <div className="flex flex-col items-center gap-4 text-center px-8">
              <div className="text-6xl">📊</div>
              <div>
                <p className="font-semibold text-foreground mb-1">
                  {currentItem.alt}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentItem.client}
                </p>
                <p className="text-xs text-muted-foreground/60 font-mono mt-2">
                  Add image path to galleryItems in data/index.ts
                </p>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-foreground transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-foreground transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Info bar */}
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm text-foreground">
                {currentItem.alt}
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                {currentItem.client} · {currentItem.category}
              </p>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              {current + 1} / {items.length}
            </div>
          </div>
        </div>

        {/* Thumbnails strip */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {items.map((it, i) => (
            <button
              key={it.id}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-16 h-10 rounded-lg glass border transition-all duration-200 flex items-center justify-center text-lg ${
                i === current
                  ? "border-[#00D4FF]/50 scale-105"
                  : "border-border/40"
              }`}
            >
              📊
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Masonry-style heights for visual variety
const heights = [
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-video",
  "aspect-square",
  "aspect-[4/5]",
];
const cardEmojis = ["📊", "📈", "🎯", "📱", "💹", "✨"];
const cardColors = [
  "from-[#00D4FF]/10 to-[#0099FF]/5",
  "from-[#7C3AED]/10 to-[#5B21B6]/5",
  "from-[#10B981]/10 to-[#059669]/5",
  "from-[#F59E0B]/10 to-[#D97706]/5",
  "from-[#EF4444]/10 to-[#DC2626]/5",
  "from-[#00D4FF]/10 to-[#7C3AED]/5",
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered = galleryItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory,
  );

  return (
    <>
      <section
        id="gallery"
        className="section-padding relative overflow-hidden"
      >
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className=" mb-6"
          >
            Gallery
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-end mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-5xl lg:text-6xl leading-tight"
            >
              Work & <span className="gradient-text italic">Results</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed"
            >
              Analytics screenshots, campaign highlights, and content examples —
              a visual record of growth achieved.
            </motion.p>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "text-white"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
                style={
                  activeCategory === cat
                    ? {
                        background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
                      }
                    : {}
                }
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Masonry Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-2 md:columns-3 gap-4 space-y-4"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="break-inside-avoid mb-4"
                >
                  <div
                    className={`group relative glass rounded-2xl overflow-hidden border border-border/40 cursor-pointer hover:border-[#00D4FF]/30 transition-all duration-400 card-hover ${heights[i % heights.length]}`}
                    onClick={() => setLightboxItem(item)}
                  >
                    {/* Placeholder design */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${cardColors[i % cardColors.length]} flex flex-col items-center justify-center gap-3 p-4`}
                    >
                      <div className="text-4xl">
                        {cardEmojis[i % cardEmojis.length]}
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-semibold text-foreground/80 leading-tight">
                          {item.alt}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono mt-1">
                          {item.client}
                        </p>
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center"
                      >
                        <ZoomIn size={18} className="text-white" />
                      </motion.div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-lg text-xs font-mono glass border border-border/40">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Add more note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <p className="text-sm text-muted-foreground/60 font-mono">
              📁 Add real images/screenshots to{" "}
              <code className="text-[#00D4FF]/60">galleryItems</code> in{" "}
              <code className="text-[#00D4FF]/60">src/data/index.ts</code>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            item={lightboxItem}
            items={filtered}
            onClose={() => setLightboxItem(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
