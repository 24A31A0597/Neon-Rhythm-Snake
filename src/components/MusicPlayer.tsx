import React, { useState, useRef, useEffect } from 'react';
import { Track } from '../types';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { motion } from 'motion/react';

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Horizon',
    artist: 'SynthWave AI',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/neon1/400/400',
  },
  {
    id: '2',
    title: 'Cyber Pulse',
    artist: 'Digital Dreamer',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/neon2/400/400',
  },
  {
    id: '3',
    title: 'Midnight Grid',
    artist: 'Retro Future',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/neon3/400/400',
  },
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress || 0);
    }
  };

  const handleTrackEnd = () => {
    skipForward();
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const skipBack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  return (
    <div className="w-full max-w-md bg-black/60 backdrop-blur-xl border border-fuchsia-500/30 rounded-3xl p-6 shadow-[0_0_50px_-12px_rgba(217,70,239,0.4)]">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />
      
      <div className="flex items-center gap-6">
        <motion.div 
          key={currentTrack.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-24 h-24 flex-shrink-0"
        >
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title}
            className={`w-full h-full object-cover rounded-2xl border-2 border-fuchsia-500/50 shadow-[0_0_15px_rgba(217,70,239,0.3)] ${isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''}`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-full border border-fuchsia-500/50" />
          </div>
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-lg truncate drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
            {currentTrack.title}
          </h3>
          <p className="text-fuchsia-400 text-sm font-mono truncate uppercase tracking-wider">
            {currentTrack.artist}
          </p>
          
          <div className="mt-4 flex items-center gap-4">
            <button 
              onClick={skipBack}
              className="text-fuchsia-500 hover:text-fuchsia-400 transition-colors"
            >
              <SkipBack size={20} fill="currentColor" />
            </button>
            
            <button 
              onClick={togglePlay}
              className="w-10 h-10 bg-fuchsia-500 rounded-full flex items-center justify-center text-black hover:bg-fuchsia-400 transition-all transform hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(217,70,239,0.6)]"
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
            </button>
            
            <button 
              onClick={skipForward}
              className="text-fuchsia-500 hover:text-fuchsia-400 transition-colors"
            >
              <SkipForward size={20} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="h-1.5 w-full bg-fuchsia-900/30 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-fuchsia-600 to-cyan-400 shadow-[0_0_10px_rgba(217,70,239,0.8)]"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-fuchsia-500/70 uppercase tracking-widest">
          <div className="flex items-center gap-1">
            <Music size={10} />
            <span>Now Playing</span>
          </div>
          <div className="flex items-center gap-1">
            <Volume2 size={10} />
            <span>Stereo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
