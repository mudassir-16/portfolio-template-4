"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { profileData as mockProfileData } from "@/data/mockData";
import { Profile } from "@/lib/db_service";

import { Instagram, Mail, Linkedin, Github } from "lucide-react";

export default function Contact({ profile }: { profile?: Profile | null }) {
    const data = profile || mockProfileData;
    return (
        <section id="contact" className="px-6 md:px-20 pt-32 pb-12 bg-gradient-to-t from-primary-deep/40 to-transparent">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

                    {/* Left Side: Contact Info */}
                    <div className="col-span-12 md:col-span-7 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="section-label mb-8">Collaboration</h2>
                            <h3 className="editorial-title text-5xl md:text-8xl leading-none italic mb-8">
                                Let's build <br /> together
                            </h3>
                            <div className="glass-card p-8 bg-primary-bright/10 border-white/10 max-w-xl">
                                <p className="text-lg md:text-xl text-white/90 font-sans leading-relaxed">
                                    {data.bio}
                                </p>
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <div className="flex flex-wrap gap-6">
                            {[
                                { icon: Instagram, href: "https://instagram.com/mudassir.1604", label: "Instagram" },
                                { icon: Linkedin, href: "https://www.linkedin.com/in/mohammed-mudassir-82882933a/", label: "LinkedIn" },
                                { icon: Github, href: "https://github.com/mudassir-16", label: "GitHub" },
                                { icon: Mail, href: "mailto:mohammadmudassir1604@gmail.com", label: "Email" },
                            ].map((social, i) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative"
                                >
                                    <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center bg-white/5 border-white/10 group-hover:bg-accent-red/10 group-hover:border-accent-red/30 transition-all duration-500">
                                        <social.icon size={28} className="text-white/60 group-hover:text-accent-red transition-all duration-500" />
                                    </div>
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent-red whitespace-nowrap">{social.label}</span>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Circular Portrait */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="col-span-12 md:col-span-5 relative flex justify-center"
                    >
                        <div className="relative w-full max-w-md aspect-[4/5]">
                            {/* Rounded Portrait Frame */}
                            <div className="w-full h-full rounded-[48px] border-4 border-white/10 overflow-hidden relative shadow-2xl bg-white/5">
                                <img
                                    src="/images/colab-section.jpg"
                                    alt="Collaboration Profile"
                                    className="w-full h-full object-cover transition-all duration-1000 block"
                                />
                                {/* Inner border detail */}
                                <div className="absolute inset-4 rounded-[36px] border border-white/5 pointer-events-none" />

                                {/* Gradient Overlay for depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Floating Badge (Click to Admin) */}
                            <Link
                                href="/admin"
                                className="absolute -bottom-6 -right-6 w-24 h-24 rounded-3xl glass-card flex items-center justify-center border border-white/20 shadow-2xl z-20 rotate-12 hover:rotate-0 transition-all duration-500 cursor-pointer hover:scale-110 active:scale-95"
                            >
                                <span className="text-4xl font-serif text-accent-gold italic">м</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
