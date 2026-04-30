"use client";

import { useState } from "react";
import axios from "axios";
import { productSchema } from "@/validations/productSchema";

export default function AddProductPage() {

  const [name, setName] = useState("");
  const [objective, setObjective] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
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

    // ❌ validation failed
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

      if (validData.image) {
        formData.append("image", validData.image);
      }

      await axios.post("http://localhost:8000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // reset form (NO ALERTS)
      setName("");
      setObjective("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setImageFile(null);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-8">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Add Product</h1>
        <p className="text-zinc-400 mt-2">
          Create a new product for your barber shop inventory
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg">
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* NAME */}
          <div>
            <label className="text-sm text-zinc-300">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10"
            />
            {errors?.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name._errors?.[0]}
              </p>
            )}
          </div>

          {/* OBJECTIVE */}
          <div>
            <label className="text-sm text-zinc-300">Objective</label>
            <input
              type="text"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10"
            />
            {errors?.objective && (
              <p className="text-red-500 text-sm mt-1">
                {errors.objective._errors?.[0]}
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm text-zinc-300">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10"
            />
            {errors?.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description._errors?.[0]}
              </p>
            )}
          </div>

          {/* PRICE + QUANTITY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-zinc-300">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10"
              />
              {errors?.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price._errors?.[0]}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm text-zinc-300">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10"
              />
              {errors?.quantity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.quantity._errors?.[0]}
                </p>
              )}
            </div>

          </div>

          {/* IMAGE */}
          <div>
            <label className="text-sm text-zinc-300">Image</label>
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">

            <button
              type="button"
              className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-medium"
            >
              Create Product
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}