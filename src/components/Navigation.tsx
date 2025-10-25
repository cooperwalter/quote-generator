'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-white hover:text-white/80 transition-colors"
          >
            ✨ Daily Inspiration
          </Link>

          <div className="flex gap-6">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Link
                href="/about"
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                About
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Link
                href="/donate"
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                Donate
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
