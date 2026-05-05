"use client";

import { motion } from "framer-motion";

export default function WorkerCard({ worker, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="group flex items-center gap-5 p-5 rounded-2xl bg-zinc-900 text-white shadow-lg hover:shadow-2xl transition border border-zinc-800"
    >
      {/* Content */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{worker.name}</h2>

        <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
          {worker.bio || "No bio available"}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-blue-400 font-medium text-base">
            {worker.role}
          </span>

          <span className="text-sm text-zinc-400">
            {worker.phone}
          </span>
        </div>
      </div>
    </motion.div>
  );
}