"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled 
            ? "py-4 bg-background/80 backdrop-blur-2xl border-b border-border shadow-xl" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a 
            href="#" 
            onClick={(e) => handleLinkClick(e, "#")}
            className="text-foreground font-bold tracking-tighter text-xl drop-shadow-sm z-10 relative flex items-center gap-2 group"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse group-hover:scale-125 transition-transform" />
            Faiq's Studio
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4">
            <nav className="flex items-center gap-8 bg-secondary/50 dark:bg-white/5 px-6 py-2 rounded-full border border-black/5 dark:border-white/10 backdrop-blur-md shadow-inner">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all tracking-wide hover:scale-105"
                >
                  {link.name}
                </a>
              ))}
              <div className="w-px h-4 bg-black/10 dark:bg-white/20 mx-2" />
              <ThemeToggle />
            </nav>
          </div>

          {/* Mobile Right Icons */}
          <div className="flex lg:hidden items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-secondary/80 dark:bg-white/10 border border-border"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-background lg:hidden pt-32 px-8 flex flex-col"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-4xl font-bold tracking-tighter hover:text-blue-500 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            
            <div className="mt-auto mb-12 flex flex-col gap-4 text-muted-foreground border-t border-border pt-8">
              <p className="text-sm uppercase tracking-widest font-bold">Get in touch</p>
              <a href="mailto:mohammedfaiq@email.com" className="text-xl text-foreground font-medium">mohammedfaiq@email.com</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
