'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface QuoteButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function QuoteButton({ onClick, isLoading, disabled }: QuoteButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Button
        onClick={onClick}
        disabled={isLoading || disabled}
        size="lg"
        className="
          relative overflow-hidden
          px-8 py-6 text-lg font-medium
          bg-white/90 hover:bg-white
          text-gray-900
          backdrop-blur-sm
          border-2 border-white/50
          shadow-lg hover:shadow-xl
          transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
          group
        "
        aria-label="Get new inspirational quote"
      >
        <motion.span
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />

        <RefreshCw
          className={`mr-2 h-5 w-5 relative z-10 ${isLoading ? 'animate-spin' : ''}`}
          aria-hidden="true"
        />
        <span className="relative z-10">
          {isLoading ? 'Loading...' : 'New Quote'}
        </span>
      </Button>
    </motion.div>
  );
}
