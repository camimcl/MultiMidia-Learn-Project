import { useState, useRef, useEffect } from 'react';
import { Home as HomeIcon, Video, CheckSquare, BarChart3, Music, Image, Volume2, VolumeX } from 'lucide-react';
import ContentSection from '@/react-app/components/ContentSection';
import QuizSection from '@/react-app/components/QuizSection';
import AudioPlayerSection from '@/react-app/components/AudioPlayerSection';
import ImageGallerySection from '@/react-app/components/ImageGallerySection';

export default function Home() {
  const [activeSection, setActiveSection] = useState('content');
  const [quizResults, setQuizResults] = useState<Array<{ score: number; total: number; date: string }>>([]);
  const [accessibilityEnabled, setAccessibilityEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleQuizComplete = (score: number, total: number) => {
    const newResult = {
      score,
      total,
      date: new Date().toLocaleString('pt-BR'),
    };
    setQuizResults(prev => [...prev, newResult]);
  };

  const calculateAverageScore = () => {
    if (quizResults.length === 0) return 0;
    const totalPercentage = quizResults.reduce((acc, result) => {
      return acc + (result.score / result.total) * 100;
    }, 0);
    return Math.round(totalPercentage / quizResults.length);
  };

  const getTotalQuizzesTaken = () => {
    return quizResults.length;
  };

  const navItems = [
    { id: 'home', label: 'Início', icon: HomeIcon, audioPath: '/api/audio-proxy/14aFMKEAqMM7b3GFB4uCHt7upKLQmJqlO' },
    { id: 'content', label: 'Conteúdo', icon: Video, audioPath: '/api/audio-proxy/1wBJyoP7zNgqDNcnKKC1z0f-yGxBasDtx' },
    { id: 'quiz', label: 'Avaliação', icon: CheckSquare, audioPath: '/api/audio-proxy/1ic0n6pbXIkyQ7fIppe6tE__0OLccdpvv' },
    { id: 'performance', label: 'Desempenho', icon: BarChart3, audioPath: '' },
    { id: 'audio', label: 'Áudio', icon: Music, audioPath: '/api/audio-proxy/18176T84ky6V7hzpGqolslPUvaITEV8yU' },
    { id: 'images', label: 'Imagens', icon: Image, audioPath: '/api/audio-proxy/1hQrne0A6t3gKs-70sIOMN1YHH17T79R-' },
  ];

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    
    if (accessibilityEnabled && audioRef.current) {
      const item = navItems.find(nav => nav.id === sectionId);
      if (item && item.audioPath) {
        audioRef.current.src = item.audioPath;
        audioRef.current.play().catch(error => {
          console.error('Audio playback failed:', error);
        });
      }
    }
  };

  const toggleAccessibility = () => {
    setAccessibilityEnabled(!accessibilityEnabled);
    if (!accessibilityEnabled && audioRef.current) {
      // Play current section audio when enabling
      const item = navItems.find(nav => nav.id === activeSection);
      if (item && item.audioPath) {
        audioRef.current.src = item.audioPath;
        audioRef.current.play().catch(error => {
          console.error('Audio playback failed:', error);
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Navigation */}
      <nav className="bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-900 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Accessibility Button */}
            <button
              onClick={toggleAccessibility}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg
                ${accessibilityEnabled 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
                }
              `}
              title={accessibilityEnabled ? 'Desativar narração de acessibilidade' : 'Ativar narração de acessibilidade'}
            >
              {accessibilityEnabled ? (
                <>
                  <Volume2 className="w-5 h-5" />
                  <span className="text-sm">Acessibilidade</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-5 h-5" />
                  <span className="text-sm">Acessibilidade</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2 flex-1 justify-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className="group flex flex-col items-center gap-2 px-6 py-3 relative transition-all duration-300"
                >
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                      ${isActive 
                        ? 'bg-orange-500 shadow-lg shadow-orange-500/50 scale-110' 
                        : 'bg-indigo-800 group-hover:bg-indigo-700 group-hover:scale-105'
                      }
                    `}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`
                    text-sm font-medium transition-colors duration-300
                    ${isActive ? 'text-white' : 'text-blue-200 group-hover:text-white'}
                  `}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-orange-500 rounded-full" />
                  )}
                </button>
              );
            })}
            </div>
            
            {/* Spacer for layout balance */}
            <div className="w-40"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="text-center py-16">
            <h1 className="text-5xl font-bold text-indigo-900 mb-4">
              Bem-vindo ao MultiMedia Learn
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Plataforma interativa de aprendizado sobre vídeo digital e sistemas multimídia
            </p>
          </div>
        )}

        {activeSection === 'content' && <ContentSection />}
        
        {activeSection === 'quiz' && <QuizSection onQuizComplete={handleQuizComplete} />}

        {activeSection === 'audio' && <AudioPlayerSection />}

        {activeSection === 'images' && <ImageGallerySection />}

        {activeSection === 'performance' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-indigo-900 mb-6">Desempenho</h2>
            <div className="space-y-6">
              {/* Average Quiz Score */}
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-slate-700">Média dos Questionários</span>
                  <span className="text-2xl font-bold text-green-600">{calculateAverageScore()}%</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full shadow-lg transition-all duration-500" 
                    style={{ width: `${calculateAverageScore()}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="text-sm text-slate-600 mb-1">Vídeos Assistidos</div>
                  <div className="text-3xl font-bold text-indigo-600">2/6</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="text-sm text-slate-600 mb-1">Questionários Realizados</div>
                  <div className="text-3xl font-bold text-purple-600">{getTotalQuizzesTaken()}</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <div className="text-sm text-slate-600 mb-1">Progresso Total</div>
                  <div className="text-3xl font-bold text-amber-600">33%</div>
                </div>
              </div>

              {/* Quiz History */}
              {quizResults.length > 0 && (
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Histórico de Questionários</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {quizResults.slice().reverse().map((result, index) => {
                      const percentage = Math.round((result.score / result.total) * 100);
                      return (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 hover:border-indigo-300 transition-all duration-200"
                        >
                          <div className="flex-1">
                            <div className="font-semibold text-slate-800">
                              Quiz #{quizResults.length - index}
                            </div>
                            <div className="text-sm text-slate-500">{result.date}</div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-sm text-slate-600">Acertos</div>
                              <div className="font-bold text-slate-800">{result.score}/{result.total}</div>
                            </div>
                            <div className={`
                              text-2xl font-bold px-4 py-2 rounded-lg
                              ${percentage >= 70 ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}
                            `}>
                              {percentage}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {quizResults.length === 0 && (
                <div className="text-center py-12 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200">
                  <CheckSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 text-lg mb-2">Nenhum questionário realizado ainda</p>
                  <p className="text-slate-400 text-sm">Complete um quiz para ver seu desempenho aqui</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
