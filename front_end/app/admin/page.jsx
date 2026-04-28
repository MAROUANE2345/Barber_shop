"use client";

import { Package, Plus, Settings, Scissors, Users } from "lucide-react";
import AdminMainCard from "@/components/admin/AdminMainCard";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-8">
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-wide">
          Barber Dashboard
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage your shop, services and team
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <AdminMainCard
          title="Products"
          icon={Package}
          managePath="/admin/products"
          addPath="/admin/products/add"
          manageIcon={Settings}
          addIcon={Plus}
        />

        <AdminMainCard
          title="Services"
          icon={Scissors}
          managePath="/admin/services"
          addPath="/admin/services/add"
          manageIcon={Settings}
          addIcon={Plus}
        />

        <AdminMainCard
          title="Workers"
          icon={Users}
          managePath="/admin/workers"
          addPath="/admin/workers/add"
          manageIcon={Settings}
          addIcon={Plus}
        />

      </div>

      {/* Optional subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl top-10 left-10" />
        <div className="absolute w-72 h-72 bg-purple-500/10 rounded-full blur-3xl bottom-10 right-10" />
      </div>
    </div>
  );
}