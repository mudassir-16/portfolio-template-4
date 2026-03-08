"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { X, Menu } from "lucide-react";

const navItems = [
    { name: "about", href: "#about" },
    { name: "process", href: "#skills" },
    { name: "snapshots", href: "#pictures" },
    { name: "contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed top-0 left-0 w-full z-50 px-8 py-8 flex items-center justify-between pointer-events-none"
            >
                <Link href="/" className="font-serif text-2xl font-black tracking-tighter text-white pointer-events-auto">
                    MM.
                </Link>

                <div className="hidden md:flex gap-12 items-center pointer-events-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="nav-link"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="md:hidden pointer-events-auto">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
                        {isOpen ? <X size={28} /> : (
                            <div className="flex flex-col gap-1.5 items-end">
                                <div className="w-8 h-[2px] bg-white rounded-full" />
                                <div className="w-5 h-[2px] bg-white rounded-full" />
                            </div>
                        )}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 bg-[#1a0202] z-40 md:hidden flex flex-col items-center justify-center gap-8"
            >
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-4xl font-serif italic text-white/60 hover:text-accent-gold transition-colors"
                    >
                        {item.name}
                    </Link>
                ))}
            </motion.div>
        </>
    );
}
