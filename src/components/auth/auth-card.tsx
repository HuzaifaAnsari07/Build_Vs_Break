'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

export function AuthCard() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isFlipping, setIsFlipping] = useState(true);

  useEffect(() => {
    // Initial shuffle animation
    const flipTimeout = setTimeout(() => {
      setIsFlipping(false);
    }, 1200);

    return () => clearTimeout(flipTimeout);
  }, []);

  const handleSwitch = () => setIsRegistering(!isRegistering);

  return (
    <div className="w-full h-[580px] [perspective:1000px]">
      <div
        className={cn(
          'relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]',
          isRegistering && !isFlipping && '[transform:rotateY(180deg)]',
          isFlipping && 'animate-shuffle'
        )}
      >
        <div className="absolute w-full h-full [backface-visibility:hidden] transform-gpu">
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 shadow-2xl h-full transform-gpu hover:scale-[1.01] transition-transform duration-300">
            <LoginForm onSwitch={handleSwitch} />
          </div>
        </div>
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] transform-gpu">
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 shadow-2xl h-full transform-gpu hover:scale-[1.01] transition-transform duration-300">
            <RegisterForm onSwitch={handleSwitch} />
          </div>
        </div>
      </div>
    </div>
  );
}
