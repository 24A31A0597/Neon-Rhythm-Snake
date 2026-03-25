import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-hidden font-sans relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-500/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
        
        {/* Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center gap-8">
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-2"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              Neon Rhythm
            </span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-xs font-mono uppercase tracking-[0.3em] text-cyan-400/60">
            <span className="h-px w-12 bg-cyan-500/30" />
            <span>Snake Arcade Edition</span>
            <span className="h-px w-12 bg-cyan-500/30" />
          </div>
        </motion.header>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-6xl">
          {/* Left Side - Info/Stats (Optional expansion) */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden xl:flex flex-col gap-6 w-64"
          >
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
              <h4 className="text-cyan-400 text-xs font-mono uppercase mb-4">System Status</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Engine</span>
                  <span className="text-green-400">Stable</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Latency</span>
                  <span className="text-cyan-400">12ms</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Sync</span>
                  <span className="text-fuchsia-400">Active</span>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
              <h4 className="text-fuchsia-400 text-xs font-mono uppercase mb-4">Leaderboard</h4>
              <div className="space-y-2 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span>01. CYBER_PUNK</span>
                  <span className="text-white">2450</span>
                </div>
                <div className="flex justify-between opacity-50">
                  <span>02. NEON_GHOST</span>
                  <span>1820</span>
                </div>
                <div className="flex justify-between opacity-30">
                  <span>03. GRID_RUNNER</span>
                  <span>1440</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center - Game */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <SnakeGame />
          </motion.div>

          {/* Right Side - Music Player */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <MusicPlayer />
            
            <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl backdrop-blur-sm max-w-md">
              <h4 className="text-cyan-400 text-xs font-mono uppercase mb-2 tracking-widest">How to play</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Navigate the neon snake to consume the energy pulses. Each pulse increases your score and length. 
                Avoid hitting the grid boundaries or your own trail.
              </p>
            </div>
          </motion.div>
        </div>

        <footer className="mt-auto py-6 text-white/20 text-[10px] font-mono uppercase tracking-[0.5em]">
          &copy; 2026 Neon Rhythm Arcade // All Rights Reserved
        </footer>
      </main>
    </div>
  );
}
