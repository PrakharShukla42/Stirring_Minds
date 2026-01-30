"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Deal } from "../types/deal";

export default function DealCard({ deal }: { deal: Deal }) {
  const locked = deal.accessLevel === "locked";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260 }}
      className="relative flex flex-col justify-between rounded-2xl 
      border border-[var(--border)] bg-[var(--card)] p-6 min-h-[230px]
      hover:shadow-[0_0_40px_-10px_var(--accent-soft)] transition"
    >
      {locked && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-2xl bg-black/70 backdrop-blur-sm">
          <span className="text-xl">🔒</span>
          <span className="text-sm font-medium">Verification Required</span>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-2">{deal.title}</h3>
        <p className="text-sm opacity-80 line-clamp-3">
          {deal.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs opacity-60">{deal.partnerName}</span>

        {!locked && (
          <Link
            href={`/deals/${deal._id}`}
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white hover:opacity-90 transition"
          >
            View Deal →
          </Link>
        )}
      </div>
    </motion.div>
  );
}
