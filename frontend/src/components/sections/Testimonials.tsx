"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Star, Heart } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
    {
        name: "Shakir Ansari",
        role: "Patient",
        condition: "Skin & Fungal",
        text: "I was suffering from a fungal infection for 2 years and it had spread significantly. I tried allopathic medicines for months, but they only suppressed the itching. Around 2\u20133 months ago, I started treatment under Dr. Farheen, and my case was handled over a call. Now the itching, redness, and white flakes have reduced by more than 50%, and there have been no new eruptions since then. I also feel mentally calmer and less irritable. I would absolutely recommend Dr. Farheen, especially for skin complaints.",
        rating: 5,
    },
    {
        name: "Sana Khan",
        role: "Patient",
        condition: "Women's Health",
        text: "I had a period problem and white discharge problem. I went for treatment for the first time and got very good results within 15 days ❤️. Dr. Farheen handled my case very logically and she is a very polite and helpful person 😊. Before this, I was taking medicines from a general physician for 6 months, but it didn't make much difference. After visiting Dr. Farheen, I felt a lot of improvement. She is a very good doctor ❤️ and I would recommend everyone to visit her.",
        rating: 5,
    }
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
    return (
        <div className="bg-brand-cream/40 border border-brand-rose/10 p-8 sm:p-12 rounded-3xl h-full flex flex-col relative items-center text-center">

            {/* Centered Avatar */}
            <div className="w-20 h-20 rounded-full bg-brand-sage/10 text-brand-sage flex items-center justify-center mb-5 border-2 border-white shadow-sm ring-4 ring-brand-sage/5">
                <User className="w-10 h-10" />
            </div>

            {/* Star Rating */}
            <div className="flex gap-1 justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? "text-brand-gold fill-brand-gold" : "text-gray-300"}`}
                    />
                ))}
            </div>

            {/* Condition Title */}
            <h4 className="text-brand-sage font-medium text-lg mb-6">
                {testimonial.condition}
            </h4>

            {/* Testimonial Text */}
            <p className="text-brand-espresso/80 italic leading-relaxed mb-8 flex-grow text-lg sm:text-xl">
                "{testimonial.text}"
            </p>

            {/* Author */}
            <div className="mt-auto">
                <p className="font-serif font-bold text-brand-espresso text-xl">
                    {testimonial.name}
                </p>
            </div>
        </div>
    );
}

export function Testimonials() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    return (
        <section id="testimonials" className="py-24 bg-white relative overflow-hidden">

            {/* Decorative background blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-3xl -z-10" />

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
                        Stories of Healing
                    </motion.h2>
                    <motion.div
                        className="w-24 h-1 bg-brand-gold mx-auto rounded-full mb-6"
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    />
                    <motion.p
                        className="text-brand-muted text-lg relative z-20 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Don&apos;t just take my word for it. Read what my deeply valued patients have experienced on their journey to wellness.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <p className="text-brand-muted text-sm mb-3 font-medium">Treated by me?</p>
                        <Button
                            id="share-story-btn"
                            onClick={() => window.dispatchEvent(new CustomEvent('open-chat', { detail: { mode: 'TESTIMONY' } }))}
                            variant="outline"
                            className="border-brand-rose/40 bg-brand-rose/10 text-brand-rose hover:bg-brand-rose/20 hover:border-brand-rose/60 hover:text-brand-rose rounded-full px-8 py-6 text-base font-medium transition-all duration-300 shadow-md gap-2"
                        >
                            <Heart className="w-5 h-5" />
                            Share with AI Assistant
                        </Button>
                    </motion.div>
                </div>

                {/* Unified Carousel for all Testimonials */}
                <motion.div
                    className="max-w-5xl mx-auto mt-6 relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Carousel
                        opts={{
                            align: "center",
                            loop: true,
                        }}
                        plugins={[plugin.current]}
                        className="w-full"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent>
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 pl-4 pr-4">
                                    <div className="py-2 h-full">
                                        <TestimonialCard testimonial={testimonial} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Navigation Arrows: Centered at bottom for Desktop, Sides for Mobile */}
                        <div className="hidden sm:flex justify-center gap-4 mt-12 pb-4">
                            <CarouselPrevious className="static translate-y-0 translate-x-0 bg-white border-brand-rose/20 text-brand-rose hover:bg-brand-rose hover:text-white shadow-sm w-12 h-12" />
                            <CarouselNext className="static translate-y-0 translate-x-0 bg-white border-brand-rose/20 text-brand-rose hover:bg-brand-rose hover:text-white shadow-sm w-12 h-12" />
                        </div>

                        <div className="sm:hidden absolute top-[58%] -translate-y-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none z-20">
                            <CarouselPrevious className="static translate-y-0 translate-x-0 bg-white/95 backdrop-blur-sm border-brand-rose/20 text-brand-rose shadow-md w-10 h-10 pointer-events-auto" />
                            <CarouselNext className="static translate-y-0 translate-x-0 bg-white/95 backdrop-blur-sm border-brand-rose/20 text-brand-rose shadow-md w-10 h-10 pointer-events-auto" />
                        </div>
                    </Carousel>
                </motion.div>


            </div>

        </section>
    );
}
