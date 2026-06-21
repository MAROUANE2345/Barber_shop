"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const ProductCard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/products");
        setProducts(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div  >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.1,
            delay: index * 0.08,
            ease: "easeOut",
          }}
          className="
            group
            relative
            w-full
            aspect-square
            overflow-hidden
            rounded-3xl
            bg-zinc-950
            border border-[#D4AF37]/20
            hover:border-[#D4AF37]/60
            transition-all duration-500
          "
        >
          {/* IMAGE */}
          <div className="absolute inset-0">
            {product.image ? (
              <img
                src={`http://localhost:8000/storage/${product.image}`}
                alt={product.name}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-110
                "
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-600">
                No Image
              </div>
            )}

            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* CONTENT */}
          <div className="relative z-10 h-full flex flex-col p-6">
            <h3 className="text-xl font-bold text-[#D4AF37]">
              {product.name}
            </h3>

            <p className="text-zinc-300 mt-2 text-sm line-clamp-3">
              {product.objective}
            </p>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-white">
                  ${product.price}
                </span>

                <span className="text-sm text-[#D4AF37]">
                  In Stock: {product.quantity ?? 0}
                </span>
              </div>

              <button
                className="
                  w-full
                  py-3
                  rounded-xl
                  bg-[#D4AF37]
                  text-black
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:bg-[#E6C65C]
                  transition
                  active:scale-95
                "
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductCard;