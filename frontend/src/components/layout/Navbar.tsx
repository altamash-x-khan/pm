"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            const offset = 80; // approximate navbar height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? "bg-background/90 backdrop-blur-md border-b shadow-sm py-3"
                    : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        href="#"
                        className="text-2xl font-serif font-bold text-brand-espresso tracking-tight"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                    >
                        Dr. Farheen<span className="text-brand-rose">.</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="text-sm font-medium text-brand-espresso/80 hover:text-brand-rose transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <Button
                            className="bg-brand-rose hover:bg-brand-rose/90 text-white rounded-full px-6"
                            onClick={(e) => {
                                const link = e.currentTarget as unknown as HTMLAnchorElement;
                                scrollToSection(link as any, "#booking");
                            }}
                        >
                            Book Consultation
                        </Button>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-brand-espresso p-2"
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-background border-b shadow-lg animate-in slide-in-from-top-2">
                    <nav className="flex flex-col px-4 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="text-lg font-medium text-brand-espresso/90 py-2 border-b border-brand-rose/10"
                            >
                                {link.name}
                            </a>
                        ))}
                        <Button
                            className="bg-brand-rose hover:bg-brand-rose/90 text-white w-full rounded-full mt-4 h-12 text-lg"
                            onClick={(e) => {
                                scrollToSection(e as any, "#booking");
                            }}
                        >
                            Book Consultation
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
}
