'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { QuoteCard } from '@/components/QuoteCard';
import { QuoteButton } from '@/components/QuoteButton';
import { BackgroundEffect } from '@/components/BackgroundEffect';
import { fetchRandomQuote } from '@/lib/api/quotes';
import type { Quote } from '@/types/quote';

const headerVariants = {
  initial: { opacity: 0, y: -30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadQuote = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const newQuote = await fetchRandomQuote();
      setQuote(newQuote);
    } catch (err) {
      console.error('Failed to load quote:', err);
      setError('Failed to load quote. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuote();
  }, []);

  return (
    <>
      <Navigation />
      <BackgroundEffect />

      <main className="min-h-screen flex flex-col items-center justify-center p-6 relative">
        <div className="w-full max-w-4xl flex flex-col items-center justify-center">
          <div className="space-y-8 w-full flex flex-col items-center">
            <QuoteCard quote={quote} isLoading={isLoading} />

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                className="text-center text-white bg-red-500/20 backdrop-blur-sm border border-red-300/30 rounded-lg p-4"
              >
                {error}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <QuoteButton onClick={loadQuote} isLoading={isLoading} />
            </motion.div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
