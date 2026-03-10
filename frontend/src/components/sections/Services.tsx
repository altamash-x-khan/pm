"use client";

import { motion } from "framer-motion";
import {
    Flower2,
    Activity,
    Baby,
    Sparkles,
    Brain,
    Apple
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const services = [
    {
        icon: Flower2,
        title: "Women's Health",
        description: "Natural support for PCOS, menstrual irregularities, menopause symptoms, and hormonal imbalances without synthetic hormones."
    },
    {
        icon: Activity,
        title: "Chronic Disease Management",
        description: "Deep-acting constitutional remedies for asthma, allergies, arthritis, hypertension, and long-standing chronic conditions."
    },
    {
        icon: Baby,
        title: "Child & Pediatric Care",
        description: "Gentle, sweet-tasting remedies perfect for children. Effective for recurring colds, adenoids, tonsillitis, and behavioral issues."
    },
    {
        icon: Sparkles,
        title: "Skin & Hair Disorders",
        description: "Treating acne, eczema, psoriasis, and hair fall from the inside out, addressing the root internal cause."
    },
    {
        icon: Brain,
        title: "Stress & Mental Wellness",
        description: "Holistic relief for anxiety, depression, insomnia, and chronic stress, restoring emotional equilibrium."
    },
    {
        icon: Apple,
        title: "Digestive Health",
        description: "Resolving IBS, acidity, gastric ulcers, and chronic constipation by improving gut immunity and digestion."
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export function Services() {
    return (
        <section id="services" className="py-24 bg-brand-cream/50">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h2
                        className="text-3xl md:text-5xl font-serif font-bold text-brand-espresso mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        Specialized Treatments
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
                        Homeopathy is a tailored science. Every prescription is uniquely selected based on your physical, mental, and emotional constitution.
                    </motion.p>
                </div>

                {/* Services Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {services.map((service, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="h-full border-brand-rose/10 hover:border-brand-rose/30 hover:shadow-lg transition-all duration-300 bg-white group cursor-pointer overflow-hidden relative">

                                {/* Minimalist accent line on hover */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-brand-rose scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />

                                <CardHeader className="p-8">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-sage/10 text-brand-sage flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand-sage group-hover:text-white">
                                        <service.icon className="w-7 h-7" strokeWidth={1.5} />
                                    </div>
                                    <CardTitle className="font-serif text-2xl text-brand-espresso mb-3">
                                        {service.title}
                                    </CardTitle>
                                    <CardDescription className="text-base text-brand-muted leading-relaxed">
                                        {service.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
