"use client";

export default function AddWorkerPage() {
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

        <form className="space-y-6">

          {/* Name */}
          <div>
            <label className="text-sm text-zinc-300">Full Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-zinc-300">Role</label>
            <select className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500">
              <option value="">Select role</option>
              <option value="barber">Barber</option>
              <option value="manager">Manager</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-zinc-300">Phone</label>
            <input
              type="text"
              placeholder="+212 6..."
              className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm text-zinc-300">Bio</label>
            <textarea
              rows={4}
              placeholder="Short description about the worker..."
              className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
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
              Create Worker
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}