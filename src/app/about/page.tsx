'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { BackButton } from '@/components/BackButton';
import { Footer } from '@/components/Footer';
import { BackgroundEffect } from '@/components/BackgroundEffect';
import { Card } from '@/components/ui/card';

export default function About() {
  return (
    <>
      <Navigation />
      <BackgroundEffect />
      <BackButton />

      <main className="min-h-screen flex flex-col items-center justify-center p-6 relative">
        <div className="w-full max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="backdrop-blur-xl bg-white/20 border-white/20 shadow-2xl p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                📖 About Daily Inspiration
              </h1>

              <div className="space-y-6 text-white/90 text-lg leading-relaxed">
                <p>
                  Welcome to Daily Inspiration, your daily dose of wisdom and motivation! ✨
                </p>

                <p>
                  This beautiful quote generator was created to brighten your day with inspiring words from great minds throughout history. Each quote is carefully selected to uplift, motivate, and provide a moment of reflection in your busy day.
                </p>

                <p>
                  Built with modern web technologies including Next.js, React, and Framer Motion, this app combines stunning visual design with smooth animations to create a premium user experience. 🎨
                </p>

                <p>
                  Whether you need a quick boost of motivation, a moment of inspiration, or just want to discover timeless wisdom, Daily Inspiration is here for you. 💫
                </p>

                <div className="bg-white/10 rounded-lg p-6 my-6 border border-white/20">
                  <p className="text-white/80 italic">
                    ⚡ Fun fact: This website was created within 1 hour as a personal coding challenge! 🚀
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <Footer />
      </main>
    </>
  );
}
