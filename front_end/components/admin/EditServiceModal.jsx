"use client";

import { useState } from "react";
import axios from "axios";
import { serviceSchema } from "@/validations/serviceSchema";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Pencil } from "lucide-react";

export default function EditServiceModal({
  open,
  setOpen,
  service,
}) {
  const [name, setName] = useState(service.name);
  const [description, setDescription] = useState(service.description);
  const [price, setPrice] = useState(service.price);
  const [duration, setDuration] = useState(service.duration);
  const [imageFile, setImageFile] = useState(null);

  const [errors, setErrors] = useState({});

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      name,
      description,
      price,
      duration,
      image: imageFile,
    };

    const result = serviceSchema.safeParse(data);

    // validation failed
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    // clear errors
    setErrors({});

    try {
      const validData = result.data;

      const formData = new FormData();

      formData.append("name", validData.name);
      formData.append("description", validData.description);
      formData.append("price", validData.price);
      formData.append("duration", validData.duration);

      // Laravel PUT with formData
      formData.append("_method", "PUT");

      if (validData.image) {
        formData.append("image", validData.image);
      }

      await axios.post(
        `http://localhost:8000/api/services/${service.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
                  Edit service
                </h2>

                <p className="text-sm text-zinc-400">
                  Update your service information
                </p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleUpdate}
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label className="text-sm text-zinc-300">
                  Service Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                />

                {errors?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name._errors?.[0]}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-zinc-300">
                  Description
                </label>

                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                />

                {errors?.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description._errors?.[0]}
                  </p>
                )}
              </div>

              {/* Price + Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Price */}
                <div>
                  <label className="text-sm text-zinc-300">
                    Price
                  </label>

                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-green-500"
                  />

                  {errors?.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.price._errors?.[0]}
                    </p>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <label className="text-sm text-zinc-300">
                    Duration
                  </label>

                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-green-500"
                  />

                  {errors?.duration && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.duration._errors?.[0]}
                    </p>
                  )}
                </div>

              </div>

              {/* Image */}
              <div>
                <label className="text-sm text-zinc-300">
                  New Image
                </label>

                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 text-white"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
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