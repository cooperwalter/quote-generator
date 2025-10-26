'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { BackButton } from '@/components/BackButton';
import { Footer } from '@/components/Footer';
import { BackgroundEffect } from '@/components/BackgroundEffect';
import { Card } from '@/components/ui/card';

export default function Donate() {
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
                💝 Support Good Causes
              </h1>

              <div className="space-y-6 text-white/90 text-lg leading-relaxed">
                <p>
                  This project was created to spread positivity and wisdom to people around the world. Your support helps keep this service running and allows us to continue delivering beautiful, inspiring quotes every day.
                </p>

                <p className="text-white/80 mb-6">
                  Please consider supporting these amazing charities that make a real difference in the world:
                </p>

                <div className="space-y-4">
                  <a
                    href="https://www.thelifeyoucansave.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/10 rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 text-4xl">
                        🌍
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">The Life You Can Save</h3>
                        <p className="text-white/80 text-base">
                          Dedicated to reducing extreme poverty by inspiring people to donate more effectively to evidence-based charities.
                        </p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://www.unicef.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/10 rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 text-4xl">
                        👶
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">UNICEF</h3>
                        <p className="text-white/80 text-base">
                          Works in over 190 countries to save children&apos;s lives, defend their rights, and help them fulfill their potential.
                        </p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://www.stjude.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/10 rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 text-4xl">
                        🏥
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">St. Jude Children&apos;s Research Hospital</h3>
                        <p className="text-white/80 text-base">
                          Leading the way the world understands, treats and defeats childhood cancer and other life-threatening diseases.
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                <p className="text-center text-white/70 italic mt-6">
                  Thank you for making the world a better place! 🌟
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        <Footer />
      </main>
    </>
  );
}
