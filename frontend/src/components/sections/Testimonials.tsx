"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star, Heart } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TestimonyForm } from "@/components/sections/TestimonyForm";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
    {
        name: "Shakir Ansari",
        role: "Patient",
        text: "I was suffering from a fungal infection for 2 years and it had spread significantly. I tried allopathic medicines for months, but they only suppressed the itching. Around 2–3 months ago, I started treatment under Dr. Farheen, and my case was handled over a call. Now the itching, redness, and white flakes have reduced by more than 50%, and there have been no new eruptions since then. I also feel mentally calmer and less irritable. I would absolutely recommend Dr. Farheen, especially for skin complaints.",
        rating: 5,
    },
    {
        name: "Sana Khan",
        role: "Patient",
        text: "I had a period problem and white discharge problem. I went for treatment for the first time and got very good results within 15 days ❤️. Dr. Farheen handled my case very logically and she is a very polite and helpful person 😊. Before this, I was taking medicines from a general physician for 6 months, but it didn't make much difference. After visiting Dr. Farheen, I felt a lot of improvement. She is a very good doctor ❤️ and I would recommend everyone to visit her.",
        rating: 5,
    }
];

export function Testimonials() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                        Don&apos;t just take our word for it. Read what our deeply valued patients have experienced on their journey to wellness.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Button
                            id="share-story-btn"
                            onClick={() => setIsModalOpen(true)}
                            variant="outline"
                            className="border-brand-rose/40 bg-brand-rose/10 text-brand-rose hover:bg-brand-rose/20 hover:border-brand-rose/60 hover:text-brand-rose rounded-full px-8 py-6 text-base font-medium transition-all duration-300 shadow-md gap-2"
                        >
                            <Heart className="w-5 h-5" />
                            Share Your Story
                        </Button>
                    </motion.div>
                </div>

                {/* Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="max-w-4xl mx-auto relative px-4 sm:px-12"
                >
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent>
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/2 pl-4 pr-4">
                                    <div className="bg-brand-cream/40 border border-brand-rose/10 p-8 rounded-3xl h-full flex flex-col relative mt-8">

                                        {/* Floating Quote Icon */}
                                        <div className="absolute -top-6 left-8 bg-brand-rose text-white p-3 rounded-full shadow-md">
                                            <Quote className="w-5 h-5 fill-current" />
                                        </div>

                                        {/* Star Rating */}
                                        <div className="flex gap-1 mb-6 mt-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < testimonial.rating ? "text-brand-gold fill-brand-gold" : "text-gray-300"}`}
                                                />
                                            ))}
                                        </div>

                                        {/* Testimonial Text */}
                                        <p className="text-brand-espresso/80 italic leading-relaxed mb-8 flex-grow text-lg">
                                            &ldquo;{testimonial.text}&rdquo;
                                        </p>

                                        {/* Author */}
                                        <div>
                                            <p className="font-serif font-bold text-brand-espresso text-xl">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-brand-muted text-sm">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden sm:block">
                            <CarouselPrevious className="left-0 -translate-x-full bg-white border-brand-rose/20 text-brand-rose hover:bg-brand-rose hover:text-white" />
                            <CarouselNext className="right-0 translate-x-full bg-white border-brand-rose/20 text-brand-rose hover:bg-brand-rose hover:text-white" />
                        </div>
                    </Carousel>
                </motion.div>
            </div>

            {/* Testimony Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="font-serif text-2xl text-brand-espresso">
                            Share Your Healing Journey
                        </DialogTitle>
                        <DialogDescription className="text-brand-muted">
                            Your story could inspire someone who is still searching for hope. Dr. Farheen will review your testimony before publishing it.
                        </DialogDescription>
                    </DialogHeader>
                    <TestimonyForm onSuccess={() => setIsModalOpen(false)} />
                </DialogContent>
            </Dialog>
        </section>
    );
}
