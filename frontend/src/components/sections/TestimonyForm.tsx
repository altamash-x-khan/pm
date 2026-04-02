"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const EMOJI_RATINGS: Record<number, { emoji: string; label: string }> = {
    1: { emoji: "😔", label: "A little disappointed" },
    2: { emoji: "😐", label: "Sad" },
    3: { emoji: "🙂", label: "Neutral" },
    4: { emoji: "😊", label: "Good" },
    5: { emoji: "🤩", label: "Amazing!" },
};

const testimonySchema = z.object({
    name: z.string().min(2, "Please enter your name."),
    rating: z.number().int().min(1, "Please select a star rating.").max(5),
    condition: z.string().optional(),
    story: z.string().min(30, "Please share at least a sentence or two (30+ characters)."),
});
type TestimonyValues = z.infer<typeof testimonySchema>;

interface TestimonyFormProps {
    onSuccess: () => void;
}

export function TestimonyForm({ onSuccess }: TestimonyFormProps) {
    const [hoveredStar, setHoveredStar] = useState(0);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TestimonyValues>({
        resolver: zodResolver(testimonySchema),
        defaultValues: { rating: 0 },
    });

    const selectedRating = watch("rating");
    const activeRating = hoveredStar || selectedRating;

    const onSubmit = async (data: TestimonyValues) => {
        try {
            const whatsappNumber = "918452860941";
            const message = `New Patient Testimony\n\nName: ${data.name}\nRating: ${data.rating}/5\nCondition: ${data.condition || "Not specified"}\nStory: ${data.story}`;
            
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappLink, "_blank");

            toast.success("Thank you for sharing! Please send the message in WhatsApp to complete your submission.");
            reset();
            onSuccess();
        } catch {
            toast.error("Could not process your testimony. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-2">

            {/* Name */}
            <div className="space-y-1.5">
                <Label htmlFor="testimony-name" className="text-brand-espresso font-medium text-sm">
                    Your Name <span className="text-brand-rose">*</span>
                </Label>
                <Input
                    id="testimony-name"
                    placeholder="e.g. Sana Khan"
                    {...register("name")}
                    className="rounded-xl border-brand-rose/20 focus:border-brand-rose"
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            {/* Star Rating */}
            <div className="space-y-1.5">
                <Label className="text-brand-espresso font-medium text-sm">
                    Your Rating <span className="text-brand-rose">*</span>
                </Label>
                <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setValue("rating", star, { shouldValidate: true })}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            className="transition-transform hover:scale-110 focus:outline-none"
                            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                        >
                            <Star
                                className={`w-8 h-8 transition-colors ${star <= (hoveredStar || selectedRating)
                                    ? "text-brand-gold fill-brand-gold"
                                    : "text-gray-300"
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                {/* Emoji feedback */}
                <div className="h-8 flex items-center gap-2">
                    {activeRating > 0 && EMOJI_RATINGS[activeRating] && (
                        <span key={activeRating} className="text-2xl leading-none animate-in fade-in zoom-in-75 duration-150">
                            {EMOJI_RATINGS[activeRating].emoji}
                        </span>
                    )}
                </div>

                {errors.rating && <p className="text-red-500 text-xs">{errors.rating.message}</p>}
            </div>

            {/* Condition Treated */}
            <div className="space-y-1.5">
                <Label htmlFor="testimony-condition" className="text-brand-espresso font-medium text-sm">
                    Condition Treated <span className="text-brand-muted font-normal">(optional)</span>
                </Label>
                <Input
                    id="testimony-condition"
                    placeholder="e.g. Eczema, PCOS, Anxiety..."
                    {...register("condition")}
                    className="rounded-xl border-brand-rose/20 focus:border-brand-rose"
                />
            </div>

            {/* Story */}
            <div className="space-y-1.5">
                <Label htmlFor="testimony-story" className="text-brand-espresso font-medium text-sm">
                    Your Experience <span className="text-brand-rose">*</span>
                </Label>
                <Textarea
                    id="testimony-story"
                    rows={5}
                    placeholder="Share your healing journey - what brought you to Dr. Farheen, what changed, and how you feel now..."
                    {...register("story")}
                    className="rounded-xl border-brand-rose/20 focus:border-brand-rose resize-none"
                />
                {errors.story && <p className="text-red-500 text-xs">{errors.story.message}</p>}
            </div>

            {/* Submit */}
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-espresso hover:bg-brand-espresso/90 text-white rounded-full py-6 text-base font-medium flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    "Submit My Testimony ✨"
                )}
            </Button>

            <p className="text-xs text-brand-muted text-center">
                Your testimony will be reviewed by Dr. Farheen before being published.
            </p>
        </form>
    );
}
