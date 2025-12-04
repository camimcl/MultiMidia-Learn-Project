import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

export default function AudioPlayerSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioTracks = [
    {
      id: 1,
      title: 'Aula de Multimídia',
      artist: 'Conteúdo Educacional',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 
      duration: '--:--',
    },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const vol = parseFloat(e.target.value);
    audio.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const skipTrack = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setCurrentTrack((prev) => (prev + 1) % audioTracks.length);
    } else {
      setCurrentTrack((prev) => (prev - 1 + audioTracks.length) % audioTracks.length);
    }
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Reprodutor de Áudio
          </h2>
          <p className="text-indigo-100">
            Ouça aulas e conteúdos em áudio
          </p>
        </div>

        {/* Current Track Info */}
        <div className="p-8 bg-gradient-to-br from-slate-50 to-white">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-xl flex-shrink-0">
              <Volume2 className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-slate-800 mb-1">
                {audioTracks[currentTrack].title}
              </h3>
              <p className="text-slate-600">
                {audioTracks[currentTrack].artist}
              </p>
            </div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="px-8 pb-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgb(79, 70, 229) 0%, rgb(79, 70, 229) ${(currentTime / duration) * 100}%, rgb(226, 232, 240) ${(currentTime / duration) * 100}%, rgb(226, 232, 240) 100%)`,
              }}
            />
            <div className="flex justify-between text-sm text-slate-600 mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => skipTrack('prev')}
              className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <SkipBack className="w-6 h-6 text-slate-700" />
            </button>

            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" fill="white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              )}
            </button>

            <button
              onClick={() => skipTrack('next')}
              className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <SkipForward className="w-6 h-6 text-slate-700" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 max-w-xs mx-auto">
            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-200"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-slate-700" />
              ) : (
                <Volume2 className="w-5 h-5 text-slate-700" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgb(79, 70, 229) 0%, rgb(79, 70, 229) ${(isMuted ? 0 : volume) * 100}%, rgb(226, 232, 240) ${(isMuted ? 0 : volume) * 100}%, rgb(226, 232, 240) 100%)`,
              }}
            />
          </div>
        </div>

        {/* Playlist */}
        <div className="border-t border-slate-200 p-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Lista de Reprodução
          </h3>
          <div className="space-y-2">
            {audioTracks.map((track, index) => (
              <button
                key={track.id}
                onClick={() => {
                  setCurrentTrack(index);
                  setIsPlaying(false);
                }}
                className={`
                  w-full p-4 rounded-xl text-left transition-all duration-200 flex items-center gap-4
                  ${currentTrack === index
                    ? 'bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-300'
                    : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent'
                  }
                `}
              >
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${currentTrack === index
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600'
                    : 'bg-slate-300'
                  }
                `}>
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${currentTrack === index ? 'text-indigo-900' : 'text-slate-800'}`}>
                    {track.title}
                  </div>
                  <div className="text-sm text-slate-600">{track.artist}</div>
                </div>
                <div className="text-sm text-slate-500">{track.duration}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={audioTracks[currentTrack].url}
          preload="metadata"
        />
      </div>
    </div>
  );
}
