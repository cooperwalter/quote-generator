'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  return (
    <Link href="/" className="fixed top-6 left-6 z-50">
      <motion.div
        whileHover={{ scale: 1.1, x: -5 }}
        transition={{ duration: 0.2 }}
        className="bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </motion.div>
    </Link>
  );
}
