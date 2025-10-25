'use client';

import { motion } from 'framer-motion';

const footerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delay: 1,
      duration: 0.6,
    },
  },
};

export function Footer() {
  return (
    <motion.footer
      variants={footerVariants}
      initial="initial"
      animate="animate"
      className="absolute bottom-0 text-center w-full px-6 py-8"
    >
      <p className="text-white/60 text-sm">
        Made with ❤️ by Cooper Walter
      </p>
    </motion.footer>
  );
}
