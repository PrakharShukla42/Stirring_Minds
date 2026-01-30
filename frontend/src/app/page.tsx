"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-center"
      >
        Startup Benefits Platform
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-6 max-w-xl text-center text-neutral-400"
      >
        Discover exclusive SaaS deals on cloud, marketing, analytics, and
        productivity tools — built specifically for early-stage startups.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <Link
          href="/deals"
          className="inline-block rounded-lg bg-white px-6 py-3 text-black font-medium hover:bg-neutral-200 transition"
        >
          Explore Deals
        </Link>
      </motion.div>
    </main>
  );
}
