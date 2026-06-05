"use client";

import Link from "next/link";
import { useState } from "react";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  items?: DropdownItem[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    items: [
      { label: "Who we Are", href: "/about" },
      { label: "Constitution", href: "/about" },
      { label: "History", href: "/about" },
      { label: "Advisory Council", href: "/about" },
      { label: "Executive Committee", href: "/about" },
    ],
  },
  {
    label: "Membership",
    items: [
      { label: "Eligibility", href: "/membership" },
      { label: "FAQ", href: "/membership" },
      { label: "Application", href: "/membership" },
    ],
  },
  {
    label: "Reunion / Event",
    items: [
      { label: "Registration Process", href: "/events" },
      { label: "Registration FAQ", href: "/events" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  {
    label: "আমাদের ধামরাই",
    items: [
      { label: "একটি নজরে ধামরাই", href: "/dhamrai" },
      { label: "দক্ষিণ জাঞ্জা", href: "/dhamrai" },
      { label: "একটি নজরে", href: "/dhamrai" },
      { label: "সরজীব ব্যাক্তি", href: "/dhamrai" },
      { label: "ধ্রোয়ের লিস্ট অনুসারে দক্ষিণ জাঞ্জা", href: "/dhamrai" },
    ],
  },
];

export default function NavMenuDropdown() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="hidden md:flex items-center gap-1">
      {navItems.map((item) => (
        <div
          key={item.label}
          className="relative group"
          onMouseEnter={() => item.items && setOpenDropdown(item.label)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          {/* Main Button */}
          {item.href ? (
            <Link
              href={item.href}
              className="text-base md:text-lg px-4 py-2 hover:bg-gray-200 hover:text-black transition rounded"
            >
              {item.label}
            </Link>
          ) : (
            <button className="text-base md:text-lg px-4 py-2 hover:bg-gray-200 hover:text-black transition flex items-center gap-1 rounded">
              {item.label}
              {item.items && <span className="text-sm">▼</span>}
            </button>
          )}

          {/* Dropdown Menu */}
          {item.items && (
            <div
              className={`absolute left-0 mt-0 w-max bg-black text-white rounded-md shadow-lg overflow-hidden transition-all duration-200 ${
                openDropdown === item.label
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
              }`}
            >
              {item.items.map((dropItem) => (
                <Link
                  key={dropItem.label}
                  href={dropItem.href}
                  className="block px-4 py-3 hover:bg-gray-300 hover:text-black transition text-white"
                >
                  {dropItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
