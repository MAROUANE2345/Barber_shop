"use client";

import { useState } from "react";
import axios from "axios";
import { workerSchema } from "@/validations/workerSchema";

export default function AddWorkerPage() {

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      role,
      phone,
      bio,
    };

    const result = workerSchema.safeParse(data);

    // ❌ validation failed
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    setErrors({});

    try {
      const validData = result.data;

      await axios.post("http://localhost:8000/api/workers", validData);

      // reset form (NO ALERTS)
      setName("");
      setRole("");
      setPhone("");
      setBio("");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-8">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Add Worker</h1>
        <p className="text-zinc-400 mt-2">
          Add a new barber or staff member
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg">

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* NAME */}
          <div>
            <label className="text-sm text-zinc-300">Full Name</label>
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

          {/* ROLE */}
          <div>
            <label className="text-sm text-zinc-300">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10"
            >
              <option value="">Select role</option>
              <option value="barber">Barber</option>
              <option value="manager">Manager</option>
              <option value="owner">Owner</option>
            </select>
            {errors?.role && (
              <p className="text-red-500 text-sm mt-1">
                {errors.role._errors?.[0]}
              </p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm text-zinc-300">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10"
            />
            {errors?.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone._errors?.[0]}
              </p>
            )}
          </div>

          {/* BIO */}
          <div>
            <label className="text-sm text-zinc-300">Bio</label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10"
            />
            {errors?.bio && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bio._errors?.[0]}
              </p>
            )}
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
              Create Worker
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}