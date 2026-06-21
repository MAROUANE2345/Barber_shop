"use client";

import ProductCard from "@/components/shop/ProductCard";
import ServiceCard from "@/components/shop/ServiceCard";
import { useState } from "react";

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Hero */}
      <div className="pt-20 pb-12 px-6 text-center">
        <h1 className="text-5xl font-bold tracking-wider text-[#D4AF37]">
          Barber Collection
        </h1>

        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
          Discover our premium grooming products and professional barber services.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center px-6 mb-16">
        <div className="flex bg-zinc-950 border border-[#D4AF37]/30 rounded-2xl p-1">
          
          <button
            onClick={() => setActiveTab("products")}
            className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === "products"
                ? "bg-[#D4AF37] text-black shadow-lg"
                : "bg-transparent text-[#D4AF37] hover:bg-[#D4AF37]/10"
            }`}
          >
            Products
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === "services"
                ? "bg-[#D4AF37] text-black shadow-lg"
                : "bg-transparent text-[#D4AF37] hover:bg-[#D4AF37]/10"
            }`}
          >
            Services
          </button>

        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        
        {activeTab === "products" && (
          <div>
            {/* Products component goes here */}
            <h2 className="text-2xl font-semibold text-[#D4AF37] mb-6">
              Products
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProductCard />
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div>
            {/* Services component goes here */}
            <h2 className="text-2xl font-semibold text-[#D4AF37] mb-6">
              Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ServiceCard />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}