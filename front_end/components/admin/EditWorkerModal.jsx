"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { workerSchema } from "@/validations/workerSchema";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Pencil } from "lucide-react";

export default function EditWorkerModal({
  open,
  setOpen,
  worker,
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Barber");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

  const [errors, setErrors] = useState({});

  // sync data when modal opens
  useEffect(() => {
    if (worker && open) {
      setName(worker.name || "");
      setRole(worker.role || "Barber");
      setPhone(worker.phone || "");
      setBio(worker.bio || "");
    }
  }, [worker, open]);
  
  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      name,
      role,
      phone,
      bio,
    };

    const result = workerSchema.safeParse(data);

    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    setErrors({});

    try {
      await axios.put(
        `http://localhost:8000/api/workers/${worker.id}`,
        result.data
      );

      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

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
            className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-zinc-900 p-7 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Pencil className="w-5 h-5 text-blue-400" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-white">
                  Edit worker
                </h2>
                <p className="text-sm text-zinc-400">
                  Update worker information
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdate} className="space-y-5">

              {/* Name */}
              <div>
                <label className="text-sm text-zinc-300">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 text-white"
                />
                {errors?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name._errors?.[0]}
                  </p>
                )}
              </div>

              {/* Role dropdown */}
              <div>
                <label className="text-sm text-zinc-300">Role</label>

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 text-white"
                >
                  <option value="Barber">Barber</option>
                  <option value="Manager">Manager</option>
                  <option value="Owner">Owner</option>
                </select>

                {errors?.role && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.role._errors?.[0]}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-zinc-300">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 text-white"
                />
                {errors?.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone._errors?.[0]}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="text-sm text-zinc-300">Bio</label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 text-white"
                />
                {errors?.bio && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bio._errors?.[0]}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                >
                  <Pencil className="w-4 h-4" />
                  Save changes
                </button>

              </div>

            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}