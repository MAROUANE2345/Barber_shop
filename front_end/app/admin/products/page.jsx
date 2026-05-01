"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/admin/ProductCard";

const Page = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-8">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-wide">
          Products
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage your barber shop products
        </p>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <p className="text-zinc-500">No products found...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Page;