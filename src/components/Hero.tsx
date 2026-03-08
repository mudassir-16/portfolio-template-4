"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profileData as mockProfileData } from "@/data/mockData";
import { Profile } from "@/lib/db_service";

export default function Hero({ profile }: { profile?: Profile | null }) {
    const data = profile || mockProfileData;
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 md:px-0">
            {/* Background Section */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-6xl text-center z-0 select-none pointer-events-none">
                <h1 className="text-[20vw] font-serif font-black text-primary-bright/20 leading-none tracking-tighter">
                    Portfolio
                </h1>
            </div>

            {/* Main Content Layer */}
            <div className="relative w-full max-w-6xl mx-auto grid grid-cols-12 items-end z-10">

                {/* Left Side: Labels */}
                <div className="col-span-12 md:col-span-4 self-start md:pt-40 order-2 md:order-1 px-6 md:px-0">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-2 md:space-y-0"
                    >
                        {data.name.split(' ').map((part: string, i: number) => (
                            <h3 key={i} className="text-4xl md:text-6xl font-serif font-bold leading-tight">{part}</h3>
                        ))}
                    </motion.div>

                    <div className="mt-12 flex gap-8 text-[10px] uppercase font-bold tracking-widest text-white/40">
                        <div>
                            <p>Instagram:</p>
                            <p className="text-white/60">@mudassir.1604</p>
                        </div>
                    </div>
                </div>

                {/* Center: Image */}
                <div className="col-span-12 md:col-span-4 order-1 md:order-2 flex justify-center -mb-24 md:-mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative w-[450px] md:w-[600px] aspect-[4/5]"
                    >
                        <Image
                            src="/images/m2.png"
                            alt={data.name}
                            fill
                            className="object-contain grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Right Side: Designer Block */}
                <div className="col-span-12 md:col-span-4 self-center order-3 md:order-3 text-center md:text-left px-6 md:px-0">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative"
                    >
                        <p className="text-sm font-bold tracking-[0.3em] text-white/60 mb-2 md:mb-4"></p>
                        <div className="text-7xl md:text-9xl font-serif font-black leading-[0.8]">
                            <h2 className="text-white"></h2>
                            <div className="relative">
                                <h2 className="text-transparent border-t-2 border-b-2 border-white/20 px-2 py-1 -mt-1 outline-text bg-white/5 backdrop-blur-sm">GNER</h2>
                                {/* Secondary Overlay for cutout effect */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-10 font-serif overflow-hidden">
                                    <span className="text-[200px] leading-none">MD</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Hero Footnote */}
            <div className="absolute bottom-10 right-10 text-[10px] font-bold tracking-widest opacity-20 hidden md:block">
                MOHAMMED MUDASSIR
            </div>
        </section>
    );
}
