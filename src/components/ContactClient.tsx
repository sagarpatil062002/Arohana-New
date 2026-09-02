"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Check, ArrowRight } from "lucide-react";
import { AROHANA_MASTER_CONTENT } from "@/data/content";

export default function ContactClient() {
  const { brand } = AROHANA_MASTER_CONTENT;
  const [submitted, setSubmitted] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 3000);
  };

  return (
    <div className="bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="sundown-glow-shape top-[15%] right-[-10%]" />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        
        {/* Section Indicator */}
        <div className="mb-12">
          <div className="section-indicator-line text-white/70">
            <span>CONTACT // DISCOVERY BRIEF</span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="max-w-4xl mb-16">
          <h1 className="font-display font-display-hero text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white mb-8">
            IF YOU'RE BUILDING SOMETHING SERIOUS,<br />
            LET'S TALK.
          </h1>
          <p className="text-lg md:text-xl text-[#BDBDBD] leading-relaxed font-sans">
            Don't start with a service. Start with the problem. Tell us what you are trying to build, fix or change.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#111116] border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl">
            <h2 className="font-display text-3xl uppercase tracking-wide text-white mb-6">
              START A CONVERSATION
            </h2>

            {submitted ? (
              <div className="p-8 bg-white/5 border border-emerald-500/30 text-center py-16 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl uppercase mb-2 text-white">BRIEF RECEIVED</h3>
                <p className="text-sm text-text-secondary font-sans max-w-md mx-auto mb-6">
                  Thank you. Your inquiry has been routed directly to founder@byarohana.com. We typically review and respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-mono text-[#FE320A] underline uppercase"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-text-muted uppercase mb-2">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-black/40 border border-white/20 p-3.5 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-[#FE320A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-text-muted uppercase mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@company.com"
                      className="w-full bg-black/40 border border-white/20 p-3.5 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-[#FE320A] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-text-muted uppercase mb-2">
                      PHONE / WHATSAPP
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98000 00000"
                      className="w-full bg-black/40 border border-white/20 p-3.5 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-[#FE320A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-text-muted uppercase mb-2">
                      PRIMARY SECTOR
                    </label>
                    <select
                      className="w-full bg-[#141419] border border-white/20 p-3.5 text-sm text-white focus:outline-none focus:border-[#FE320A] transition-colors"
                    >
                      <option value="Hospitality & F&B">Hospitality & F&B</option>
                      <option value="Real Estate & Built Environment">Real Estate & Built Environment</option>
                      <option value="Healthcare & Clinical">Healthcare & Medical Trust</option>
                      <option value="Lifestyle & Consumer Brands">Lifestyle & Consumer Brands</option>
                      <option value="Entertainment & Media">Entertainment & Media</option>
                      <option value="Tourin Ladakh Travel">Tourin Ladakh Experiential Travel</option>
                      <option value="Institutional / Armed Forces">Institutional / Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-text-muted uppercase mb-2">
                    TELL US ABOUT THE BUSINESS & WHAT YOU ARE LOOKING TO BUILD *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe the context, the core challenge, and what commercial or visual outcome you need..."
                    className="w-full bg-black/40 border border-white/20 p-3.5 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-[#FE320A] transition-colors resize-vertical"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    className="sundown-pill-btn bg-[#FE320A] border-[#FE320A] text-white py-3.5 px-8"
                  >
                    <span>Submit brief</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono text-text-muted">
                    DIRECT FOUNDER REVIEW WITHIN 24H
                  </span>
                </div>

              </form>
            )}
          </div>

          {/* Right Direct Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Founder Profile Box */}
            <div className="bg-[#111116] border border-white/10 p-8 rounded-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/30">
                  <Image
                    src="/assets/founder_madhura.jpg"
                    alt="Madhura Hawal"
                    fill
                    className="object-cover img-editorial"
                  />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>3 SPOTS AVAILABLE</span>
                </div>
              </div>

              <h3 className="font-display text-2xl uppercase text-white mb-1">
                MADHURA HAWAL
              </h3>
              <p className="text-xs font-mono text-text-muted uppercase mb-4">
                FOUNDER & STRATEGIC DIRECTOR
              </p>
              <p className="text-xs text-text-secondary font-sans leading-relaxed mb-6">
                Prefer a direct conversation? Connect directly to discuss high-stakes brand strategy, restaurant turnarounds, or project productions.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <button
                  onClick={() => copyToClipboard(brand.email, "Email")}
                  className="w-full p-3.5 bg-white/[0.03] border border-white/10 hover:border-white/40 flex items-center justify-between text-white transition-colors text-left"
                >
                  <span className="flex items-center gap-2 truncate">
                    <Mail className="w-4 h-4 text-[#FE320A] flex-shrink-0" />
                    {brand.email}
                  </span>
                  <span className="text-[10px] text-text-muted flex-shrink-0 ml-2">
                    {copiedText === "Email" ? "COPIED!" : "COPY"}
                  </span>
                </button>

                <button
                  onClick={() => copyToClipboard(brand.phone, "Phone")}
                  className="w-full p-3.5 bg-white/[0.03] border border-white/10 hover:border-white/40 flex items-center justify-between text-white transition-colors text-left"
                >
                  <span className="flex items-center gap-2 truncate">
                    <Phone className="w-4 h-4 text-[#FE320A] flex-shrink-0" />
                    {brand.phone}
                  </span>
                  <span className="text-[10px] text-text-muted flex-shrink-0 ml-2">
                    {copiedText === "Phone" ? "COPIED!" : "COPY"}
                  </span>
                </button>
              </div>
            </div>

            {/* Geographical Footprint */}
            <div className="bg-[#111116] border border-white/10 p-8 rounded-sm">
              <div className="flex items-center gap-2 text-xs font-mono text-text-muted uppercase mb-4">
                <MapPin className="w-4 h-4 text-[#FE320A]" />
                <span>PRIMARY OPERATING LOCATIONS</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm font-sans text-white/90">
                {brand.locations.map((loc, idx) => (
                  <div key={idx} className="p-2.5 bg-white/[0.02] border-l-2 border-[#FE320A]">
                    {loc.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
