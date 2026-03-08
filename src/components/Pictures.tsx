"use client";

import { motion } from "framer-motion";
import { profileData as mockProfileData } from "@/data/mockData";
import { Achievement } from "@/lib/db_service";

export default function Pictures({ achievements }: { achievements?: Achievement[] | null }) {
    const data = achievements || mockProfileData.achievements;
    return (
        <section id="pictures" className="px-6 md:px-20 py-24">
            <div className="mb-16">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="editorial-title text-5xl md:text-7xl mb-4"
                >
                    Snapshots
                </motion.h2>
                <p className="text-white/60 font-sans tracking-widest uppercase text-sm">
                    Moments that inspire me and capture the essence of growth
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.map((item: any, index: number) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative aspect-[4/5] glass-card overflow-hidden"
                    >
                        {/* Achievement Image */}
                        <img
                            src={item.image_url || item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute bottom-0 left-0 p-8 space-y-3">
                            <div className="flex justify-between items-center w-full">
                                <p className="text-accent-gold text-xs font-bold tracking-widest uppercase">
                                    {item.date}
                                </p>
                                <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase ml-auto">
                                    {item.location || item.event}
                                </p>
                            </div>
                            <h3 className="text-2xl font-serif font-bold leading-tight group-hover:text-accent-red transition-colors duration-500">
                                {item.title}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
