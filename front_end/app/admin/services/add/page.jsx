"use client";

import { useState } from "react";
import axios from "axios";

export default function AddServicePage() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("duration", duration);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.post("http://localhost:8000/api/services", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Service created successfully");

      // reset
      setName("");
      setDescription("");
      setPrice("");
      setDuration("");
      setImageFile(null);

    } catch (error) {
      console.log(error);
      alert("Error creating service");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-8">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Add Service</h1>
        <p className="text-zinc-400 mt-2">
          Create a new service for your barber shop
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg">

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label className="text-sm text-zinc-300">Service Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Beard Trim"
              className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-zinc-300">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the service..."
              className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Price + Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-zinc-300">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-300">Duration (minutes)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="30"
                className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-green-500"
              />
            </div>

          </div>

          {/* Image */}
          <div>
            <label className="text-sm text-zinc-300">Image</label>
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10"
            />
          </div>

          {/* Buttons */}
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
              Create Service
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}