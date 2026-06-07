"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, Variants } from "framer-motion";
import { ArrowRight, ChevronDown, ChartBar } from "lucide-react";
import Image from "next/image";
import { heroMetrics } from "@/app/utils";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Mode-aware particle colors — readable on both bg types
    const colors = ["#0095cc", "#7c3aed", "#e05252", "#10b981"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color +
          Math.floor(p.opacity * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Subtle in light, subtle in dark — both handled
            ctx.strokeStyle = `rgba(0,180,220,${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${50 + springX.get() * 50}% ${50 + springY.get() * 50}%, rgba(var(--electric-rgb),0.07) 0%, transparent 70%)`,
        }}
      />

      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] animate-pulse-slow"
        style={{ background: "var(--glow-electric)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[120px] animate-pulse-slow"
        style={{ background: "var(--glow-violet)", animationDelay: "2s" }}
      />

      <div className="relative z-10 container mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* ── LEFT: Text content ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="order-2 lg:order-1"
          >
            {/* Available badge */}
            <motion.div
              variants={item}
              className="flex items-center gap-3 mb-4"
            >
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border text-xs font-mono tracking-widest uppercase"
                style={{ borderColor: "var(--glass-border)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "var(--electric)" }}
                />
                <span style={{ color: "var(--electric)" }}>
                  Available for Projects
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="font-bold text-2xl sm:text-3xl leading-[1.05] mb-4"
            >
              <span className="text-foreground">Building</span>
              <span className="gradient-text"> Visibility</span>
              <span className="block text-foreground text-xl sm:text-2xl mt-1">
                Through Strategy,
              </span>
              <span className="block text-foreground/60 font-normal text-lg sm:text-2xl mt-1 italic">
                Consistency &amp; Audience Psychology.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={item}
              className="text-muted-foreground sm:text-lg leading-relaxed mb-6 max-w-lg"
            >
              Helping startups and brands grow through audience-focused content
              strategy, storytelling, trend adaptation, and consistent
              execution.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-4 mb-8">
              <a
                href="#case-studies"
                className="btn-primary flex items-center gap-2 group"
              >
                <span>View Case Studies</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="#contact"
                className="btn-outline flex items-center gap-2"
              >
                Let&apos;s Work Together
              </a>
            </motion.div>

            {/* Metric cards */}
            <motion.div
              variants={item}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {heroMetrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                  className="metric-card rounded-2xl p-4 text-center"
                >
                  <div className="font-display font-bold text-xl gradient-text-blue">
                    {m.value}
                    {m.suffix}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-tight">
                    {m.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Portrait ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(var(--electric-rgb),0.18), rgba(var(--violet-rgb),0.16), transparent)",
                }}
              />

              {/* Portrait card */}
              <div
                className="relative w-72 h-96 sm:w-80 sm:h-[440px] lg:w-96 lg:h-[520px] rounded-3xl overflow-hidden glass border"
                style={{ borderColor: "var(--glass-border)" }}
              >
                {/* ── Actual photo ── */}
                <Image
                  src="/images/charles-jikeme-portrait.png"
                  alt="Charles Jikeme — Social Media Growth Strategist"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                />

                {/* Subtle gradient overlay — darkens bottom for legibility of the info card */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 40%, rgba(var(--electric-rgb),0.04) 60%, rgba(10,10,18,0.72) 100%)",
                  }}
                />

                {/* Bottom info card */}
                <div
                  className="absolute bottom-0 inset-x-0 glass p-4 border-t"
                  style={{ borderColor: "var(--glass-border)" }}
                >
                  <p className="font-display font-semibold text-sm text-foreground">
                    Charles Jikeme
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Social Media Growth Strategist
                  </p>
                  <div className="flex items-center mt-1 gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-xs">Port Harcourt, Nigeria</span>
                  </div>
                </div>
              </div>

              {/* Floating badge — top right */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 border shadow-lg"
                style={{ borderColor: "rgba(var(--electric-rgb), 0.20)" }}
              >
                <div
                  className="text-xs flex items-center gap-1 font-mono"
                  style={{ color: "var(--electric)" }}
                >
                  <ChartBar height={14} />
                  423K
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Peak Views
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        href="#case-studies"
        className="absolute z-10 cursor-pointer bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs relative text-muted-foreground font-mono tracking-widest uppercase">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-muted-foreground" />
        </motion.span>
      </motion.a>
    </section>
  );
}
