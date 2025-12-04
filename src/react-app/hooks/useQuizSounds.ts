import { useEffect, useRef, useState, useCallback } from 'react';

export function useQuizSounds() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const backgroundMusicNodesRef = useRef<{
    oscillators: OscillatorNode[];
    gains: GainNode[];
    masterGain: GainNode;
  } | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    // Create audio context on mount
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    return () => {
      // Cleanup
      stopBackgroundMusic();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playClickSound = () => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  };

  const playSubmitSound = () => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Create a more interesting sound with multiple tones
    const frequencies = [523.25, 659.25, 783.99]; // C, E, G chord
    
    frequencies.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = ctx.currentTime + (index * 0.05);
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  };

  const playSuccessSound = () => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Triumphant ascending tones
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C (octave)
    
    frequencies.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'triangle';

      const startTime = ctx.currentTime + (index * 0.1);
      gainNode.gain.setValueAtTime(0.25, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.4);
    });
  };

  const playNeutralSound = () => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Simple two-tone neutral sound
    const frequencies = [440, 523.25]; // A, C
    
    frequencies.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = ctx.currentTime + (index * 0.1);
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  };

  const startBackgroundMusic = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx || backgroundMusicNodesRef.current) return;

    // Create a gentle, ambient background music using a simple chord progression
    // Using C major pentatonic scale for a calming effect
    const chordProgression = [
      [261.63, 329.63, 392.00], // C major (C, E, G)
      [293.66, 349.23, 440.00], // D minor (D, F, A)
      [246.94, 329.63, 392.00], // A minor (A, C, E) - using B as bass
      [261.63, 329.63, 392.00], // C major (C, E, G)
    ];

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.08; // Very subtle volume
    masterGain.connect(ctx.destination);

    const oscillators: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    // Create oscillators for each note in the progression
    chordProgression.forEach((chord, chordIndex) => {
      chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        osc.connect(gainNode);
        gainNode.connect(masterGain);
        
        // Create a gentle fade in/out pattern for each chord
        const startTime = ctx.currentTime + (chordIndex * 4); // 4 seconds per chord
        const duration = 4;
        
        // Fade in
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.5);
        
        // Hold
        gainNode.gain.setValueAtTime(0.3, startTime + 3);
        
        // Fade out
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
        
        osc.start(startTime);
        osc.stop(startTime + duration + 0.1);
        
        oscillators.push(osc);
        gains.push(gainNode);
      });
    });

    backgroundMusicNodesRef.current = {
      oscillators,
      gains,
      masterGain,
    };

    setIsMusicPlaying(true);

    // Schedule the next loop
    const loopDuration = chordProgression.length * 4;
    setTimeout(() => {
      if (backgroundMusicNodesRef.current) {
        backgroundMusicNodesRef.current = null;
        if (isMusicPlaying) {
          startBackgroundMusic();
        }
      }
    }, loopDuration * 1000);
  }, [isMusicPlaying]);

  const stopBackgroundMusic = useCallback(() => {
    if (backgroundMusicNodesRef.current) {
      const { oscillators, masterGain } = backgroundMusicNodesRef.current;
      
      // Fade out
      const ctx = audioContextRef.current;
      if (ctx) {
        masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
        
        setTimeout(() => {
          oscillators.forEach(osc => {
            try {
              osc.stop();
            } catch (e) {
              // Oscillator might already be stopped
            }
          });
          backgroundMusicNodesRef.current = null;
        }, 600);
      }
    }
    setIsMusicPlaying(false);
  }, []);

  const toggleBackgroundMusic = useCallback(() => {
    if (isMusicPlaying) {
      stopBackgroundMusic();
    } else {
      startBackgroundMusic();
    }
  }, [isMusicPlaying, startBackgroundMusic, stopBackgroundMusic]);

  return {
    playClickSound,
    playSubmitSound,
    playSuccessSound,
    playNeutralSound,
    startBackgroundMusic,
    stopBackgroundMusic,
    toggleBackgroundMusic,
    isMusicPlaying,
  };
}
