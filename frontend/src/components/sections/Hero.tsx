"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
    const scrollToBooking = () => {
        const element = document.querySelector("#booking");
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: "smooth",
            });
        }
    };

    const scrollToAbout = () => {
        const element = document.querySelector("#about");
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-cream py-20">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-rose/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 -left-20 w-72 h-72 bg-brand-sage/20 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">

                    {/* Text Content */}
                    <motion.div
                        className="flex-1 text-center md:text-left"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.h1
                            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-espresso leading-tight mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Natural Healing, <br className="hidden md:block" />
                            <span className="text-brand-rose italic">Lasting Wellness.</span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl text-brand-espresso/80 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Discover the power of holistic homeopathy with Dr. Farheen.
                            Personalized, gentle, and effective treatments designed for your unique body and mind.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Button
                                size="lg"
                                className="bg-brand-rose hover:bg-brand-rose/90 text-white rounded-full px-8 py-6 text-lg w-full sm:w-auto shadow-sm"
                                onClick={scrollToBooking}
                            >
                                Book a Consultation
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full px-8 py-6 text-lg w-full sm:w-auto border-brand-rose/30 text-brand-espresso hover:bg-brand-rose/5"
                                onClick={scrollToAbout}
                            >
                                Learn More
                            </Button>
                        </motion.div>

                        {/* Secondary CTA for returning patients */}
                        <motion.div
                            className="mt-6 text-center md:text-left"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <Button
                                variant="outline"
                                className="border-brand-rose/40 bg-brand-rose/5 text-brand-rose hover:bg-brand-rose/15 hover:text-brand-rose hover:border-brand-rose/60 rounded-full px-8 py-6 text-base font-medium transition-all shadow-sm gap-2"
                                onClick={() => {
                                    const element = document.querySelector("#testimonials");
                                    if (element) {
                                        const offset = 80;
                                        const bodyRect = document.body.getBoundingClientRect().top;
                                        const elementRect = element.getBoundingClientRect().top;
                                        const elementPosition = elementRect - bodyRect;
                                        window.scrollTo({
                                            top: elementPosition - offset,
                                            behavior: "smooth",
                                        });
                                    }
                                }}
                            >
                                ✨ Share your healing journey
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Image/Visual Content */}
                    <motion.div
                        className="flex-1 w-full max-w-md lg:max-w-lg relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        {/* Soft decorative frame behind image */}
                        <div className="absolute inset-0 bg-brand-gold/10 rounded-[2rem] transform rotate-3 scale-105 -z-10" />

                        <div className="relative aspect-[4/5] bg-white rounded-[2rem] overflow-hidden shadow-xl border border-brand-rose/10 flex items-center justify-center">
                            {/* Fallback pattern until real photo is provided */}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#d4a3a3 2px, transparent 2px)", backgroundSize: "24px 24px" }} />
                            <div className="text-center z-10 px-6">
                                <div className="w-24 h-24 bg-brand-rose/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-brand-espresso font-serif text-3xl">DF</span>
                                </div>
                                <p className="font-serif text-xl text-brand-espresso">Dr. Farheen</p>
                                <p className="text-sm text-brand-muted mt-2">BHMS, PGDEMS</p>
                                <p className="text-xs text-brand-rose/80 mt-1 italic">High-quality profile image will go here.</p>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-brand-rose/10 flex items-center gap-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                        >
                            <div className="w-10 h-10 rounded-full bg-brand-sage/20 flex items-center justify-center text-brand-sage font-bold">
                                4+
                            </div>
                            <div>
                                <p className="text-sm font-bold text-brand-espresso">Years Experience</p>
                                <p className="text-xs text-brand-muted">Trusted Care</p>
                            </div>
                        </motion.div>

                    </motion.div>

                </div>
            </div>
        </section>
    );
}
