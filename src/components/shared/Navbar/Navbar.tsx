"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import NavMenuDropdown from "./nav-menu-dropdown";
import { NavigationSheet } from "./navigation-sheet";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed top-6 inset-x-4 h-16 max-w-screen-xl mx-auto rounded-full bg-background border dark:border-slate-700/70 z-30">
      <div className="flex h-full items-center justify-between px-6 md:px-8">
        {/* Logo with consistent padding */}
        <Link href="/" className="flex-shrink-0 ">
          <Logo />
        </Link>

        {/* Desktop Menu with Dropdowns */}
        {!isMobile && <NavMenuDropdown />}

        {/* Actions and Mobile Menu */}
        <div className="flex items-center gap-4 md:gap-6">
          <Button className="rounded-full px-6 py-2 text-base md:text-lg">
            <Link href="/login" className="block w-full text-center">
              Login
            </Link>
          </Button>

          {/* Mobile Menu */}
          {isMobile && <NavigationSheet />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
