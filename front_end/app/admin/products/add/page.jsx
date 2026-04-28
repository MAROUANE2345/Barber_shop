"use client";

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-8">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Add Product</h1>
        <p className="text-zinc-400 mt-2">
          Create a new product for your barber shop inventory
        </p>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg">
        
        <form className="space-y-6">
          
          {/* Name */}
          <div>
            <label className="text-sm text-zinc-300">Product Name</label>
            <input
              type="text"
              placeholder="e.g. Hair Wax"
              className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Objective */}
          <div>
            <label className="text-sm text-zinc-300">Objective</label>
            <input
              type="text"
              placeholder="e.g. Styling hair with strong hold"
              className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-zinc-300">Description</label>
            <textarea
              rows={4}
              placeholder="Write product details..."
              className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Price + Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label className="text-sm text-zinc-300">Price</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-300">Quantity</label>
              <input
                type="number"
                placeholder="0"
                className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-green-500"
              />
            </div>

          </div>

          {/* Image */}
          <div>
            <label className="text-sm text-zinc-300">Image</label>
            <input
              type="file"
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
              Create Product
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}