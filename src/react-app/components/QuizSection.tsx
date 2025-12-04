import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Music } from 'lucide-react';
import { useQuizSounds } from '@/react-app/hooks/useQuizSounds';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  imageUrl?: string;
}

interface QuizSectionProps {
  onQuizComplete?: (score: number, total: number) => void;
}

export default function QuizSection({ onQuizComplete }: QuizSectionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const { 
    playClickSound, 
    playSubmitSound, 
    playSuccessSound, 
    playNeutralSound,
    toggleBackgroundMusic,
    isMusicPlaying,
  } = useQuizSounds();

  const allQuestions: Question[] = [
    {
      id: 1,
      question: 'Observe a imagem acima. Qual formato de arquivo é utilizado para imagens vetoriais como esta?',
      options: [
        'PNG',
        'JPEG',
        'SVG',
        'BMP',
      ],
      correctAnswer: 2,
      explanation: 'SVG (Scalable Vector Graphics) é o formato padrão para imagens vetoriais na web, permitindo escalabilidade sem perda de qualidade pois usa equações matemáticas para definir formas.',
      imageUrl: 'https://mocha-cdn.com/019abd73-df6a-720b-9c3d-48a725c07418/trabalho_2-(sem-fundo).svg',
    },
    {
      id: 2,
      question: 'A imagem acima é um exemplo de imagem matricial (raster). Qual é a principal característica deste tipo de imagem?',
      options: [
        'Pode ser ampliada infinitamente sem perda de qualidade',
        'É composta por pixels em uma grade',
        'Usa equações matemáticas para definir formas',
        'Sempre tem fundo transparente',
      ],
      correctAnswer: 1,
      explanation: 'Imagens matriciais (raster) são compostas por uma grade de pixels, cada um com uma cor específica. Ao ampliar muito, pode haver perda de qualidade (pixelização), diferente de imagens vetoriais.',
      imageUrl: 'https://mocha-cdn.com/019abd73-df6a-720b-9c3d-48a725c07418/wallpaper.jpg',
    },
    {
      id: 3,
      question: 'Qual é a principal diferença entre H.264 e H.265?',
      options: [
        'H.265 usa mais largura de banda',
        'H.265 oferece melhor compressão com mesma qualidade',
        'H.264 é mais recente',
        'Não há diferença significativa',
      ],
      correctAnswer: 1,
      explanation: 'H.265 (HEVC) oferece aproximadamente 50% melhor compressão que H.264, mantendo a mesma qualidade visual.',
    },
    {
      id: 4,
      question: 'O que significa "resolução 4K"?',
      options: [
        '1920x1080 pixels',
        '2560x1440 pixels',
        '3840x2160 pixels',
        '7680x4320 pixels',
      ],
      correctAnswer: 2,
      explanation: 'Resolução 4K refere-se a 3840x2160 pixels, o que é quatro vezes a resolução Full HD (1080p).',
    },
    {
      id: 5,
      question: 'Qual protocolo é comumente usado para streaming adaptativo?',
      options: [
        'FTP',
        'SMTP',
        'HLS ou DASH',
        'SSH',
      ],
      correctAnswer: 2,
      explanation: 'HLS (HTTP Live Streaming) e DASH (Dynamic Adaptive Streaming over HTTP) são os protocolos mais comuns para streaming adaptativo.',
    },
    {
      id: 6,
      question: 'O que é "frame rate" em vídeo digital?',
      options: [
        'Tamanho do arquivo de vídeo',
        'Número de frames por segundo',
        'Qualidade da imagem',
        'Taxa de compressão',
      ],
      correctAnswer: 1,
      explanation: 'Frame rate (taxa de quadros) é o número de frames exibidos por segundo, geralmente medido em FPS (frames per second).',
    },
    {
      id: 7,
      question: 'Qual formato de áudio oferece compressão sem perdas?',
      options: [
        'MP3',
        'AAC',
        'FLAC',
        'OGG',
      ],
      correctAnswer: 2,
      explanation: 'FLAC (Free Lossless Audio Codec) é um formato de compressão de áudio sem perdas, preservando a qualidade original.',
    },
    {
      id: 8,
      question: 'O que é "bitrate" em vídeo?',
      options: [
        'Resolução do vídeo',
        'Quantidade de dados processados por segundo',
        'Duração do vídeo',
        'Formato do arquivo',
      ],
      correctAnswer: 1,
      explanation: 'Bitrate é a quantidade de dados processados por unidade de tempo, geralmente medido em Mbps (megabits por segundo).',
    },
    {
      id: 9,
      question: 'Qual é a função de um codec em sistemas multimídia?',
      options: [
        'Apenas reproduzir vídeos',
        'Codificar e decodificar dados de mídia',
        'Armazenar arquivos',
        'Conectar dispositivos',
      ],
      correctAnswer: 1,
      explanation: 'Um codec (codificador-decodificador) é responsável por codificar e decodificar dados de áudio e vídeo para compressão e reprodução.',
    },
    {
      id: 10,
      question: 'O que representa o termo "GOP" em codificação de vídeo?',
      options: [
        'Group of Pictures',
        'Graphics Output Processing',
        'General Operating Protocol',
        'Global Optimization Process',
      ],
      correctAnswer: 0,
      explanation: 'GOP (Group of Pictures) é uma sequência de frames consecutivos em vídeo comprimido, contendo frames I, P e B.',
    },
    {
      id: 11,
      question: 'Qual a diferença entre interlaced e progressive scan?',
      options: [
        'Não há diferença',
        'Interlaced exibe linhas pares e ímpares alternadamente, progressive exibe todas de uma vez',
        'Progressive é mais antigo',
        'Interlaced tem maior resolução',
      ],
      correctAnswer: 1,
      explanation: 'Interlaced scan exibe linhas pares e ímpares em passes alternados, enquanto progressive scan exibe todos os pixels simultaneamente.',
    },
    {
      id: 12,
      question: 'O que é "chroma subsampling" em vídeo digital?',
      options: [
        'Redução de fps',
        'Compressão reduzindo informação de cor',
        'Aumento de resolução',
        'Tipo de codec',
      ],
      correctAnswer: 1,
      explanation: 'Chroma subsampling é uma técnica que reduz a informação de cor (crominância) mantendo a luminância, explorando a menor sensibilidade do olho humano à cor.',
    },
    {
      id: 13,
      question: 'Qual container de vídeo é mais flexível e suporta múltiplos codecs?',
      options: [
        'AVI',
        'MP4',
        'MKV',
        'MOV',
      ],
      correctAnswer: 2,
      explanation: 'MKV (Matroska) é conhecido por sua flexibilidade, suportando praticamente qualquer codec de áudio e vídeo, legendas múltiplas e metadados extensivos.',
    },
    {
      id: 14,
      question: 'O que são "I-frames" em compressão de vídeo?',
      options: [
        'Frames intermediários',
        'Frames de referência completos independentes',
        'Frames invertidos',
        'Frames de áudio',
      ],
      correctAnswer: 1,
      explanation: 'I-frames (Intra-frames) são quadros completos independentes que não dependem de outros frames, servindo como pontos de referência.',
    },
    {
      id: 15,
      question: 'Qual é a taxa de quadros padrão do cinema digital?',
      options: [
        '24 fps',
        '30 fps',
        '60 fps',
        '120 fps',
      ],
      correctAnswer: 0,
      explanation: 'O cinema digital tradicionalmente usa 24 fps (quadros por segundo), herança do cinema em película.',
    },
    {
      id: 16,
      question: 'O que é "HDR" em vídeo?',
      options: [
        'High Definition Resolution',
        'High Dynamic Range',
        'Hardware Data Recovery',
        'High Density Recording',
      ],
      correctAnswer: 1,
      explanation: 'HDR (High Dynamic Range) permite maior contraste entre as áreas mais claras e escuras da imagem, com cores mais vibrantes.',
    },
    {
      id: 17,
      question: 'Qual formato de áudio é mais usado em transmissões broadcast?',
      options: [
        'MP3',
        'WAV',
        'AAC',
        'FLAC',
      ],
      correctAnswer: 2,
      explanation: 'AAC (Advanced Audio Coding) é amplamente usado em broadcast por oferecer boa qualidade com taxas de bits moderadas.',
    },
    {
      id: 18,
      question: 'O que é "aspect ratio" em vídeo?',
      options: [
        'Taxa de compressão',
        'Proporção entre largura e altura da imagem',
        'Velocidade de reprodução',
        'Qualidade do áudio',
      ],
      correctAnswer: 1,
      explanation: 'Aspect ratio é a relação proporcional entre a largura e altura da imagem, como 16:9 ou 4:3.',
    },
    {
      id: 19,
      question: 'Qual é a diferença entre VBR e CBR em codificação?',
      options: [
        'VBR varia o bitrate, CBR mantém constante',
        'São o mesmo',
        'VBR é mais rápido',
        'CBR tem melhor qualidade sempre',
      ],
      correctAnswer: 0,
      explanation: 'VBR (Variable Bitrate) ajusta o bitrate conforme a complexidade do conteúdo, enquanto CBR (Constant Bitrate) mantém taxa fixa.',
    },
    {
      id: 20,
      question: 'O que é "latência" em sistemas de streaming?',
      options: [
        'Qualidade do vídeo',
        'Atraso entre captura e exibição',
        'Tamanho do arquivo',
        'Resolução da imagem',
      ],
      correctAnswer: 1,
      explanation: 'Latência é o tempo de atraso entre a captura do vídeo na origem e sua exibição no destino.',
    },
    {
      id: 21,
      question: 'Qual tecnologia permite vídeo 360 graus?',
      options: [
        'H.264 padrão',
        'Projeção equiretangular',
        'MP4 comum',
        'JPEG2000',
      ],
      correctAnswer: 1,
      explanation: 'A projeção equiretangular mapeia a esfera completa em um retângulo 2:1, permitindo vídeo 360 graus.',
    },
    {
      id: 22,
      question: 'O que é "keyframe interval" na codificação de vídeo?',
      options: [
        'Velocidade de reprodução',
        'Distância entre frames I consecutivos',
        'Tamanho do buffer',
        'Taxa de amostragem de áudio',
      ],
      correctAnswer: 1,
      explanation: 'Keyframe interval define a frequência de frames I (keyframes) no vídeo, afetando a capacidade de busca e qualidade.',
    },
  ];

  useEffect(() => {
    selectRandomQuestions();
  }, []);

  const selectRandomQuestions = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 5);
    setCurrentQuestions(selected);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    if (!showResults) {
      playClickSound();
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: answerIndex,
      });
    }
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length === currentQuestions.length) {
      playSubmitSound();
      setShowResults(true);
      const score = calculateScore();
      const percentage = Math.round((score / currentQuestions.length) * 100);
      
      // Play feedback sound after a short delay
      setTimeout(() => {
        if (percentage >= 70) {
          playSuccessSound();
        } else {
          playNeutralSound();
        }
      }, 500);
      
      if (onQuizComplete) {
        onQuizComplete(score, currentQuestions.length);
      }
    }
  };

  const handleReset = () => {
    selectRandomQuestions();
  };

  const calculateScore = () => {
    let correct = 0;
    currentQuestions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const score = showResults ? calculateScore() : 0;
  const percentage = showResults ? Math.round((score / currentQuestions.length) * 100) : 0;

  if (currentQuestions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-slate-600">Carregando questões...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-indigo-900 mb-2">
              Questionário: Vídeo Digital e Multimídia
            </h2>
            <p className="text-slate-600 mb-2">
              Teste seus conhecimentos sobre os conceitos fundamentais de vídeo digital e sistemas multimídia.
              <br />
              <span className="text-sm text-indigo-600 font-medium">5 questões aleatórias de um banco de 22 perguntas</span>
            </p>
          </div>
          <button
            onClick={toggleBackgroundMusic}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-md
              ${isMusicPlaying 
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }
            `}
          >
            <Music className="w-5 h-5" />
            <span>{isMusicPlaying ? 'Música On' : 'Música Off'}</span>
          </button>
        </div>

        {showResults && (
          <div className={`
            mb-8 p-6 rounded-xl border-2
            ${percentage >= 70 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' 
              : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300'
            }
          `}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Resultado Final</h3>
                <p className="text-slate-600">
                  Você acertou {score} de {currentQuestions.length} questões
                </p>
              </div>
              <div className={`
                text-5xl font-bold
                ${percentage >= 70 ? 'text-green-600' : 'text-amber-600'}
              `}>
                {percentage}%
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-4">
              <div 
                className={`h-4 rounded-full transition-all duration-500 ${
                  percentage >= 70 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-amber-500 to-orange-500'
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {currentQuestions.map((question, qIndex) => {
            const isAnswered = selectedAnswers[question.id] !== undefined;
            const selectedAnswer = selectedAnswers[question.id];
            const isCorrect = showResults && selectedAnswer === question.correctAnswer;
            const isWrong = showResults && isAnswered && !isCorrect;

            return (
              <div
                key={question.id}
                className={`
                  p-6 rounded-xl border-2 transition-all duration-300
                  ${isCorrect ? 'border-green-300 bg-green-50' : ''}
                  ${isWrong ? 'border-red-300 bg-red-50' : ''}
                  ${!showResults ? 'border-slate-200 hover:border-indigo-300 hover:shadow-md' : ''}
                `}
              >
                {question.imageUrl && (
                  <div className="mb-6 rounded-xl overflow-hidden border-2 border-slate-200">
                    <img 
                      src={question.imageUrl} 
                      alt="Imagem da questão"
                      className="w-full h-64 object-contain bg-slate-50"
                    />
                  </div>
                )}
                
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  {qIndex + 1}. {question.question}
                </h3>

                <div className="space-y-3">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrectOption = index === question.correctAnswer;
                    const showAsCorrect = showResults && isCorrectOption;
                    const showAsWrong = showResults && isSelected && !isCorrectOption;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(question.id, index)}
                        disabled={showResults}
                        className={`
                          w-full p-4 rounded-lg text-left transition-all duration-200
                          flex items-center gap-3
                          ${showAsCorrect ? 'bg-green-100 border-2 border-green-400' : ''}
                          ${showAsWrong ? 'bg-red-100 border-2 border-red-400' : ''}
                          ${!showResults && isSelected ? 'bg-indigo-100 border-2 border-indigo-400' : ''}
                          ${!showResults && !isSelected ? 'bg-slate-50 border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50' : ''}
                          ${showResults && !isSelected && !isCorrectOption ? 'bg-slate-50 border-2 border-slate-200 opacity-50' : ''}
                          disabled:cursor-not-allowed
                        `}
                      >
                        <div className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                          ${showAsCorrect ? 'bg-green-500 border-green-500' : ''}
                          ${showAsWrong ? 'bg-red-500 border-red-500' : ''}
                          ${!showResults && isSelected ? 'bg-indigo-500 border-indigo-500' : ''}
                          ${!showResults && !isSelected ? 'border-slate-300' : ''}
                        `}>
                          {showAsCorrect && <CheckCircle className="w-5 h-5 text-white" />}
                          {showAsWrong && <XCircle className="w-5 h-5 text-white" />}
                          {!showResults && isSelected && (
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span className={`
                          ${showAsCorrect ? 'text-green-900 font-semibold' : ''}
                          ${showAsWrong ? 'text-red-900 font-semibold' : ''}
                          ${!showResults && isSelected ? 'text-indigo-900 font-medium' : ''}
                          ${!showResults && !isSelected ? 'text-slate-700' : ''}
                        `}>
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div className={`
                    mt-4 p-4 rounded-lg
                    ${isCorrect ? 'bg-green-100' : 'bg-blue-50'}
                  `}>
                    <p className="text-sm font-medium text-slate-700 mb-1">
                      {isCorrect ? '✓ Correto!' : 'ℹ Explicação:'}
                    </p>
                    <p className="text-sm text-slate-600">{question.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex gap-4">
          {!showResults ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length !== currentQuestions.length}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
              Enviar Respostas
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Novo Quiz (Perguntas Aleatórias)
            </button>
          )}
        </div>

        {!showResults && (
          <p className="text-center text-sm text-slate-500 mt-4">
            {Object.keys(selectedAnswers).length} de {currentQuestions.length} questões respondidas
          </p>
        )}
      </div>
    </div>
  );
}
