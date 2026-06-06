import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

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
      { label: "দক্ষিণ জাঞ্জা", href: "/dhamrai/south-janja" },
      { label: "একটি নজরে", href: "/dhamrai/overview" },
      { label: "সরজীব ব্যাক্তি", href: "/dhamrai/notable-people" },
      { label: "ধ্রোয়ের লিস্ট অনুসারে দক্ষিণ জাঞ্জা", href: "/dhamrai/notable-list" },
    ],
  },
];

export const NavigationSheet = () => {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64">
        <nav className="space-y-2 mt-8">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="block px-4 py-2 hover:bg-gray-200 rounded transition"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() =>
                      setExpandedMenu(
                        expandedMenu === item.label ? null : item.label
                      )
                    }
                    className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded transition flex items-center justify-between"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        expandedMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile Dropdown Items */}
                  {expandedMenu === item.label && item.items && (
                    <div className="ml-4 bg-black text-white rounded-md mt-1 overflow-hidden">
                      {item.items.map((dropItem) => (
                        <Link
                          key={dropItem.label}
                          href={dropItem.href}
                          className="block px-4 py-2 hover:bg-gray-300 hover:text-black transition"
                          onClick={() => setIsOpen(false)}
                        >
                          {dropItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
