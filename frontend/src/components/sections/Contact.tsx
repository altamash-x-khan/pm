"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactSchema = z.object({
    name: z.string().min(2, "Name is required."),
    email: z.string().email("Please enter a valid email."),
    phone: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters."),
});
type ContactValues = z.infer<typeof contactSchema>;

const contactInfo = [
    { icon: MapPin, label: "Address", value: "Gaon devi dongri, near reliance girls hostel, cama road, Andheri West, Mumbai 400058 (Online consultations available too)" },
    { icon: Phone, label: "Phone", value: "+91 8452860941" },
    { icon: Mail, label: "Email", value: "farheenansarip55@gmail.com" },
    { icon: Clock, label: "Hours", value: "Mon–Fri: 3PM–6PM  |  Sat-Sun: 3PM–9PM" },
];

export function Contact() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactValues) => {
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                toast.error(result.error || "Something went wrong. Please try again.");
                return;
            }

            toast.success("Message sent! We will get back to you within 24 hours.");
            reset();
        } catch {
            toast.error("Network error. Please check your connection and try again.");
        }
    };

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
                        Get in Touch
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
                        Have a question before booking? We are happy to help.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left: Contact Info + Map */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="bg-brand-cream/40 rounded-3xl p-8 border border-brand-rose/10 space-y-6">
                            {contactInfo.map((item) => (
                                <div key={item.label} className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-brand-rose/10 flex items-center justify-center shrink-0">
                                        <item.icon className="w-5 h-5 text-brand-rose" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-brand-muted uppercase tracking-wide mb-1">{item.label}</p>
                                        <p className="text-brand-espresso text-sm">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        className="bg-white rounded-3xl p-8 shadow-sm border border-brand-rose/10 space-y-5"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <Label htmlFor="contact-name" className="text-brand-espresso font-medium text-sm">Name <span className="text-brand-rose">*</span></Label>
                                    <Input id="contact-name" placeholder="e.g. Shakir Ansari" {...register("name")} className="rounded-xl border-brand-rose/20 focus:border-brand-rose" />
                                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="contact-phone" className="text-brand-espresso font-medium text-sm">Phone</Label>
                                    <Input id="contact-phone" type="tel" placeholder="+91 987654321" {...register("phone")} className="rounded-xl border-brand-rose/20 focus:border-brand-rose" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="contact-email" className="text-brand-espresso font-medium text-sm">Email <span className="text-brand-rose">*</span></Label>
                                <Input id="contact-email" type="email" placeholder="your@email.com" {...register("email")} className="rounded-xl border-brand-rose/20 focus:border-brand-rose" />
                                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="contact-message" className="text-brand-espresso font-medium text-sm">Message <span className="text-brand-rose">*</span></Label>
                                <Textarea
                                    id="contact-message"
                                    rows={5}
                                    placeholder="Ask about treatments, fees, or anything else..."
                                    {...register("message")}
                                    className="rounded-xl border-brand-rose/20 focus:border-brand-rose resize-none"
                                />
                                {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-brand-espresso hover:bg-brand-espresso/90 text-white rounded-full py-6 text-base font-medium"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
