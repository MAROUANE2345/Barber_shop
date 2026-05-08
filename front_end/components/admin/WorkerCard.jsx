"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import DeleteWorkerModal from "./DeleteWorkerModal";
import EditWorkerModal from "./EditWorkerModal";

export default function WorkerCard({ worker, index }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: index * 0.1,
          ease: "easeOut",
        }}
        className="group flex items-center gap-5 p-5 rounded-2xl bg-zinc-900 text-white shadow-lg hover:shadow-2xl transition border border-zinc-800"
      >
        {/* Content */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{worker.name}</h2>

          <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
            {worker.bio || "No bio available"}
          </p>

          <div className="flex justify-between items-center mt-3">
            <span className="text-blue-400 font-medium text-base">
              {worker.role}
            </span>

            <span className="text-sm text-zinc-400">
              {worker.phone}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          {/* Edit */}
          <button
            onClick={() => setOpenEdit(true)}
            className="text-sm px-3 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
          >
            Edit
          </button>

          {/* Delete */}
          <button
            onClick={() => setOpenDelete(true)}
            className="text-sm px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
          >
            Delete
          </button>
        </div>
      </motion.div>

      {/* Delete Modal */}
      <DeleteWorkerModal
        open={openDelete}
        setOpen={setOpenDelete}
        workerId={worker.id}
        workerName={worker.name}
      />

      {/* Edit Modal */}
      <EditWorkerModal
        open={openEdit}
        setOpen={setOpenEdit}
        worker={worker}
      />
    </>
  );
}