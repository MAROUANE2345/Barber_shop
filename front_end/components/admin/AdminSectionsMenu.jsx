"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, Package, Scissors, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSectionsMenu() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

   const pathname = usePathname();

  // Hide on dashboard page
  if (pathname === "/admin") {
    return null;
  }
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const sections = [
    {
      name: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Services",
      path: "/admin/services",
      icon: Scissors,
    },
    {
      name: "Workers",
      path: "/admin/workers",
      icon: Users,
    },
  ];

  const currentSection = sections.find((section) =>
    pathname.startsWith(section.path)
  );

  const availableSections = sections.filter(
    (section) => section.path !== currentSection?.path
  );

  return (
    <div className="relative" ref={menuRef}>
      {/* Burger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center justify-center
          w-12 h-12
          rounded-xl
          bg-white/5
          border border-white/10
          text-white
          hover:bg-white/10
          hover:border-white/20
          transition-all duration-300
        "
      >
        <Menu size={20} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.95,
            }}
            transition={{
              duration: 0.18,
              ease: "easeOut",
            }}
            className="
              absolute
              top-14
              right-0
              w-56
              rounded-2xl
              border border-white/10
              bg-zinc-900/95
              backdrop-blur-md
              shadow-2xl
              overflow-hidden
            "
          >
            <div className="p-2">
              {availableSections.map((section) => {
                const Icon = section.icon;

                return (
                  <button
                    key={section.path}
                    onClick={() => {
                      router.push(section.path);
                      setOpen(false);
                    }}
                    className="
                      w-full
                      flex items-center gap-3
                      px-4 py-3
                      rounded-xl
                      text-left
                      text-white
                      hover:bg-white/5
                      transition
                    "
                  >
                    <Icon
                      size={18}
                      className="text-blue-400"
                    />

                    <span className="font-medium">
                      {section.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}