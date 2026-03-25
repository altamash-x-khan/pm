"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="py-24 bg-white">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <motion.h2
                        className="text-3xl md:text-5xl font-serif font-bold text-brand-espresso mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        Connect With Me
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
                        Reach out with any questions or concerns. I am here to support your path to health.
                    </motion.p>
                </div>

                <div className="max-w-xl mx-auto">
                    <motion.div
                        className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-brand-rose/10 space-y-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="space-y-6">
                            {/* Phone */}
                            <div className="flex gap-4 items-center p-4 rounded-2xl bg-brand-cream/50 hover:bg-brand-rose/5 transition-colors">
                                <div className="w-12 h-12 rounded-2xl bg-brand-rose/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-6 h-6 text-brand-rose" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="font-serif text-lg font-semibold text-brand-espresso mb-0.5">Phone Number</h4>
                                    <p className="text-brand-muted text-sm">+91 8452860941</p>
                                    <p className="text-brand-rose text-xs font-medium mt-1">Available for calls & WhatsApp</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex gap-4 items-center p-4 rounded-2xl bg-brand-cream/50 hover:bg-brand-rose/5 transition-colors">
                                <div className="w-12 h-12 rounded-2xl bg-brand-rose/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6 text-brand-rose" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="font-serif text-lg font-semibold text-brand-espresso mb-0.5">Email Address</h4>
                                    <p className="text-brand-muted text-sm">farheenansarip55@gmail.com</p>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
