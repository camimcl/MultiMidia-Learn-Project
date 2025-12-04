# Pasta de Áudios

Coloque seus arquivos de áudio (MP3, WAV, OGG) nesta pasta.

## Como adicionar seus áudios:

1. Coloque seus arquivos de áudio nesta pasta `public/audio/`
2. Os arquivos estarão acessíveis através da URL `/audio/nome-do-arquivo.mp3`
3. Atualize o array `audioTracks` em `src/react-app/components/AudioPlayerSection.tsx` com os nomes dos seus arquivos

## Exemplo:

Se você colocar um arquivo chamado `aula1.mp3` nesta pasta, referencie-o como:
```
url: '/audio/aula1.mp3'
```

## Formatos suportados:
- MP3 (recomendado)
- WAV
- OGG
- M4A
