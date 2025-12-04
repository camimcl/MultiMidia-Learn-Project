import { useState } from 'react';
import { X, ZoomIn, Download, Image as ImageIcon } from 'lucide-react';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  description: string;
  category: string;
}

export default function ImageGallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const images: GalleryImage[] = [
    {
      id: 1,
      url: 'https://images.vexels.com/media/users/3/114124/raw/2652e508767a00ad44af0d5381e2240e-vetor-de-tomate.jpg',
      title: 'Imagem vetorial',
      description: 'Tomate Vector',
      category: 'Vetorial',
    },
    {
      id: 2,
      url: 'https://images.vexels.com/media/users/3/75896/raw/b68ecc3ef4c28c35db1cbd50f4e35c1a-ponteiros-do-mouse-de-vetor.jpg',
      title: 'Imagem Vetorial',
      description: 'Cursor Vector',
      category: 'Vetorial',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      title: 'Exemplo de Imagem 3',
      description: 'Robótica e automação',
      category: 'Ciência',
    },
    {
      id: 4,
      url: 'https://mocha-cdn.com/019abd73-df6a-720b-9c3d-48a725c07418/whatsapp.svg',
      title: 'Imagem vetorial',
      description: 'Whatsapp Vector',
      category: 'Vetorial',
    },
    {
      id: 5,
      url: 'https://mocha-cdn.com/019abd73-df6a-720b-9c3d-48a725c07418/github.svg',
      title: 'Imagem vetorial',
      description: 'Github Vector',
      category: 'Vetorial',
    },
    {
      id: 6,
      url: 'https://mocha-cdn.com/019abd73-df6a-720b-9c3d-48a725c07418/wallpaper.jpg',
      title: 'Imagem Matricial',
      description: 'Wallpaper Evangelion',
      category: 'Matricial',
    },
    {
      id: 7,
      url: 'https://mocha-cdn.com/019abd73-df6a-720b-9c3d-48a725c07418/trabalho_2-(sem-fundo).svg',
      title: 'Imagem Vetorial',
      description: 'Trabalho 2',
      category: 'Vetorial',
    },
  ];

  const categories = ['Todas', ...Array.from(new Set(images.map(img => img.category)))];

  const filteredImages = selectedCategory === 'Todas' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Galeria de Imagens
          </h2>
          <p className="text-purple-100">
            Explore e visualize imagens da coleção
          </p>
        </div>

        {/* Category Filter */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-6 py-2 rounded-full font-medium transition-all duration-300
                  ${selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:scale-105'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="p-8">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  onClick={() => openLightbox(image)}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-slate-100 aspect-square"
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                      <p className="text-slate-200 text-sm">{image.description}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="px-3 py-1 bg-purple-500/80 text-white text-xs rounded-full">
                          {image.category}
                        </span>
                        <ZoomIn className="w-5 h-5 text-white ml-auto" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">Nenhuma imagem encontrada nesta categoria</p>
            </div>
          )}
        </div>
  
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div
            className="max-w-5xl w-full animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-slate-300 mb-4">{selectedImage.description}</p>
              <div className="flex items-center justify-center gap-3">
                <span className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-medium">
                  {selectedImage.category}
                </span>
                <a
                  href={selectedImage.url}
                  download
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-200 hover:scale-105 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
