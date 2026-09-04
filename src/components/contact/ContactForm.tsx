'use client';

import React, { useState } from 'react';
import FroxenButton from '@/components/ui/FroxenButton';

const SERVICE_OPTIONS = [
  'Digital Brand Growth',
  'Hospitality Consulting',
  'Content & Brand Production',
  'Tourin Experience',
  'Complex / Special Brief',
  'Other Advisory',
];

export function ContactForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>(['Digital Brand Growth']);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleService = (svc: string) => {
    if (selectedServices.includes(svc)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== svc));
      }
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0e0e11] border border-froxen-lime/40 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-froxen-lime text-black font-bold flex items-center justify-center mx-auto text-xl">
          ✓
        </div>
        <h3 className="font-display font-black text-3xl uppercase text-white tracking-tight">
          Conversation Initiated
        </h3>
        <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. Madhura and the Ārohana team review every brief personally and will be in touch within 24–48 hours.
        </p>
        <div className="pt-4">
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', phone: '', company: '', message: '' });
            }}
            className="text-xs font-mono uppercase tracking-widest text-froxen-lime hover:underline"
          >
            Send Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Capability Selector */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
          I'M INTERESTED IN (SELECT ALL THAT APPLY)
        </label>
        <div className="flex flex-wrap gap-2">
          {SERVICE_OPTIONS.map((svc) => {
            const isSelected = selectedServices.includes(svc);
            return (
              <button
                key={svc}
                type="button"
                onClick={() => toggleService(svc)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-froxen-lime text-black font-semibold'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                {svc}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Rahul Mehta"
            className="w-full px-4 py-3 rounded-xl bg-[#0e0e11] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-froxen-lime text-sm transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. rahul@company.com"
            className="w-full px-4 py-3 rounded-xl bg-[#0e0e11] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-froxen-lime text-sm transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            Phone / WhatsApp *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98000 00000"
            className="w-full px-4 py-3 rounded-xl bg-[#0e0e11] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-froxen-lime text-sm transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            Company / Brand Name
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="e.g. Horizon Hospitality"
            className="w-full px-4 py-3 rounded-xl bg-[#0e0e11] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-froxen-lime text-sm transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
          What are you trying to build, fix or scale? *
        </label>
        <textarea
          rows={5}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about the business context, current stage, and specific goals..."
          className="w-full px-4 py-3 rounded-xl bg-[#0e0e11] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-froxen-lime text-sm transition-colors resize-none"
        />
      </div>

      <div>
        <FroxenButton type="submit" variant="lime" className="w-full sm:w-auto px-10 py-4">
          {loading ? 'Sending Details...' : 'Start a Conversation'}
        </FroxenButton>
      </div>
    </form>
  );
}

export default ContactForm;
