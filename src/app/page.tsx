'use client';

import { AuthCard } from '@/components/auth/auth-card';
import { Hero } from '@/components/auth/hero';
import { useEffect, useState } from 'react';

export default function Home() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Delay showing the content for the animation
    const timer = setTimeout(() => {
      setShow(true);
    }, 100); // Small delay to ensure animation triggers
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0f172a] via-[#0b1220] to-[#081126] p-6 relative overflow-hidden">
      <div
        className={`max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center z-10 transition-all duration-1000 ease-out ${
          show
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <Hero />
        <AuthCard />
      </div>
    </div>
  );
}
