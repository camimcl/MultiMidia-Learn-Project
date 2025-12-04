import { useState } from 'react';
import { ChevronDown, ChevronUp, Video, CheckCircle, PlayCircle } from 'lucide-react';

interface VideoItem {
  id: number;
  title: string;
  videoUrl: string;
  duration: string;
}

interface Topic {
  id: number;
  title: string;
  videos: VideoItem[];
  description: string;
  completed: boolean;
}

export default function ContentSection() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(1);
  const [selectedVideo, setSelectedVideo] = useState<{ topicId: number; videoId: number }>({ topicId: 1, videoId: 1 });

  const topics: Topic[] = [
    {
      id: 1,
      title: '1. Edições de vídeo Autorais',
      videos: [
        {
          id: 1,
          title: 'VALORANT COM EDIT',
          videoUrl: 'https://www.youtube.com/embed/XFLZsb7pS9A',
          duration: '00:53',
        },
        {
          id: 2,
          title: 'VALORANT SEM EDIT',
          videoUrl: 'https://www.youtube.com/embed/fka12KhM8X0',
          duration: '1:54',
        },
        {
          id: 3,
          title: 'Vídeo do Cachorro',
          videoUrl: 'https://www.youtube.com/embed/sAFKAqWrx1k',
          duration: '0:52',
        },
      ],
    },
    {
      id: 2,
      title: '2. Animações',
      videos: [
        {
          id: 1,
          title: 'ANIMAÇÕES',
          videoUrl: 'https://www.youtube.com/embed/WJGoF4B2oKQ',
          duration: '0:18',
        },
        {
          id: 2,
          title: 'ANIMAÇÃO 2',
          videoUrl: 'https://www.youtube.com/embed/WSGHid7YX08',
          duration: '0:08',
        },
      ],
      description: '',
      completed: true,
    },
    {
      id: 3,
      title: '3. Codificação e Compressão de Vídeo',
      videos: [
        {
          id: 1,
          title: 'Introdução aos Codecs',
          videoUrl: 'https://www.youtube.com/embed/QoZ8pccsYo4',
          duration: '10:15',
        },
        {
          id: 2,
          title: 'H.264 e H.265',
          videoUrl: 'https://www.youtube.com/embed/QoZ8pccsYo4',
          duration: '8:15',
        },
      ],
      description: 'Como funciona a compressão de vídeo, codecs H.264, H.265 e VP9.',
      completed: true,
    },
    {
      id: 4,
      title: '4. Sistemas de Streaming',
      videos: [
        {
          id: 1,
          title: 'Protocolos de Streaming',
          videoUrl: 'https://www.youtube.com/embed/7AMRfNKwuYo',
          duration: '15:20',
        },
      ],
      description: 'Protocolos de streaming, adaptive bitrate e entrega de conteúdo.',
      completed: false,
    },
    {
      id: 5,
      title: '5. Edição e Processamento de Vídeo',
      videos: [
        {
          id: 1,
          title: 'Técnicas de Edição',
          videoUrl: 'https://www.youtube.com/embed/6ga4IICXyCE',
          duration: '12:30',
        },
        {
          id: 2,
          title: 'Efeitos Visuais',
          videoUrl: 'https://www.youtube.com/embed/adt7fzqVkWQ',
          duration: '7:45',
        },
      ],
      description: 'Técnicas de edição, efeitos visuais e pós-produção digital.',
      completed: false,
    },
    {
      id: 6,
      title: '6. Áudio em Sistemas Multimídia',
      videos: [
        {
          id: 1,
          title: 'Sincronização Audiovisual',
          videoUrl: 'https://www.youtube.com/embed/1RIA9U5oXro',
          duration: '14:40',
        },
      ],
      description: 'Sincronização audiovisual, formatos de áudio e processamento.',
      completed: false,
    },
  ];

  const toggleTopic = (id: number) => {
    setExpandedTopic(expandedTopic === id ? null : id);
    // When opening a topic, select its first video
    if (expandedTopic !== id) {
      const topic = topics.find(t => t.id === id);
      if (topic && topic.videos.length > 0) {
        setSelectedVideo({ topicId: id, videoId: topic.videos[0].id });
      }
    }
  };

  const selectVideo = (topicId: number, videoId: number) => {
    setSelectedVideo({ topicId, videoId });
  };

  const getTotalDuration = (videos: VideoItem[]): string => {
    // This is a simple sum, you could make it more sophisticated
    const totalMinutes = videos.reduce((acc, video) => {
      const [mins, secs] = video.duration.split(':').map(Number);
      return acc + mins + (secs / 60);
    }, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes} min`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-3xl font-bold text-indigo-900 mb-6">
          Vídeo Digital e Sistemas Multimídia
        </h2>
        
        {topics.map((topic) => {
          const isExpanded = expandedTopic === topic.id;
          const currentVideo = topic.videos.find(v => 
            selectedVideo.topicId === topic.id && selectedVideo.videoId === v.id
          ) || topic.videos[0];
          
          return (
            <div
              key={topic.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg">
                    <Video className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-slate-800">{topic.title}</h3>
                    <p className="text-sm text-slate-500">
                      {topic.videos.length} vídeo{topic.videos.length > 1 ? 's' : ''} · {getTotalDuration(topic.videos)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {topic.completed && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400" />
                  )}
                </div>
              </button>
              
              {isExpanded && (
                <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-slate-600 mb-4">{topic.description}</p>
                    
                    {/* Video Player */}
                    <div className="aspect-video rounded-xl overflow-hidden shadow-xl bg-slate-900 mb-4">
                      <iframe
                        width="100%"
                        height="100%"
                        src={currentVideo.videoUrl}
                        title={currentVideo.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>

                    {/* Video List */}
                    {topic.videos.length > 1 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-slate-700 mb-3">Vídeos desta aula:</h4>
                        {topic.videos.map((video) => {
                          const isSelected = selectedVideo.topicId === topic.id && selectedVideo.videoId === video.id;
                          return (
                            <button
                              key={video.id}
                              onClick={() => selectVideo(topic.id, video.id)}
                              className={`
                                w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200
                                ${isSelected 
                                  ? 'bg-indigo-50 border-2 border-indigo-400 shadow-md' 
                                  : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100 hover:border-slate-300'
                                }
                              `}
                            >
                              <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                                ${isSelected 
                                  ? 'bg-indigo-600' 
                                  : 'bg-slate-300'
                                }
                              `}>
                                <PlayCircle className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 text-left">
                                <div className={`font-medium ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
                                  {video.title}
                                </div>
                                <div className="text-sm text-slate-500">{video.duration}</div>
                              </div>
                              {isSelected && (
                                <div className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                                  Reproduzindo
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Progress Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Progresso</h3>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">Completo</span>
              <span className="font-semibold text-indigo-600">33%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full shadow-lg transition-all duration-500"
                style={{ width: '33%' }}
              ></div>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Vídeos assistidos</span>
              <span className="font-semibold text-slate-800">2/6</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Tempo total</span>
              <span className="font-semibold text-slate-800">1h 38min</span>
            </div>
          </div>
        </div>

        {/* Instructors Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Colaboradores</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg ring-4 ring-blue-100">
                <span className="text-white font-bold text-lg">DEV</span>
              </div>
              <div>
                <div className="font-semibold text-slate-800">Camile Marcele</div>
                <div className="text-sm text-slate-500">Desenvolvedora</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg ring-4 ring-purple-100">
                <span className="text-white font-bold text-lg">ART</span>
              </div>
              <div>
                <div className="font-semibold text-slate-800">Rafaella Guedes</div>
                <div className="text-sm text-slate-500">Design</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg ring-4 ring-purple-100">
                <span className="text-white font-bold text-lg">DEV</span>
              </div>
              <div>
                <div className="font-semibold text-slate-800">João Victor</div>
                <div className="text-sm text-slate-500">Desenvolvedor</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg ring-4 ring-purple-100">
                <span className="text-white font-bold text-lg">PROD</span>
              </div>
              <div>
                <div className="font-semibold text-slate-800">Milena Oliveira</div>
                <div className="text-sm text-slate-500">Slides e apresentação</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg ring-4 ring-purple-100">
                <span className="text-white font-bold text-lg">EDIT</span>
              </div>
              <div>
                <div className="font-semibold text-slate-800">Maria Eduarda </div>
                <div className="text-sm text-slate-500">Audio e Vídeo</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg ring-4 ring-purple-100">
                <span className="text-white font-bold text-lg">PROD</span>
              </div>
              <div>
                <div className="font-semibold text-slate-800">Ellen Vitória</div>
                <div className="text-sm text-slate-500">Design</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
