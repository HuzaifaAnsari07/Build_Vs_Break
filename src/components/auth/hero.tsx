import { Button } from '@/components/ui/button';
import { Rocket, ShieldCheck } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative px-6 py-10 rounded-2xl h-full flex flex-col justify-center items-start text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-pink-300 to-white drop-shadow-lg font-headline">
        <span className="relative inline-block glitter">Build Vs Break</span>
      </h1>
      <p className="text-xl block font-medium text-slate-200 font-body tracking-wide mt-2">
        AIML Club Event
      </p>

      <p className="mt-4 text-slate-300 max-w-md">
        Join our challenge — build, break, learn. Fast-paced, hands-on problem
        solving & rewards. Login with your student email to participate.
      </p>

      <ul className="mt-6 text-slate-300 space-y-3">
        <li className="flex items-center gap-3">
          <Rocket className="w-5 h-5 text-purple-400" />
          <span>3D interactive UI</span>
        </li>
        <li className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-purple-400" />
          <span>Secure student-only access</span>
        </li>
      </ul>

      <div className="mt-8 flex gap-4">
        <Button
          size="lg"
          className="bg-gradient-to-r from-primary to-pink-500 text-white font-semibold shadow-lg transform-gpu hover:-translate-y-1 transition-transform duration-300"
        >
          Explore Event
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="text-white/90 bg-white/5 border-white/20 hover:bg-white/10 hover:text-white"
        >
          Read Rules
        </Button>
      </div>
    </div>
  );
}
