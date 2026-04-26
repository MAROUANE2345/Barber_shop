"use client";

import { Package, Scissors, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const cards = [
    {
      title: "Products",
      icon: Package,
      path: "/admin/products",
    },
    {
      title: "Services",
      icon: Scissors,
      path: "/admin/services",
    },
    {
      title: "Workers",
      icon: Users,
      path: "/admin/workers",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              onClick={() => router.push(card.path)}
              className="cursor-pointer bg-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 hover:scale-105"
            >
              <Icon size={50} className="mb-4 text-gray-700" />

              <h2 className="text-xl font-semibold">
                {card.title}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}