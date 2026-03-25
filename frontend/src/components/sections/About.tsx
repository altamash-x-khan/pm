"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, HeartPulse, ShieldCheck, Instagram, Twitter } from "lucide-react";

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

const badgeItems = [
    "BHMS, Mumbai",
    "Ranked 2nd in Final Year",
    "4+ Years Experience",
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
                        About Me
                    </motion.h2>
                    <motion.div
                        className="w-24 h-1 bg-brand-rose mx-auto rounded-full mb-6"
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    />
                    <motion.p
                        className="text-brand-muted text-lg mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        I am a passionate healer dedicated to supporting your health through the gentle, powerful science of homeopathy.
                    </motion.p>

                    {/* Credential Badge Row */}
                    <motion.div
                        className="flex flex-wrap items-center justify-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {badgeItems.map((badge, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center bg-brand-rose/10 text-brand-rose border border-brand-rose/20 rounded-full px-3.5 py-1 text-xs font-medium"
                            >
                                {badge}
                            </span>
                        ))}
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: New Profile Card UI */}
                    <div className="flex justify-center w-full">
                        <motion.div
                            className="group relative rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden w-full max-w-sm cursor-pointer"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-rose/5 via-transparent to-brand-rose/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Animated border line - works on scroll for mobile */}
                            <motion.div
                                className="absolute top-0 left-0 h-1 bg-brand-rose"
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />

                            <div className="relative pt-12 p-6 text-center">
                                <div className="mb-6 relative">
                                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md">
                                        <motion.img
                                            src="/farheen-profile.jpeg"
                                            alt="Dr. Farheen"
                                            className="w-full h-full object-cover object-center"
                                            initial={{ scale: 1 }}
                                            whileInView={{ scale: 1.1 }}
                                            whileHover={{ scale: 1.15 }}
                                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                            viewport={{ once: false, amount: 0.5 }}
                                        />
                                    </div>
                                </div>

                                <h4 className="font-serif font-bold text-2xl text-brand-espresso mb-2 group-hover:text-brand-rose transition-colors duration-300">
                                    Dr. Farheen
                                </h4>
                                <p className="text-brand-rose font-medium mb-4">Consultant Homeopath</p>

                                <div className="space-y-2 mb-6">
                                    <p className="text-brand-espresso/80 text-sm">
                                        <span className="font-medium text-brand-espresso">Specialty:</span> Holistic & Classical Homeopathy
                                    </p>
                                    <p className="text-brand-espresso/80 text-sm">
                                        <span className="font-medium text-brand-espresso">Experience:</span> 4+ Years
                                    </p>
                                </div>

                                {/* Social Links */}
                                <div className="flex justify-center space-x-4 mb-2">
                                    <a
                                        href="https://www.instagram.com/farheen_iqrar"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full bg-white text-brand-rose border border-brand-rose/30 hover:bg-brand-rose hover:text-white transition-colors duration-300 shadow-sm hover:shadow"
                                    >
                                        <Instagram size={20} />
                                    </a>
                                    <a
                                        href="https://x.com/farheen_iqrar"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full bg-white text-brand-rose border border-brand-rose/30 hover:bg-brand-rose hover:text-white transition-colors duration-300 shadow-sm hover:shadow"
                                    >
                                        <Twitter size={20} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Text and Credentials */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-serif font-semibold text-brand-espresso mb-6">
                            Supporting your body&apos;s natural ability to heal.
                        </h3>

                        <p className="text-brand-espresso/80 leading-relaxed mb-6">
                            With over 4 years of clinical experience, I believe that true health is more than simply the absence of disease. It is a state of complete physical, mental, and emotional well-being.
                        </p>

                        <p className="text-brand-espresso/80 leading-relaxed mb-8">
                            My practice combines classical homeopathic principles with a modern understanding of lifestyle, nutrition, and stress management, offering profoundly customized care for every individual.
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
                    </motion.div>
                </div>

                {/* Quotes Section (Moved from left column) */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 bg-brand-cream/30 p-8 rounded-2xl border border-brand-rose/10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {/* Quote 1 */}
                    <div className="border-l-4 border-brand-rose pl-6 py-2">
                        <p className="text-brand-rose italic font-serif text-lg font-medium leading-relaxed">
                            &ldquo;Treat your illness, for Allah Most Glorious, has not sent a disease without sending a cure along with it, except for old age&rdquo;
                        </p>
                        <p className="text-sm text-brand-espresso mt-3 font-normal">
                            &mdash; Prophet Muhammed (PBUH)
                        </p>
                    </div>

                    {/* Quote 2 */}
                    <div className="border-l-4 border-brand-rose pl-6 py-2">
                        <p className="text-brand-rose italic font-serif text-lg font-medium leading-relaxed">
                            &ldquo;The highest ideal of cure is rapid, gentle, and permanent restoration of the health.&rdquo;
                        </p>
                        <p className="text-sm text-brand-espresso mt-3 font-normal">
                            &mdash; Dr. Samuel Hahnemann
                        </p>
                    </div>
                </motion.div>

                {/* Highlight Icon Badges — full width */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-12 border-t border-brand-rose/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {highlights.map((item, idx) => (
                        <div key={idx} className="text-center p-6 rounded-2xl bg-brand-cream/40 border border-brand-rose/10">
                            <div className="w-14 h-14 rounded-full bg-brand-rose/10 flex items-center justify-center mx-auto mb-4">
                                <item.icon className="w-7 h-7 text-brand-rose" />
                            </div>
                            <h4 className="font-semibold text-brand-espresso text-base mb-2">{item.label}</h4>
                            <p className="text-sm text-brand-muted leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
