"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navItems = [
    { name: "about", href: "#about" },
    { name: "process", href: "#skills" },
    { name: "snapshots", href: "#pictures" },
    { name: "contact", href: "#contact" },
];

export default function Navbar() {
    return (
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
                <div className="w-8 h-[2px] bg-white rounded-full mb-1.5" />
                <div className="w-8 h-[2px] bg-white rounded-full" />
            </div>
        </motion.nav>
    );
}
