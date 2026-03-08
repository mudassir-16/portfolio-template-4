"use client";

import { motion } from "framer-motion";
import { Skill } from "@/lib/db_service";

type SkillsProps = {
    skills?: {
        technical: Skill[];
        soft: string[];
    } | null;
};

export default function Skills({ skills }: SkillsProps) {
    const techSkills = skills?.technical || [];
    const softSkills = skills?.soft || [];

    const allSkills = [
        ...techSkills.map((s, i) => ({ id: `T${i}`, title: s.name, level: s.level, type: "Technical" })),
        ...softSkills.map((s, i) => ({ id: `S${i}`, title: s, level: "Proficient", type: "Soft Skill" }))
    ];

    return (
        <section id="skills" className="px-6 md:px-20 py-32 bg-primary-deep/10">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-16">
                    <h2 className="section-label">Expertise</h2>
                    <div className="h-[1px] flex-1 bg-white/10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allSkills.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-8 group hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-accent-red"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-[10px] font-bold py-1 px-3 rounded-full bg-accent-red/20 text-accent-red tracking-widest group-hover:bg-accent-red group-hover:text-white transition-all">
                                    {skill.type}
                                </span>
                                <div className="h-[1px] flex-1 bg-white/5" />
                            </div>

                            <h3 className="text-2xl font-serif font-bold mb-4">{skill.title}</h3>
                            <p className="text-white/40 text-sm leading-relaxed italic">
                                {skill.level}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
