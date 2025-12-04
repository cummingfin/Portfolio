"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOverlay, setIsOverlay] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined") {
      const dismissed = localStorage.getItem("overlayDismissed");
      setIsOverlay(!dismissed);
    } else {
      setIsOverlay(false);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      
      // Close mobile menu when a link is clicked
      setIsMobileMenuOpen(false);
      
      // If we're on the homepage, just scroll to the section
      if (pathname === "/") {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // If we're on another page, navigate to homepage with hash
        router.push(`/${href}`);
        // Wait for navigation, then scroll to section
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Handle scroll to section when arriving from another page with hash
  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        // Small delay to ensure page is fully loaded
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  }, [pathname]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center gap-6 md:gap-8 transition-all duration-300 ${
        isOverlay ? "text-gray-300" : "text-text"
      } ${
        isScrolled ? "backdrop-blur-md bg-background/60" : ""
      }`}>
        <Link href="/" className="font-bricolage font-bold text-3xl md:text-4xl">
          Fin
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 md:gap-8 text-lg md:text-xl font-manrope font-normal">
          <Link 
            href="#work" 
            onClick={(e) => handleScroll(e, "#work")}
            className="hover:opacity-70 transition-opacity"
          >
            Work
          </Link>
          <Link 
            href="#about" 
            onClick={(e) => handleScroll(e, "#about")}
            className="hover:opacity-70 transition-opacity"
          >
            About
          </Link>
          <Link 
            href="#contact" 
            onClick={(e) => handleScroll(e, "#contact")}
            className="hover:opacity-70 transition-opacity"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden ml-auto flex flex-col gap-1.5 w-6 h-6 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 focus:ring-offset-transparent rounded"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <motion.span
            className="w-full h-0.5 bg-current"
            animate={{
              rotate: isMobileMenuOpen ? 45 : 0,
              y: isMobileMenuOpen ? 8 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-full h-0.5 bg-current"
            animate={{
              opacity: isMobileMenuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-full h-0.5 bg-current"
            animate={{
              rotate: isMobileMenuOpen ? -45 : 0,
              y: isMobileMenuOpen ? -8 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background z-40 md:hidden pt-24"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center gap-8 px-6 py-12"
              onClick={(e) => e.stopPropagation()}
            >
              <Link 
                href="#work" 
                onClick={(e) => handleScroll(e, "#work")}
                className="text-2xl font-manrope font-normal hover:opacity-70 transition-opacity"
              >
                Work
              </Link>
              <Link 
                href="#about" 
                onClick={(e) => handleScroll(e, "#about")}
                className="text-2xl font-manrope font-normal hover:opacity-70 transition-opacity"
              >
                About
              </Link>
              <Link 
                href="#contact" 
                onClick={(e) => handleScroll(e, "#contact")}
                className="text-2xl font-manrope font-normal hover:opacity-70 transition-opacity"
              >
                Contact
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

