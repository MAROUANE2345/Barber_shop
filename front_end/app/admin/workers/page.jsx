"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import WorkerCard from "@/components/admin/WorkerCard";

const Page = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/workers");
        setWorkers(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWorkers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-8">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-wide">
          Workers
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage your barber shop team
        </p>
      </div>

      {/* Workers Grid */}
      {workers.length === 0 ? (
        <p className="text-zinc-500">No workers found...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {workers.map((worker, index) => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              index={index}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Page;