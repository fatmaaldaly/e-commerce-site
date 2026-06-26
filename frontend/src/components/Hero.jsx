import React from "react";
import heroimg from "../assets/heroimg.png";

export default function Hero() {
  return (
    <section className="w-full min-h-[70vh] relative flex items-center justify-center overflow-hidden">
      <img src={heroimg} className="absolute inset-0 w-full h-full object-cover opacity-90 scale-[1.03] transition-transform duration-700" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 text-center">
        <div className="bg-white/60 backdrop-blur rounded-3xl px-8 py-12 sm:px-12 sm:py-16 shadow-xl border border-rose-50">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-rose-800 mb-4 opacity-100 transition-opacity duration-700">Luxury skincare & makeup</h1>
          <p className="text-rose-700/90 text-lg sm:text-xl mb-6">Curated essentials for radiant skin and timeless beauty.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="/shop" className="inline-block rounded-full px-6 py-3 bg-gradient-to-r from-rose-100 to-amber-50 text-rose-900 font-semibold shadow-md hover:scale-105 transition">Shop Now</a>
            {/* <a href="/shop" className="inline-block rounded-full px-6 py-3 border border-rose-200 text-rose-800 bg-white/60 hover:bg-white transition">Learn More</a> */}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent pointer-events-none" />
    </section>
  );
}