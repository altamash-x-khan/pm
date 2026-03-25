"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function Booking() {
    const whatsappNumber = "918452860941";
    const message = "Hi Doctor Farheen, I am interested in Scheduling Consultation.";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <section id="booking" className="py-24 bg-brand-cream/50">
            <div className="container mx-auto px-4 text-center max-w-2xl">
                {/* Header */}
                <motion.h2
                    className="text-3xl md:text-5xl font-serif font-bold text-brand-espresso mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    Start a Conversation
                </motion.h2>

                <motion.div
                    className="w-24 h-1 bg-brand-rose mx-auto rounded-full mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                />

                <motion.p
                    className="text-brand-muted text-lg mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                >
                    Healing begins with being heard. Message me directly to discuss your symptoms and schedule your consultation.
                </motion.p>

                {/* WhatsApp Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
                >
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 bg-brand-rose hover:bg-brand-rose/90 text-white rounded-full py-4 px-10 text-lg font-medium transition-transform hover:scale-105 shadow-sm"
                    >
                        <MessageCircle className="w-6 h-6 mb-0.5" />
                        Message on WhatsApp
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
