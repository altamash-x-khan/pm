"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, HeartPulse, ShieldCheck } from "lucide-react";

const credentials = [
    "BHMS, Mumbai (Ranked 2nd in final year)",
    "Distinction in the subject of Repertory and case taking",
    "PGDEMS (Emergency Medical Service)",
    "Managing homoeopathic OPD since 4 years",
    "6+ months observation in Ruby hospital and KJ cure hospital",
    "Certified in Mental Health Conference 2025",
    "Appreciated for Voluntary Services at Bidada Hospital, Kutch"
];

const highlights = [
    { icon: HeartPulse, label: "Holistic Approach", desc: "Body, Mind & Spirit, Treating as a whole." },
    { icon: ShieldCheck, label: "Safe & Natural", desc: "Zero side-effects, suitable for all ages including infants and elderly." },
    { icon: Award, label: "Root Cause Cure", desc: "Focusing on eradicating the disease from its root cause." }
];

export function About() {
    return (
        <section id="about" className="py-24 bg-white relative">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <motion.h2
                        className="text-3xl md:text-5xl font-serif font-bold text-brand-espresso mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        Meet Dr. Farheen
                    </motion.h2>
                    <motion.div
                        className="w-24 h-1 bg-brand-rose mx-auto rounded-full mb-6"
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    />
                    <motion.p
                        className="text-brand-muted text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        A passionate healer dedicated to restoring your health through the gentle, powerful science of homeopathy.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Image Area */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="aspect-square max-w-md mx-auto relative rounded-[2rem] overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-brand-cream flex flex-col items-center justify-center p-6 gap-6 border border-brand-rose/20 text-center">
                                <p className="text-brand-rose italic font-serif text-lg font-medium leading-relaxed">
                                    "Treat your illness, for Allah Most Glorious, has not sent a disease without sending a cure along with it, except for old age" <br /> <br /> <span className="text-sm text-brand-espresso font-normal not-italic">— Prophet Muhammed (PBUH)</span>
                                </p>
                                <div className="h-px bg-brand-rose/30 w-16 mx-auto"></div>
                                <p className="text-brand-rose italic font-serif text-lg font-medium leading-relaxed">
                                    "The highest ideal of cure is rapid, gentle, and permanent restoration of the health." <br /> <br /> <span className="text-sm text-brand-espresso font-normal not-italic">— Dr. Samuel Hahnemann</span>
                                </p>
                            </div>
                        </div>
                        {/* Decorative dots */}
                        <div className="absolute -top-6 -left-6 w-24 h-24 bg-brand-gold/10 rounded-full blur-xl -z-10" />
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-sage/10 rounded-full blur-xl -z-10" />
                    </motion.div>

                    {/* Right Column: Text and Credentials */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-serif font-semibold text-brand-espresso mb-6">
                            Empowering your body&apos;s innate healing intelligence.
                        </h3>

                        <p className="text-brand-espresso/80 leading-relaxed mb-6">
                            With over 4 years of clinical experience, Dr. Farheen believes that true health is more than simply the absence of disease. It is a state of complete physical, mental, and emotional well-being.
                        </p>

                        <p className="text-brand-espresso/80 leading-relaxed mb-8">
                            Her practice combines classical homeopathic principles with a modern understanding of lifestyle, nutrition, and stress management, offering profoundly customized care for every individual.
                        </p>

                        {/* Credentials List */}
                        <div className="bg-brand-cream/50 p-6 rounded-2xl border border-brand-rose/10 mb-8">
                            <h4 className="font-serif font-semibold text-brand-espresso mb-4 text-lg">Qualifications</h4>
                            <ul className="space-y-3">
                                {credentials.map((cred, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-brand-sage shrink-0 mt-0.5" />
                                        <span className="text-brand-espresso/80 text-sm md:text-base">{cred}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Highlights Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 pt-8 border-t border-brand-rose/10">
                            {highlights.map((item, idx) => (
                                <div key={idx} className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full bg-brand-rose/10 flex items-center justify-center shrink-0 mt-1">
                                        <item.icon className="w-6 h-6 text-brand-rose" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-brand-espresso text-base mb-1.5">{item.label}</h4>
                                        <p className="text-sm text-brand-muted leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
