"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

const ServiceCard = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/services");
        setServices(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div  >
      {services.map((service, index) => (
        <motion.div
          key={service.id}
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
            {service.image ? (
              <img
                src={`http://localhost:8000/storage/${service.image}`}
                alt={service.name}
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
              {service.name}
            </h3>

            <p className="text-zinc-300 mt-2 text-sm line-clamp-3">
              {service.description}
            </p>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-white">
                  ${service.price}
                </span>

                <span className="text-sm text-[#D4AF37]">
                  {service.duration} min
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
                <CalendarDays size={18} />
                Make a Reservation
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceCard;