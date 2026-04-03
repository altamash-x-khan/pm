"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
    const scrollToSection = (id: string) => {
        const element = document.querySelector(id);
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
                <div className="flex flex-col items-center justify-center gap-12 lg:gap-20 max-w-4xl mx-auto">

                    {/* Text Content */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Credential Badge */}
                        <motion.div
                            className="inline-flex items-center justify-center gap-2 bg-brand-rose/10 border border-brand-rose/20 rounded-full px-4 py-1.5 mb-5 mx-auto"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <span className="text-brand-rose text-sm font-medium">BHMS  ·  Ranked 2nd in Final Year</span>
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-espresso leading-tight mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Natural Healing, <br className="hidden md:block" />
                            <span className="text-brand-rose italic">Lasting Wellness.</span>
                        </motion.h1>

                        {/* Social Proof Strip */}
                        <motion.p
                            className="text-brand-muted text-sm md:text-base mb-6 tracking-wide justify-center flex"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            4+ Years Experience  ·  All Ages  ·  Online Available
                        </motion.p>

                        <motion.p
                            className="text-lg md:text-xl text-brand-espresso/80 mb-8 max-w-xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Discover the power of holistic homeopathy with me.
                            Personalized, gentle, and effective treatments designed for your unique body and mind.
                        </motion.p>

                        {/* Primary CTAs */}
                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Button
                                size="lg"
                                className="bg-brand-rose hover:bg-brand-rose/90 text-white rounded-full px-8 py-6 text-lg w-full sm:w-auto shadow-sm"
                                onClick={() => scrollToSection("#booking")}
                            >
                                Book Consultation
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full px-8 py-6 text-lg w-full sm:w-auto border-brand-rose/30 text-brand-espresso hover:bg-brand-rose/5"
                                onClick={() => scrollToSection("#about")}
                            >
                                About Me
                            </Button>
                        </motion.div>

                        {/* Testimony CTA — visible, secondary */}
                        <motion.div
                            className="mt-6 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <p className="text-xs text-brand-muted mb-1.5 justify-center flex">Already treated by me?</p>
                            <Button
                                variant="outline"
                                className="border-brand-rose/30 bg-brand-rose/5 text-brand-rose hover:bg-brand-rose/15 hover:text-brand-rose hover:border-brand-rose/50 rounded-full px-6 py-4 text-sm font-medium transition-all shadow-sm gap-2 mx-auto flex"
                                onClick={() => window.dispatchEvent(new CustomEvent('open-chat', { detail: { mode: 'TESTIMONY' } }))}
                            >
                                <Heart className="w-4 h-4" />
                                Share Your Story
                            </Button>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
