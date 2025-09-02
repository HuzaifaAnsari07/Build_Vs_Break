import { AuthCard } from '@/components/auth/auth-card';
import { Hero } from '@/components/auth/hero';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0f172a] via-[#0b1220] to-[#081126] p-6 relative overflow-hidden">
      <div className="absolute -z-10 inset-0">
        <div className="animate-blob bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-400 opacity-30 w-[40rem] h-[40rem] rounded-full blur-3xl -translate-x-20 -translate-y-28"></div>
      </div>

      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center z-10">
        <Hero />
        <AuthCard />
      </div>
    </div>
  );
}
