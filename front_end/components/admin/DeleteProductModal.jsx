"use client";

import axios from "axios";

export default function DeleteProductModal({ open, setOpen, productId }) {
  if (!open) return null;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${productId}`);

      setOpen(false);

      // temporary refresh (later we’ll replace with state update)
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      
      {/* Modal box */}
      <div className="w-[360px] rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">

        {/* Title */}
        <h2 className="text-lg font-semibold text-white">
          Delete Product
        </h2>

        {/* Message */}
        <p className="text-sm text-zinc-400 mt-2">
          Are you sure you want to delete this product? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}