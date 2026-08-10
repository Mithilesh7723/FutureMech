"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { FadeInView } from "@/components/animations/FadeInView";
import { SITE } from "@/lib/constants";
import { Send, Phone, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BookingForm() {
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    vehicle: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Submission failed");
      setShowModal(true);
      setFormData({ name: "", phone: "", email: "", service: "", vehicle: "", message: "" });
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showModal]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="book" className="relative section-padding bg-section-ivory overflow-hidden scroll-mt-[72px]">
      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeInView>
            <div>
              <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze">
                Book Your Appointment
              </p>
              <h2 className="mb-5 font-serif text-[2rem] leading-[1.15] text-ink sm:text-[2.5rem]">
                Battery Regeneration
                <br />
                Health Check
              </h2>
              <p className="mb-8 max-w-[400px] text-[1rem] leading-[1.7] text-stone">
                Get a comprehensive diagnostic report with honest
                recommendations. Restore performance — or know exactly when to replace.
              </p>

              <div className="space-y-4">
                {[
                  "14-point battery diagnostic inspection",
                  "Digital health report delivered to your inbox",
                  "Regeneration assessment — restore before replacing",
                  "Zero obligation — completely free for new customers",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sage-light">
                      <svg className="h-3 w-3 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[0.9375rem] text-graphite">{text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-parchment pt-6 sm:flex-row sm:items-center sm:gap-5">
                <div className="flex items-center gap-2 text-[0.8125rem] text-stone">
                  <Phone size={13} />
                  {SITE.phone}
                </div>
                <div className="flex items-center gap-2 text-[0.8125rem] text-stone">
                  <Calendar size={13} />
                  Same-day appointments
                </div>
              </div>
            </div>
          </FadeInView>

          <FadeInView delay={0.12}>
            <form
              onSubmit={handleSubmit}
              className="card-solid p-6 sm:p-7"
            >
              <h3 className="mb-5 text-[1.125rem] font-semibold text-ink">
                Request an Appointment
              </h3>

              <div className="space-y-3.5">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-[0.75rem] font-medium text-graphite">
                    Full Name
                  </label>
                  <input
                    type="text" id="name" name="name" required
                    value={formData.name} onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-parchment bg-white-pure px-4 py-2.5 text-[0.875rem] text-ink placeholder:text-sand focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/10"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-[0.75rem] font-medium text-graphite">
                      Phone Number
                    </label>
                    <input
                      type="tel" id="phone" name="phone" required
                      value={formData.phone} onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-parchment bg-white-pure px-4 py-2.5 text-[0.875rem] text-ink placeholder:text-sand focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/10"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-[0.75rem] font-medium text-graphite">
                      Email
                    </label>
                    <input
                      type="email" id="email" name="email"
                      value={formData.email} onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-parchment bg-white-pure px-4 py-2.5 text-[0.875rem] text-ink placeholder:text-sand focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="service" className="mb-1.5 block text-[0.75rem] font-medium text-graphite">
                      Service Needed
                    </label>
                    <select
                      id="service" name="service" required
                      value={formData.service} onChange={handleChange}
                      className="w-full rounded-xl border border-parchment bg-white-pure px-4 py-2.5 text-[0.875rem] text-ink focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/10"
                    >
                      <option value="">Select a service</option>
                      <option value="battery-regeneration">Battery Regeneration (Restore Performance)</option>
                      <option value="battery-health-check">Free Battery Health Check</option>
                      <option value="battery-diagnostics">Battery Diagnostics</option>
                      <option value="car-service">Car Service</option>
                      <option value="doorstep-service">Doorstep Service</option>
                      <option value="fleet-maintenance">Fleet Maintenance</option>
                      <option value="pdi">Pre-Delivery Inspection</option>
                      <option value="other">Other / Not Sure</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="vehicle" className="mb-1.5 block text-[0.75rem] font-medium text-graphite">
                      Vehicle Details
                    </label>
                    <input
                      type="text" id="vehicle" name="vehicle"
                      value={formData.vehicle} onChange={handleChange}
                      placeholder="e.g. Maruti Swift 2022"
                      className="w-full rounded-xl border border-parchment bg-white-pure px-4 py-2.5 text-[0.875rem] text-ink placeholder:text-sand focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-[0.75rem] font-medium text-graphite">
                    Additional Details
                  </label>
                  <textarea
                    id="message" name="message" rows={3}
                    value={formData.message} onChange={handleChange}
                    placeholder="Describe the issue or any concerns..."
                    className="w-full resize-none rounded-xl border border-parchment bg-white-pure px-4 py-2.5 text-[0.875rem] text-ink placeholder:text-sand focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-[0.875rem] font-semibold text-white-pure transition-all duration-200 hover:bg-graphite active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} />
                {submitting ? "Submitting..." : "Book Free Battery Check"}
              </button>

              {submitError && (
                <p className="mt-2 text-center text-[0.75rem] text-terracotta">
                  {submitError}
                </p>
              )}

              <p className="mt-3 text-center text-[0.6875rem] text-stone">
                Free for new customers. We&apos;ll confirm within a few hours.
              </p>
            </form>
          </FadeInView>
        </div>
      </Container>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 px-4 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[420px] rounded-2xl bg-white-pure p-8 text-center shadow-[0_25px_60px_rgba(0,0,0,0.2)]"
            >
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-stone transition-colors hover:bg-linen hover:text-ink"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>

              {/* Checkmark */}
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sage-light">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5B8A5F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>

              <h2 className="mb-2 font-serif text-[1.5rem] text-ink">
                Request Received!
              </h2>
              <p className="mb-1 text-[0.9375rem] font-medium text-graphite">
                Thank you, {formData.name || "there"}!
              </p>
              <p className="text-[0.875rem] leading-[1.7] text-stone">
                Your appointment request has been received. Our team will connect with you shortly to confirm your booking. Check your phone for a confirmation message.
              </p>

              <button
                onClick={() => setShowModal(false)}
                className="mt-6 w-full rounded-xl bg-ink px-6 py-3 text-[0.875rem] font-semibold text-white-pure transition-all duration-200 hover:bg-graphite"
              >
                Got it
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[0.75rem] text-stone">
                <Phone size={12} />
                {SITE.phone}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
