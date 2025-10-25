'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import type { Quote } from '@/types/quote';

interface QuoteCardProps {
  quote: Quote | null;
  isLoading?: boolean;
}

const cardVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

const quoteTextVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: 'easeOut',
    },
  },
};

const authorVariants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 0.9,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.4,
      ease: 'easeOut',
    },
  },
};

export function QuoteCard({ quote, isLoading }: QuoteCardProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopyClick = async () => {
    if (!quote) return;

    try {
      await navigator.clipboard.writeText(`"${quote.content}" — ${quote.author}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Card className="w-full backdrop-blur-xl bg-white/20 border-white/20 shadow-2xl p-8 md:p-12">
            <div className="space-y-4">
              <motion.div
                className="h-8 bg-white/30 rounded-lg w-3/4"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="h-8 bg-white/30 rounded-lg w-full"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
              />
              <motion.div
                className="h-8 bg-white/30 rounded-lg w-2/3"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="h-6 bg-white/30 rounded-lg w-1/3 ml-auto mt-8"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              />
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (!quote) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={quote.content}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          layout
          transition={{
            layout: { duration: 0.5, ease: 'easeInOut' },
          }}
        >
          <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={handleCopyClick}
          className="cursor-pointer relative"
        >
          <Card className="w-full backdrop-blur-xl bg-white/20 border-white/20 shadow-2xl p-8 md:p-12 hover:bg-white/25 transition-colors duration-300">
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-900" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <blockquote className="space-y-6">
            <motion.p
              variants={quoteTextVariants}
              layout
              className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-white"
              style={{ fontFamily: 'var(--font-dancing-script)' }}
            >
              "{quote.content}"
            </motion.p>
            <footer className="mt-8">
              <motion.cite
                variants={authorVariants}
                layout
                className="text-base md:text-lg lg:text-xl text-white/80 italic block text-right not-italic font-light"
                style={{ fontFamily: 'var(--font-dancing-script)' }}
              >
                — {quote.author}
              </motion.cite>
            </footer>
          </blockquote>
          </Card>
        </motion.div>
      </motion.div>
      </AnimatePresence>
    </div>
  );
}
