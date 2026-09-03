"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface ContactFormProps {
  defaultService?: string;
}

export default function ContactForm({ defaultService }: ContactFormProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    defaultService ? [defaultService] : ["Digital Brand Growth"]
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const availableServices = [
    "Digital Brand Growth",
    "Hospitality Consulting",
    "Content & Brand Production",
    "Defence & Special Documentation",
    "Tourin Experiential Journeys"
  ];

  const toggleService = (svc: string) => {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  if (isSuccess) {
    return (
      <div className="p-8 sm:p-12 rounded-sm bg-[#101622] border border-[#C5A46D]/30 text-center space-y-4 max-w-xl mx-auto">
        <div className="w-14 h-14 rounded-full bg-[#C5A46D]/20 text-[#C5A46D] mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-clash text-2xl font-bold uppercase tracking-tight text-white">
          Inquiry Dispatched
        </h3>
        <p className="text-sm text-[#8A919D] leading-relaxed">
          Thank you for reaching out, {name || "there"}. We will review your requirements and respond within 24 hours.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setName("");
            setEmail("");
            setPhone("");
            setCompany("");
            setMessage("");
          }}
          className="mt-4 px-6 py-2.5 rounded-full border border-white/20 text-xs font-mono uppercase tracking-wider text-white hover:border-[#C5A46D] hover:text-[#C5A46D] transition-colors"
        >
          Send Another Note
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto text-left">
      {/* Services Selection */}
      <div className="space-y-2.5">
        <label className="block font-mono text-[11px] text-[#8A919D] uppercase tracking-[0.16em]">
          I&apos;M INTERESTED IN
        </label>
        <div className="flex flex-wrap gap-2">
          {availableServices.map((svc) => {
            const isChecked = selectedServices.includes(svc);
            return (
              <button
                type="button"
                key={svc}
                onClick={() => toggleService(svc)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all border ${
                  isChecked
                    ? "bg-[#C5A46D] text-[#0A0F14] border-[#C5A46D] font-bold"
                    : "bg-[#0D1524] text-[#8A919D] border-white/10 hover:border-[#C5A46D]/40 hover:text-white"
                }`}
              >
                {svc}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block font-mono text-[11px] text-[#8A919D] uppercase tracking-wider">
            YOUR NAME *
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sagar Patil"
            className="w-full px-4 py-3 rounded-sm bg-[#0D1524] border border-white/15 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#C5A46D] transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block font-mono text-[11px] text-[#8A919D] uppercase tracking-wider">
            EMAIL ADDRESS *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full px-4 py-3 rounded-sm bg-[#0D1524] border border-white/15 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#C5A46D] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="phone" className="block font-mono text-[11px] text-[#8A919D] uppercase tracking-wider">
            PHONE NUMBER
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 rounded-sm bg-[#0D1524] border border-white/15 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#C5A46D] transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="company" className="block font-mono text-[11px] text-[#8A919D] uppercase tracking-wider">
            COMPANY / BRAND
          </label>
          <input
            id="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enterprise or Venture Name"
            className="w-full px-4 py-3 rounded-sm bg-[#0D1524] border border-white/15 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#C5A46D] transition-colors"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="block font-mono text-[11px] text-[#8A919D] uppercase tracking-wider">
          TELL US MORE ABOUT THE CHALLENGE
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe what you are trying to build, fix or change..."
          className="w-full px-4 py-3 rounded-sm bg-[#0D1524] border border-white/15 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#C5A46D] transition-colors resize-none"
        />
      </div>

      {/* Submit Button matching Screen 09 SEND ENQUIRY */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-solid group disabled:opacity-50"
        >
          <span>{isSubmitting ? "SENDING ENQUIRY..." : "SEND ENQUIRY"}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </form>
  );
}

