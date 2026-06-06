"use client";


import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

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
      { label: "Who we Are", href: "/about/who-we-are" },
      { label: "Constitution", href: "/about/constitution" },
      { label: "History", href: "/about/history" },
      { label: "Advisory Council", href: "/about/advisory-council" },
      { label: "Executive Committee", href: "/about/executive-committee" },
    ],
  },
  {
    label: "Membership",
    items: [
      { label: "Eligibility", href: "/membership/eligibility" },
      { label: "FAQ", href: "/membership/faq" },
      { label: "Application", href: "/membership/application" },
    ],
  },
  {
    label: "Reunion / Event",
    items: [
      { label: "Registration Process", href: "/events/registration-process" },
      { label: "Registration FAQ", href: "/events/registration-faq" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  {
    label: "আমাদের ধামরাই",
    items: [
      { label: "একটি নজরে ধামরাই", href: "/dhamrai/at-a-glance" },
      { label: "দর্শনীয় জায়গা", href: "/dhamrai/south-janja" },
      { label: "একটি নজরে", href: "/dhamrai/overview" },
      { label: "স্মরণীয় ব্যাক্তি", href: "/dhamrai/notable-people" },
      { label: "গ্রামের লিস্ট অনুসারে দর্শনীয় জায়গা", href: "/dhamrai/notable-list" },
    ],
  },
];

export default function NavMenuDropdown({ isHome }: { isHome: boolean }) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const isItemActive = (item: NavItem): boolean => {
    if (item.href) {
      return pathname === item.href;
    }
    if (item.items) {
      return item.items.some((subItem) => pathname.startsWith(subItem.href.split("/").slice(0, -1).join("/")));
    }
    return false;
  };

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
    className={`text-base md:text-lg px-4 py-2 transition rounded
      ${isHome
        ? isItemActive(item)
          ? "bg-gray-200 text-black"
          : "hover:bg-gray-200 hover:text-black"
        : isItemActive(item)
          ? "bg-white/20 text-white"
          : "text-white hover:bg-white/20 hover:text-white"
      }`}
  >
    {item.label}
  </Link>
) : (
  <button
    className={`text-base md:text-lg px-4 py-2 transition rounded flex items-center gap-1
      ${isHome
        ? isItemActive(item)
          ? "bg-gray-200 text-black"
          : "hover:bg-gray-200 hover:text-black"
        : isItemActive(item)
          ? "bg-white/20 text-white"
          : "text-white hover:bg-white/20 hover:text-white"
      }`}
  >
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

