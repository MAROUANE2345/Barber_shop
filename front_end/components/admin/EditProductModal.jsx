"use client";

import { useState } from "react";
import axios from "axios";
import { productSchema } from "@/validations/productSchema";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Pencil } from "lucide-react";

export default function EditProductModal({
  open,
  setOpen,
  product,
}) {
  const [name, setName] = useState(product.name);
  const [objective, setObjective] = useState(product.objective);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [imageFile, setImageFile] = useState(null);

  const [errors, setErrors] = useState({});

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      name,
      objective,
      description,
      price,
      quantity,
      image: imageFile,
    };

    const result = productSchema.safeParse(data);

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
      formData.append("objective", validData.objective);
      formData.append("description", validData.description);
      formData.append("price", validData.price);
      formData.append("quantity", validData.quantity);

      // Laravel PUT with formData
      formData.append("_method", "PUT");

      if (validData.image) {
        formData.append("image", validData.image);
      }

      await axios.post(
        `http://localhost:8000/api/products/${product.id}`,
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
                  Edit product
                </h2>

                <p className="text-sm text-zinc-400">
                  Update your product information
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
                  Product Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-2 p-3 rounded-xl bg-black/40 text-white border border-white/10 focus:outline-none focus:border-blue-500"
                />

                {errors?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name._errors?.[0]}
                  </p>
                )}
              </div>

              {/* Objective */}
              <div>
                <label className="text-sm text-zinc-300">
                  Objective
                </label>

                <input
                  type="text"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full mt-2 p-3 rounded-xl bg-black/40 text-white border border-white/10 focus:outline-none focus:border-blue-500"
                />

                {errors?.objective && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.objective._errors?.[0]}
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
                  className="w-full mt-2 p-3 rounded-xl bg-black/40 text-white border border-white/10 focus:outline-none focus:border-blue-500"
                />

                {errors?.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description._errors?.[0]}
                  </p>
                )}
              </div>

              {/* Price + Quantity */}
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
                    className="w-full mt-2 p-3 rounded-xl bg-black/40 text-white border border-white/10 focus:outline-none focus:border-green-500"
                  />

                  {errors?.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.price._errors?.[0]}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-sm text-zinc-300">
                    Quantity
                  </label>

                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full mt-2 p-3 rounded-xl bg-black/40 text-white border border-white/10 focus:outline-none focus:border-green-500"
                  />

                  {errors?.quantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.quantity._errors?.[0]}
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
                  className="w-full mt-2 p-3 rounded-xl bg-black/40 text-white border border-white/10"
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