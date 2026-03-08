"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profileData as mockProfileData } from "@/data/mockData";
import { Profile, Education, Leadership } from "@/lib/db_service";

export default function About({
    profile,
    education,
    leadership
}: {
    profile?: Profile | null;
    education?: Education[] | null;
    leadership?: Leadership[] | null;
}) {
    const data = profile || mockProfileData;
    const eduData = education || mockProfileData.education;
    const leadData = leadership || mockProfileData.leadership;
    return (
        <section id="about" className="px-6 md:px-20 py-32 bg-gradient-to-b from-transparent to-primary-deep/20">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="section-label">WHO AM I</h2>
                    <div className="h-[1px] flex-1 bg-white/10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                    {/* Illustration/Avatar Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="col-span-12 md:col-span-5 relative group"
                    >
                        <div className="relative aspect-[3/4] max-w-[400px] mx-auto">
                            {/* Outer Glow/Border Pill */}
                            <div className="absolute -inset-4 border border-accent-gold/5 rounded-full pointer-events-none" />

                            {/* Main Pill Shape Container */}
                            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/5 glass-card bg-gradient-to-br from-primary-medium/20 to-black/60">
                                <Image
                                    src="/images/md1.jpeg"
                                    alt="About Mohammed Mudassir"
                                    fill
                                    className="object-cover transition-all duration-1000 group-hover:scale-110"
                                />

                                {/* Inner Border Pill Overlay */}
                                <div className="absolute inset-2 border border-white/10 rounded-full pointer-events-none" />
                            </div>
                        </div>
                        {/* Decorative background element like the flower in reference */}
                        <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary-bright/10 blur-3xl opacity-50" />
                    </motion.div>

                    {/* Text Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="col-span-12 md:col-span-7 space-y-8"
                    >
                        <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-bright/5 blur-3xl" />

                            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-sans mb-8">
                                {data.bio}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {/* Education Section */}
                                <div className="space-y-6">
                                    <h3 className="text-[10px] uppercase font-bold tracking-[0.3em] text-accent-gold mb-4">Academic Background</h3>
                                    {eduData.map((edu, i) => (
                                        <div key={i} className="relative pl-6 border-l border-white/10 space-y-1">
                                            <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-accent-gold/40" />
                                            <p className="text-sm font-bold text-white">{edu.degree}</p>
                                            <p className="text-xs text-white/40">{edu.institution}</p>
                                            <div className="flex gap-4 mt-2">
                                                <span className="text-[10px] text-accent-gold font-bold uppercase tracking-widest">{edu.duration}</span>
                                                {edu.cgpa && <span className="text-[10px] text-white/20 font-bold uppercase">CGPA: {edu.cgpa}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Leadership Section */}
                                <div className="space-y-6">
                                    <h3 className="text-[10px] uppercase font-bold tracking-[0.3em] text-accent-red mb-4">Commendations</h3>
                                    {leadData.map((lead, i) => (
                                        <div key={i} className="relative pl-6 border-l border-white/10 space-y-1">
                                            <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-accent-red/40" />
                                            <p className="text-sm font-bold text-white">{lead.role}</p>
                                            <p className="text-xs text-white/40">{lead.organization}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <a
                                href={data.resume_url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-12 group flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase w-fit"
                            >
                                <span>{data.resume_url ? 'View Resume' : 'Download Resume'}</span>
                                <div className="w-12 h-[1px] bg-white/20 group-hover:w-20 group-hover:bg-accent-red transition-all" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
