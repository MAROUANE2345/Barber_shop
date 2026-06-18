"use client";

import { useRouter, usePathname } from "next/navigation";
import { Plus, Settings } from "lucide-react";

export default function AdminActionButton() {
  const router = useRouter();
  const pathname = usePathname();

  let label = "";
  let target = "";
  let Icon = Plus;

  // Products
  if (pathname === "/admin/products") {
    label = "Add Product";
    target = "/admin/products/add";
    Icon = Plus;
  } else if (pathname === "/admin/products/add") {
    label = "Manage Products";
    target = "/admin/products";
    Icon = Settings;
  }

  // Services
  else if (pathname === "/admin/services") {
    label = "Add Service";
    target = "/admin/services/add";
    Icon = Plus;
  } else if (pathname === "/admin/services/add") {
    label = "Manage Services";
    target = "/admin/services";
    Icon = Settings;
  }

  // Workers
  else if (pathname === "/admin/workers") {
    label = "Add Worker";
    target = "/admin/workers/add";
    Icon = Plus;
  } else if (pathname === "/admin/workers/add") {
    label = "Manage Workers";
    target = "/admin/workers";
    Icon = Settings;
  }

  // Don't render on unknown routes
  if (!target) return null;

  return (
    <button
      onClick={() => router.push(target)}
      className="
        flex items-center gap-2
        px-5 py-3
        rounded-xl
        bg-white/5
        border border-white/10
        hover:bg-blue-500/10
        hover:border-blue-500/20
        transition-all duration-300
      "
    >
      <Icon size={18} />
      <span className="font-medium">
        {label}
      </span>
    </button>
  );
}