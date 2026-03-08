"use client";

import { motion } from "framer-motion";
import { profileData } from "@/data/mockData";

export default function Experience() {
    return (
        <section id="experience" className="px-6 md:px-20 py-24 bg-primary-deep/30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                {/* Education */}
                <div className="space-y-12">
                    <h2 className="editorial-title text-4xl md:text-6xl mb-8">Education</h2>
                    {profileData.education.map((edu) => (
                        <motion.div
                            key={edu.degree}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative pl-8 border-l border-accent-gold/30"
                        >
                            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-accent-gold" />
                            <p className="text-accent-gold text-xs font-bold tracking-[0.2em] mb-2 uppercase">
                                {edu.duration}
                            </p>
                            <h3 className="text-2xl font-serif font-bold mb-1">{edu.degree}</h3>
                            <p className="text-lg text-white/80 mb-2">{edu.institution}</p>
                            <div className="inline-block px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-accent-gold">
                                CGPA: {edu.cgpa}
                            </div>
                        </motion.div>
                    ))}

                    {/* High School Section from PRD */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative pl-8 border-l border-accent-gold/30"
                    >
                        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-accent-gold/30" />
                        <p className="text-white/40 text-xs font-bold tracking-[0.2em] mb-2 uppercase">
                            Secondary (X)
                        </p>
                        <h3 className="text-2xl font-serif font-bold mb-1">MVR Group Of Schools</h3>
                        <p className="text-lg text-white/60 mb-2">97% Achievement</p>
                    </motion.div>
                </div>

                {/* Experience / Leadership */}
                <div className="space-y-12">
                    <h2 className="editorial-title text-4xl md:text-6xl mb-8">Leadership</h2>
                    <div className="space-y-8">
                        {(profileData as any).leadership.map((item: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-6 border-l-2 border-accent-gold/20 hover:border-accent-gold transition-colors"
                            >
                                <h3 className="text-xl font-serif font-bold text-accent-gold mb-1">{item.role}</h3>
                                <p className="text-xs font-bold tracking-widest text-white/40 uppercase">{item.organization}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
