"use client";


import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackToDashboardButton() {
  const router = useRouter();

   const pathname = usePathname();

  // Hide on dashboard page
  if (pathname === "/admin") {
    return null;
  }
  return (
    <button
      onClick={() => router.push("/admin")}
      className="
        flex items-center gap-2
        px-5 py-3
        rounded-xl
        bg-white/5
        border border-white/10
        text-white
        hover:bg-white/10
        hover:border-white/20
        transition-all duration-300
      "
    >
      <ArrowLeft size={18} />
      <span className="font-medium">
        Dashboard
      </span>
    </button>
  );
}