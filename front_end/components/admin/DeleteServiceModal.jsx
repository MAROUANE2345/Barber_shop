"use client";

import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Trash2 } from "lucide-react";

export default function DeleteServiceModal({
  open,
  setOpen,
  serviceId,
  serviceName,
}) {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/services/${serviceId}`
      );
      setOpen(false);
      window.location.reload(); // same behavior as product for now
    } catch (error) {
      console.log(error);
    }
  };

  // safety for Next.js
  if (typeof window === "undefined") return null;

  const modal = (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          
          {/* Blur backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-900 p-7 shadow-2xl"
          >
            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">
                  Delete service
                </h2>
                <p className="text-sm text-zinc-400">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            {/* Warning */}
            <div className="rounded-xl bg-red-500/5 border border-red-500/20 px-4 py-3 mb-6">
              <p className="text-sm text-red-300 leading-relaxed">
                <span className="font-medium text-red-400">
                  {serviceName ?? "This service"}
                </span>{" "}
                will be permanently removed.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-xl text-sm bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-red-600 hover:bg-red-700 text-white font-medium transition"
              >
                <Trash2 className="w-4 h-4" />
                Delete service
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}