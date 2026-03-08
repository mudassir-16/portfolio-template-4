"use client";

import { motion } from "framer-motion";
import { profileData } from "@/data/mockData";
import { MoveUpRight } from "lucide-react";

export default function Projects() {
    return (
        <section id="projects" className="px-6 md:px-20 py-32">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-16">
                    <h2 className="section-label">Projects</h2>
                    <div className="h-[1px] flex-1 bg-white/10" />
                </div>

                <div className="space-y-12">
                    {profileData.projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative grid grid-cols-12 gap-6 items-center"
                        >
                            {/* Image Side */}
                            <div className="col-span-12 md:col-span-8 overflow-hidden rounded-3xl glass-card aspect-[16/9] bg-gradient-to-br from-primary-medium/20 to-black/60 relative">
                                <div className="absolute inset-0 flex items-center justify-center p-12">
                                    <div className="w-full h-full border border-white/5 rounded-xl bg-primary-deep/40 shadow-2xl relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                                        {/* Fake Browser Top Bar */}
                                        <div className="h-6 bg-black/40 border-b border-white/5 flex items-center px-4 gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-red/40" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                        </div>
                                        <div className="p-8 flex items-center justify-center h-full">
                                            <h4 className="text-4xl md:text-6xl font-serif font-black opacity-10 italic uppercase select-none tracking-tighter">
                                                {project.title}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                {/* Floating Label */}
                                <div className="absolute top-8 right-8 py-1 px-4 rounded-full bg-accent-red/20 border border-accent-red/40 text-[10px] uppercase font-bold tracking-widest text-accent-red backdrop-blur-md">
                                    V 4.0
                                </div>
                            </div>

                            {/* Info Side */}
                            <div className="col-span-12 md:col-span-4 p-6 md:p-8 space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-serif font-bold group-hover:text-accent-red transition-colors">{project.title}</h3>
                                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 italic">digital experience</p>
                                </div>

                                <p className="text-white/60 text-sm italic leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.slice(0, 3).map(tech => (
                                        <span key={tech} className="text-[10px] uppercase font-bold tracking-widest text-white/20">
                                            #{tech}
                                        </span>
                                    ))}
                                </div>

                                <a href={project.github} className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase hover:text-accent-red transition-all group/link">
                                    <span>View Project</span>
                                    <MoveUpRight size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Other Works Button Style */}
                <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <h2 className="section-label mb-0">другие работы</h2>
                        <p className="text-white/20 text-xs italic">and minor experiments</p>
                    </div>
                    <button className="glass-card py-4 px-12 group hover:bg-accent-red transition-all">
                        <span className="text-xs font-bold tracking-[0.5em] uppercase">Show Gallery</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
