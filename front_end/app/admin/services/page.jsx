"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "@/components/admin/ServiceCard";

const Page = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-8">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-wide">
          Services
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage your barber shop services
        </p>
      </div>

      {/* Services Grid */}
      {services.length === 0 ? (
        <p className="text-zinc-500">No services found...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Page;