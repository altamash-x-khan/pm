"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CalendarDays, Clock, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// --- Booking Schema ---
const bookingSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    age: z.number().min(1, "Please enter a valid age.").max(120, "Please enter a valid age."),
    email: z.string().email("Please enter a valid email address."),
    phone: z.string().min(7, "Please enter a valid phone number."),
    symptoms: z.string().min(10, "Please describe your condition in at least 10 characters so the doctor can prepare."),
});
type BookingValues = z.infer<typeof bookingSchema>;

// --- Time Slots ---
const weekdaySlots = [
    { label: "3:00 PM", period: "Afternoon" },
    { label: "4:00 PM", period: "Afternoon" },
    { label: "5:00 PM", period: "Evening" },
    { label: "6:00 PM", period: "Evening" },
];
const weekendSlots = [
    ...weekdaySlots,
    { label: "7:00 PM", period: "Evening" },
    { label: "8:00 PM", period: "Night" },
    { label: "9:00 PM", period: "Night" },
];

// --- Calendar helpers ---
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getCalendarDays(year: number, month: number) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return [...blanks, ...days];
}

export function Booking() {
    const today = new Date();
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<BookingValues>({ resolver: zodResolver(bookingSchema) });

    const calendarDays = getCalendarDays(viewYear, viewMonth);

    const prevMonth = () => {
        if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
        else setViewMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
        else setViewMonth(m => m + 1);
    };

    const isPastDay = (day: number) => {
        const d = new Date(viewYear, viewMonth, day);
        d.setHours(0, 0, 0, 0);
        const t = new Date(); t.setHours(0, 0, 0, 0);
        return d < t;
    };


    const selectDate = (day: number) => {
        if (isPastDay(day)) return;
        const dateStr = `${MONTHS[viewMonth]} ${day}, ${viewYear}`;
        setSelectedDate(dateStr);
        setSelectedTime(null);
    };

    const onSubmit = async (data: BookingValues) => {
        if (!selectedDate || !selectedTime) {
            toast.error("Please select a date and time slot for your appointment.");
            return;
        }

        try {
            const res = await fetch("/api/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    date: selectedDate,
                    time: selectedTime,
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                toast.error(result.error || "Something went wrong. Please try again.");
                return;
            }

            toast.success("Appointment request sent! Dr. Farheen will confirm via email shortly.");
            setSubmitted(true);
            reset();
            setSelectedDate(null);
            setSelectedTime(null);
        } catch {
            toast.error("Network error. Please check your connection and try again.");
        }
    };

    if (submitted) {
        return (
            <section id="booking" className="py-24 bg-brand-cream/50">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-md mx-auto bg-white rounded-3xl p-12 shadow-lg border border-brand-sage/20"
                    >
                        <CheckCircle2 className="w-20 h-20 text-brand-sage mx-auto mb-6" />
                        <h2 className="text-3xl font-serif font-bold text-brand-espresso mb-4">Request Received!</h2>
                        <p className="text-brand-muted mb-8">
                            Dr. Farheen will review your details and confirm your appointment via email within a few hours.
                        </p>
                        <Button
                            className="bg-brand-rose hover:bg-brand-rose/90 text-white rounded-full px-8"
                            onClick={() => setSubmitted(false)}
                        >
                            Book Another Appointment
                        </Button>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="booking" className="py-24 bg-brand-cream/50">
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
                        Book Your Consultation
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
                        Select a date, choose a time, and share your health details. Dr. Farheen will be fully prepared for your visit.
                    </motion.p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        {/* Left: Calendar + Time */}
                        <motion.div
                            className="space-y-8"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            {/* Calendar */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-brand-rose/10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-serif text-xl font-semibold text-brand-espresso flex items-center gap-2">
                                        <CalendarDays className="w-5 h-5 text-brand-rose" />
                                        Select a Date
                                    </h3>
                                    <div className="flex items-center gap-1">
                                        <button type="button" onClick={prevMonth} className="p-2 rounded-full hover:bg-brand-rose/10 text-brand-espresso transition-colors">
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        <span className="text-sm font-medium text-brand-espresso px-2 min-w-[130px] text-center">
                                            {MONTHS[viewMonth]} {viewYear}
                                        </span>
                                        <button type="button" onClick={nextMonth} className="p-2 rounded-full hover:bg-brand-rose/10 text-brand-espresso transition-colors">
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Day Labels */}
                                <div className="grid grid-cols-7 mb-2">
                                    {DAYS.map(d => (
                                        <div key={d} className="text-center text-xs font-medium text-brand-muted py-1">{d}</div>
                                    ))}
                                </div>

                                {/* Day Cells */}
                                <div className="grid grid-cols-7 gap-1">
                                    {calendarDays.map((day, idx) => {
                                        if (!day) return <div key={`blank-${idx}`} />;
                                        const disabled = isPastDay(day);
                                        const dateStr = `${MONTHS[viewMonth]} ${day}, ${viewYear}`;
                                        const isSelected = selectedDate === dateStr;
                                        return (
                                            <button
                                                key={day}
                                                type="button"
                                                disabled={disabled}
                                                onClick={() => selectDate(day)}
                                                className={`
                          aspect-square w-full text-sm rounded-xl font-medium transition-all
                          ${disabled ? "text-brand-muted/40 cursor-not-allowed" : "cursor-pointer hover:bg-brand-rose/10 text-brand-espresso"}
                          ${isSelected ? "bg-brand-rose text-white hover:bg-brand-rose shadow-sm" : ""}
                        `}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                                {selectedDate && (
                                    <p className="mt-4 text-center text-sm text-brand-sage font-medium">
                                        Selected: {selectedDate}
                                    </p>
                                )}
                            </div>

                            {/* Time Slots */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-brand-rose/10">
                                <h3 className="font-serif text-xl font-semibold text-brand-espresso flex items-center gap-2 mb-6">
                                    <Clock className="w-5 h-5 text-brand-rose" />
                                    Select a Time
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
                                    {(selectedDate ? (new Date(selectedDate).getDay() === 0 || new Date(selectedDate).getDay() === 6 ? weekendSlots : weekdaySlots) : weekdaySlots).map(slot => (
                                        <button
                                            key={slot.label}
                                            type="button"
                                            onClick={() => setSelectedTime(slot.label)}
                                            className={`
                        py-3 px-2 rounded-xl text-sm font-medium border transition-all
                        ${selectedTime === slot.label
                                                    ? "bg-brand-rose text-white border-brand-rose shadow-sm"
                                                    : "border-brand-rose/20 text-brand-espresso hover:border-brand-rose/50 hover:bg-brand-rose/5"
                                                }
                      `}
                                        >
                                            {slot.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Patient Info Form */}
                        <motion.div
                            className="bg-white rounded-3xl p-8 shadow-sm border border-brand-rose/10 space-y-6 h-fit"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            <h3 className="font-serif text-xl font-semibold text-brand-espresso mb-1">Patient Information</h3>
                            <p className="text-sm text-brand-muted mb-4">This helps Dr. Farheen prepare a tailored consultation for you.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {/* Name */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="name" className="text-brand-espresso font-medium text-sm">Full Name <span className="text-brand-rose">*</span></Label>
                                    <Input id="name" placeholder="e.g. Sana Khan" {...register("name")} className="rounded-xl border-brand-rose/20 focus:border-brand-rose" />
                                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                                </div>

                                {/* Age */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="age" className="text-brand-espresso font-medium text-sm">Age <span className="text-brand-rose">*</span></Label>
                                    <Input id="age" type="number" min={1} max={120} placeholder="34" {...register("age", { valueAsNumber: true })} className="rounded-xl border-brand-rose/20 focus:border-brand-rose" />
                                    {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
                                </div>

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="email" className="text-brand-espresso font-medium text-sm">Email <span className="text-brand-rose">*</span></Label>
                                    <Input id="email" type="email" placeholder="sana@example.com" {...register("email")} className="rounded-xl border-brand-rose/20 focus:border-brand-rose" />
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                                </div>

                                {/* Phone */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="phone" className="text-brand-espresso font-medium text-sm">Phone <span className="text-brand-rose">*</span></Label>
                                    <Input id="phone" type="tel" placeholder="+91 9876543210" {...register("phone")} className="rounded-xl border-brand-rose/20 focus:border-brand-rose" />
                                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                                </div>
                            </div>

                            {/* Symptoms */}
                            <div className="space-y-1.5">
                                <Label htmlFor="symptoms" className="text-brand-espresso font-medium text-sm">
                                    Existing Conditions & Current Symptoms <span className="text-brand-rose">*</span>
                                </Label>
                                <Textarea
                                    id="symptoms"
                                    rows={5}
                                    placeholder="Please describe your main health concerns, any diagnosed conditions, current medications, and how long you have been experiencing these symptoms. The more detail you provide, the better Dr. Farheen can prepare."
                                    {...register("symptoms")}
                                    className="rounded-xl border-brand-rose/20 focus:border-brand-rose resize-none"
                                />
                                {errors.symptoms && <p className="text-red-500 text-xs">{errors.symptoms.message}</p>}
                            </div>

                            {/* Summary before submit */}
                            {selectedDate && selectedTime && (
                                <div className="bg-brand-cream/70 rounded-xl p-4 border border-brand-rose/10 text-sm text-brand-espresso space-y-1">
                                    <p><span className="font-medium">Date:</span> {selectedDate}</p>
                                    <p><span className="font-medium">Time:</span> {selectedTime}</p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-brand-rose hover:bg-brand-rose/90 text-white rounded-full py-6 text-lg font-medium"
                            >
                                {isSubmitting ? "Sending Request..." : "Confirm Appointment"}
                            </Button>
                        </motion.div>

                    </div>
                </form>
            </div>
        </section>
    );
}
