"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, Download, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
  { label: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl transition-all duration-500 rounded-2xl ${
          scrolled
            ? "glass shadow-xl backdrop-blur shadow-black/5 dark:shadow-black/40"
            : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#7C3AED] flex items-center justify-center">
              <span className="text-white font-bold text-sm font-mono">CJ</span>
            </div>
            <span className="font-display font-semibold text-sm text-foreground hidden sm:block">
              Charles Jikeme
            </span>
          </motion.a>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle — only rendered after mount to avoid hydration mismatch */}
            {mounted && (
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={16} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* Download CV */}
            <motion.a
              href="/docs/Charles-Jikeme-CV.pdf"
              download="Charles-Jikeme-CV.pdf"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 text-sm font-medium glass rounded-xl text-muted-foreground hover:text-foreground transition-colors"
            >
              <Download size={14} />
              Download CV
            </motion.a>

            {/* Book A Call */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl text-white"
              style={{
                background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
              }}
            >
              <Phone size={14} />
              Book A Call
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 glass rounded-lg flex items-center justify-center text-foreground cursor-pointer"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 backdrop-blur-sm top-24 z-40 rounded-2xl glass border border-slate-400 shadow-2xl p-6 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="/docs/Charles-Jikeme-CV.pdf"
              download="Charles-Jikeme-CV.pdf"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] rounded-xl text-muted-foreground hover:text-foreground hover:bg-black/[0.05] dark:hover:bg-white/[0.05] hover:border-black/20 dark:hover:border-white/20 transition-all duration-200"
            >
              <Download size={14} />
              <span>Download CV</span>
            </motion.a>

            <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/10 flex gap-2">
              <a
                href="#contact"
                className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl text-white"
                style={{
                  background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
                }}
                onClick={() => setMobileOpen(false)}
              >
                <Phone size={14} />
                Book A Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
