"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import DeleteServiceModal from "./DeleteServiceModal";

export default function ServiceCard({ service, index }) {
  const [open, setOpen] = useState(false);

  return (
    <>
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
        {/* Image */}
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0">
          {service.image ? (
            <img
              src={`http://localhost:8000/storage/${service.image}`}
              alt={service.name}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">
              No Img
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{service.name}</h2>

          <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
            {service.description}
          </p>

          <div className="flex justify-between items-center mt-3">
            <span className="text-blue-400 font-medium text-base">
              ${service.price}
            </span>

            <span className="text-sm text-zinc-400">
              {service.duration} min
            </span>
          </div>
        </div>

        {/* Delete button */}
        <button
          onClick={() => setOpen(true)}
          className="text-sm px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
        >
          Delete
        </button>
      </motion.div>

      {/* Modal */}
      <DeleteServiceModal
        open={open}
        setOpen={setOpen}
        serviceId={service.id}
        serviceName={service.name}
      />
    </>
  );
}