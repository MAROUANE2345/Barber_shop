"use client";

import { motion } from "framer-motion";

export default function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // 👈 was 80 → now smooth
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.15, // 👈 smoother stagger
        ease: "easeOut",
      }}
      className="group relative h-52 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 text-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      
      {/* Image */}
      {product.image && (
        <img
          src={`http://localhost:8000/storage/${product.image}`}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />

      {/* Content */}
      <div className="relative p-5 h-full flex flex-col justify-between">

        {/* Top */}
        <div>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
            {product.objective}
          </p>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center">
          <span className="text-blue-400 font-medium">
            ${product.price}
          </span>

          <span className="text-xs text-zinc-400">
            Qty: {product.quantity ?? 0}
          </span>
        </div>

      </div>
    </motion.div>
  );
}