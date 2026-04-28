"use client";

import { useRouter } from "next/navigation";

export default function AdminMainCard({
  title,
  icon: Icon,
  managePath,
  addPath,
  manageIcon: ManageIcon,
  addIcon: AddIcon,
}) {
  const router = useRouter();

  return (
    <div className="group relative h-44 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 text-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />

      {/* Default view */}
      <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 group-hover:-translate-y-full">
        
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl mb-3 border border-white/10">
          <Icon size={32} className="text-blue-400" />
        </div>

        <h2 className="text-lg font-semibold tracking-wide">
          {title}
        </h2>
      </div>

      {/* Hover view */}
      <div className="absolute inset-0 flex translate-y-full group-hover:translate-y-0 transition-all duration-300">
        
        {/* Manage */}
        <div
          onClick={() => router.push(managePath)}
          className="w-1/2 flex flex-col items-center justify-center border-r border-white/10 bg-white/5 hover:bg-white/10 transition cursor-pointer"
        >
          <ManageIcon size={26} className="mb-2 text-blue-400" />
          <span className="text-sm font-medium">Manage</span>
        </div>

        {/* Add */}
        <div
          onClick={() => router.push(addPath)}
          className="w-1/2 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition cursor-pointer"
        >
          <AddIcon size={26} className="mb-2 text-green-400" />
          <span className="text-sm font-medium">Add</span>
        </div>
      </div>
    </div>
  );
}