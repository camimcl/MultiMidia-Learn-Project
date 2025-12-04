# MultiMedia Learn 🎬

Uma plataforma interativa de aprendizado sobre vídeo digital e sistemas multimídia, desenvolvida para auxiliar estudantes a compreender conceitos fundamentais de tecnologia multimídia de forma prática e envolvente.

### 🌐 Demonstração Online
Clique aqui para ver o projeto rodando: [Acessar Projeto](https://hsklhamtyrycg.mocha.app/)


![MultiMedia Learn](https://mocha-cdn.com/019abd73-df6a-720b-9c3d-48a725c07418/image.png_8261.png)

## 📋 Sobre o Projeto

MultiMedia Learn é uma aplicação web educacional que oferece recursos completos para o aprendizado de conceitos de vídeo digital, sistemas multimídia, codificação, compressão e streaming. A plataforma combina vídeos, questionários interativos, reprodutor de áudio e galeria de imagens em uma interface moderna e intuitiva.

## ✨ Funcionalidades

### 🎥 Módulo de Conteúdo
- Vídeos educacionais organizados por tópicos
- 6 módulos temáticos sobre multimídia
- Player de vídeo integrado com YouTube
- Acompanhamento de progresso
- Informações sobre duração e número de vídeos por tópico

### 📝 Sistema de Avaliação
- Questionários com 22 perguntas no banco de dados
- Seleção aleatória de 5 perguntas por quiz
- Feedback imediato com explicações detalhadas
- Perguntas com imagens contextuais
- Efeitos sonoros interativos
- Música de fundo opcional

### 🎵 Reprodutor de Áudio
- Player de áudio completo e funcional
- Controles de play/pause, volume e navegação
- Barra de progresso interativa
- Lista de reprodução
- Interface visual moderna com gradientes

### 🖼️ Galeria de Imagens
- Visualização de imagens vetoriais e matriciais
- Filtros por categoria
- Lightbox para visualização em tela cheia
- Download de imagens
- Interface responsiva

### ♿ Acessibilidade
- Narração de navegação para usuários com deficiência visual
- Áudios descritivos para cada seção
- Sistema de proxy para servir áudios com CORS adequado
- Indicador visual de status de acessibilidade

### 📊 Painel de Desempenho
- Histórico completo de questionários realizados
- Cálculo de média de desempenho
- Acompanhamento de vídeos assistidos
- Estatísticas visuais com gráficos e barras de progresso

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **React Router** - Roteamento SPA
- **Lucide React** - Biblioteca de ícones

### Backend
- **Cloudflare Workers** - Serverless runtime
- **Hono** - Framework web minimalista
- **Cloudflare D1** - Banco de dados SQLite

### Recursos Adicionais
- **Google Fonts (Inter)** - Tipografia
- **YouTube Embed API** - Player de vídeos
- **Web Audio API** - Reprodução de áudio e efeitos sonoros

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou bun instalado

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd multimedia-learn
```

2. Instale as dependências:
```bash
npm install
# ou
bun install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
bun run dev
```

4. Acesse a aplicação em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
multimedia-learn/
├── public/
│   └── audio/              # Arquivos de áudio locais
├── src/
│   ├── react-app/
│   │   ├── components/     # Componentes React reutilizáveis
│   │   │   ├── AudioPlayerSection.tsx
│   │   │   ├── ContentSection.tsx
│   │   │   ├── ImageGallerySection.tsx
│   │   │   └── QuizSection.tsx
│   │   ├── hooks/          # React hooks customizados
│   │   │   └── useQuizSounds.ts
│   │   ├── pages/          # Páginas/rotas
│   │   │   └── Home.tsx
│   │   ├── App.tsx         # Componente raiz
│   │   └── main.tsx        # Entry point
│   ├── shared/
│   │   └── types.ts        # Tipos compartilhados
│   └── worker/
│       └── index.ts        # Cloudflare Worker API
├── index.html              # HTML principal
├── tailwind.config.js      # Configuração Tailwind
└── package.json
```

## 🎨 Características de Design

- **Interface Moderna**: Design inspirado em plataformas como Linear e Notion
- **Gradientes e Efeitos**: Uso extensivo de gradientes, sombras e efeitos visuais
- **Responsividade**: Otimizado para desktop e mobile
- **Animações Suaves**: Transições e animações CSS fluidas
- **Paleta de Cores**: Baseada em índigo, azul, roxo e rosa
- **Tipografia**: Inter como fonte principal

## 👥 Colaboradores

- **Camile Marcele** - Desenvolvedora
- **Rafaella Guedes** - Design
- **João Victor** - Desenvolvedor
- **Milena Oliveira** - Slides e apresentação
- **Maria Eduarda** - Áudio e Vídeo
- **Ellen Vitória** - Design

## 📚 Conteúdo Educacional

### Módulos Disponíveis:
1. Edições de vídeo Autorais
2. Animações
3. Codificação e Compressão de Vídeo
4. Sistemas de Streaming
5. Edição e Processamento de Vídeo
6. Áudio em Sistemas Multimídia

### Tópicos do Questionário:
- Formatos de arquivo e codecs (H.264, H.265, VP9)
- Resolução e frame rate
- Streaming adaptativo (HLS, DASH)
- Imagens vetoriais vs. matriciais
- Compressão de áudio e vídeo
- GOP e estrutura de frames
- HDR e aspect ratio
- Latência em sistemas de streaming
- E muito mais!

## 🔧 Recursos Técnicos

### API Endpoints

#### `/api/audio-proxy/:fileId`
Proxy para servir arquivos de áudio do Google Drive com cabeçalhos CORS corretos.

**Parâmetros:**
- `fileId` - ID do arquivo no Google Drive

**Resposta:**
- Content-Type: `audio/mpeg`
- Headers CORS adequados

## 🌐 Deploy

A aplicação está configurada para deploy no Cloudflare Pages com Workers integrados:

```bash
npm run deploy
# ou
bun run deploy
```

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📧 Contato

Para dúvidas ou sugestões sobre o projeto, entre em contato com a equipe de desenvolvimento.

---

Desenvolvido com ❤️ pela equipe MultiMedia Learn
