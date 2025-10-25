'use client';

export function BackgroundEffect() {
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 animate-gradient" />

      <div className="fixed inset-0 -z-10 bg-gradient-to-t from-black/10 via-transparent to-white/10" />

      <div
        className="fixed inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />
    </>
  );
}
