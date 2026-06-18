"use client";

import React from 'react';
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
const ExitAdmin = () => {
     
    const router = useRouter();
     const handleExitAdmin = () => {
    router.push("/");
  };
    return (
        <div>
               {/* Exit admin */}
        <button
          onClick={handleExitAdmin}
          className="flex items-center gap-2 px-5 py-3 rounded-xl
          bg-white/5 border border-white/10
          hover:bg-red-500/10 hover:border-red-500/20
          text-zinc-300 hover:text-red-400
          transition-all duration-300"
        >
          <LogOut size={18} />
          <span className="font-medium">
            Exit Admin
          </span>
        </button>
        </div>
    );
}

export default ExitAdmin;
