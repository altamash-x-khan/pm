import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-brand-espresso text-brand-cream border-t border-brand-rose/20 pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">

                    {/* Brand Col */}
                    <div className="md:col-span-1">
                        <Link href="/" className="text-2xl font-serif font-bold text-brand-cream tracking-tight inline-block mb-4">
                            Dr. Farheen<span className="text-brand-rose">.</span>
                        </Link>
                        <p className="text-brand-cream/70 text-sm leading-relaxed max-w-xs">
                            Natural healing and lasting wellness through personalized homeopathic care.
                            Treating the root cause, not just the symptoms.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-serif font-semibold text-brand-gold mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {["About Dr. Farheen", "Services", "Testimonials", "Book Consultation"].map((link) => (
                                <li key={link}>
                                    <Link
                                        href={`#${link.split(" ")[0].toLowerCase()}`}
                                        className="text-brand-cream/70 hover:text-brand-rose transition-colors text-sm"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-serif font-semibold text-brand-gold mb-4">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-brand-cream/70">
                                <MapPin className="w-5 h-5 text-brand-rose shrink-0" />
                                <span>Gaon devi dongri, near reliance girls hostel, cama road, Andheri West, Mumbai, 400058</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-brand-cream/70">
                                <Phone className="w-4 h-4 text-brand-rose shrink-0" />
                                <span>+91 8452860941</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-brand-cream/70">
                                <Mail className="w-4 h-4 text-brand-rose shrink-0" />
                                <span>farheenansarip55@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-1">
                        <h3 className="text-lg font-serif font-semibold text-brand-gold mb-4">Consultation Hours</h3>
                        <ul className="space-y-3 text-sm text-brand-cream/70">
                            <li className="flex justify-between border-b border-brand-cream/10 pb-2">
                                <span>Monday - Friday</span>
                                <span>3:00 PM - 6:00 PM</span>
                            </li>
                            <li className="flex justify-between text-brand-rose">
                                <span>Sat and Sunday</span>
                                <span>3:00 PM - 9:00 PM</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-brand-cream/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-brand-cream/50 text-xs text-center md:text-left">
                        &copy; {currentYear} Dr. Farheen Homeopathy. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-brand-cream/50 hover:text-brand-gold text-xs transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-brand-cream/50 hover:text-brand-gold text-xs transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
