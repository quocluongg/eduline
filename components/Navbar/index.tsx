"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/parents", label: "Phụ huynh" },
  { href: "/students", label: "Sinh viên" },
  { href: "/contact", label: "Liên hệ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0A1B74]/90 backdrop-blur-md shadow-md z-50">
      <div className="lg:px-20 px-6 mx-auto flex justify-between items-center py-4">
        {/* logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="h-[50px] w-auto" />
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex space-x-2 text-lg font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* mobile menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                {open ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="bg-[#0A1B74] text-white">
              <SheetHeader>
                <SheetTitle className="text-white">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col space-y-3">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block px-4 py-3 rounded-md text-lg font-medium transition-all ${
                        isActive
                          ? "bg-white text-[#0A1B74] font-semibold"
                          : "hover:bg-white/10"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
