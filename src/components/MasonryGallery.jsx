import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

// 1. IMPORTA TUS IMÁGENES AQUÍ
import imgBodypaint from '../assets/woman4.jpg';
import imgWar from '../assets/war.jpg';
import imgGuerra from '../assets/guerra2.jpg';
import imgMarco from '../assets/marco.jpg';
import imgFrancisco from '../assets/francisco.webp';

// 2. CONFIGURACIÓN DE FILTROS
const FILTERS = [
  { id: 'all', label: { es: 'Todo', en: 'All' } },
  { id: 'bodypaint', label: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 'oil', label: { es: 'Óleo', en: 'Oil' } },
  { id: 'watercolor', label: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 'pastel', label: { es: 'Pasteles', en: 'Pastels' } }
];

// 3. TUS OBRAS
const galleryData = [
  { 
    id: 1, 
    src: imgBodypaint.src, 
    year: '2024',
    title: { es: 'Lienzo Vivo', en: 'Living Canvas' }, 
    categoryType: 'bodypaint', 
    displayCategory: { es: 'Bodypaint', en: 'Bodypaint' },
  },
  { 
    id: 2, 
    src: imgWar.src, 
    year: '2023',
    title: { es: 'Batalla Celestial', en: 'Celestial Battle' }, 
    categoryType: 'oil', 
    displayCategory: { es: 'Óleo', en: 'Oil' },
  },
  { 
    id: 3, 
    src: imgGuerra.src, 
    year: '2014',
    title: { es: 'Génesis Oscuro', en: 'Dark Genesis' }, 
    categoryType: 'watercolor',
    displayCategory: { es: 'Acuarela', en: 'Watercolor' }
  },
  { 
    id: 4, 
    src: imgMarco.src, 
    year: '2023',
    title: { es: 'Memento Mori', en: 'Memento Mori' }, 
    categoryType: 'pastel',
    displayCategory: { es: 'Pastel', en: 'Pastel' }
  },
  // REPETIMOS PARA DEMOSTRAR EL EFECTO DE 3 COLUMNAS
  { 
    id: 5, 
    src: imgBodypaint.src, 
    year: '2025',
    title: { es: 'Metamorfosis', en: 'Metamorphosis' }, 
    categoryType: 'bodypaint',
    displayCategory: { es: 'Bodypaint', en: 'Bodypaint' }
  },
  { 
    id: 6, 
    src: imgFrancisco.src, 
    year: '2022',
    title: { es: 'Caos', en: 'Chaos' }, 
    categoryType: 'oil',
    displayCategory: { es: 'Óleo', en: 'Oil' }
  },
  { 
    id: 7, 
    src: imgFrancisco.src, 
    year: '2022',
    title: { es: 'Estudio Azul', en: 'Blue Study' }, 
    categoryType: 'watercolor',
    displayCategory: { es: 'Acuarela', en: 'Watercolor' }
  },
  { 
    id: 8, 
    src: imgWar.src, 
    year: '2022',
    title: { es: 'Visión', en: 'Vision' }, 
    categoryType: 'oil',
    displayCategory: { es: 'Óleo', en: 'Oil' }
  },
  { 
    id: 9, 
    src: imgBodypaint.src, 
    year: '2024',
    title: { es: 'Raíces', en: 'Roots' }, 
    categoryType: 'bodypaint',
    displayCategory: { es: 'Bodypaint', en: 'Bodypaint' }
  }
];

export default function MasonryGallery({ lang = 'es' }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const currentLang = lang || 'es';

  // Filtramos las imágenes
  const filteredData = useMemo(() => {
    if (activeFilter === 'all') return galleryData;
    return galleryData.filter(item => item.categoryType === activeFilter);
  }, [activeFilter]);

  return (
    <>
      {/* --- BOTONES DE FILTRO --- */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 animate-fade-in-up px-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`
              px-4 py-1.5 md:px-6 md:py-2 rounded-full text-xs md:text-sm uppercase tracking-widest transition-all duration-300 border
              ${activeFilter === filter.id 
                ? 'bg-white text-black border-white font-bold' 
                : 'bg-transparent text-gray-400 border-white/20 hover:border-white hover:text-white'}
            `}
          >
            {filter.label[currentLang]}
          </button>
        ))}
      </div>

      {/* --- GALERÍA MASONRY (3 COLUMNAS EN MÓVIL) --- */}
      {/* columns-3: 3 columnas por defecto (móvil)
          gap-2: Espacio pequeño entre fotos para que quepan bien en móvil
          md:columns-3: Mantiene 3 en tablets
          lg:columns-4: Sube a 4 en monitores grandes
          md:gap-6: Aumenta el espacio en pantallas grandes
      */}
      <motion.div 
        layout
        className="columns-3 lg:columns-4 gap-2 md:gap-6 px-2 md:px-4 space-y-2 md:space-y-6"
      >
        <AnimatePresence mode='popLayout'>
          {filteredData.map((art) => (
            <motion.div
              layout
              key={art.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-sm bg-zinc-900 mb-2 md:mb-6"
              onClick={() => setSelectedImg(art)}
            >
              <img
                src={art.src}
                alt={art.title[currentLang]}
                className="w-full h-auto"
                loading="lazy"
              />
              
              {/* Overlay solo visible al pasar el mouse (mejor experiencia en desktop, en móvil requiere toque) */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-2 md:p-4">
                <span className="text-[#11B6EB] text-[0.5rem] md:text-xs tracking-[0.2em] uppercase mb-1 md:mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {art.displayCategory[currentLang]}
                </span>
                <h3 className="text-white font-serif text-sm md:text-2xl italic translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 line-clamp-2">
                  {art.title[currentLang]}
                </h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* --- MODAL (LIGHTBOX) --- */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50">
              <X size={40} />
            </button>

            <motion.div
              layoutId={`img-${selectedImg.id}`}
              className="relative max-w-7xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg.src}
                alt={selectedImg.title[currentLang]}
                className="w-auto h-auto max-h-[85vh] object-contain shadow-2xl border border-white/10"
              />
              <div className="mt-4 text-center">
                <h2 className="text-xl md:text-3xl font-serif text-white">{selectedImg.title[currentLang]}</h2>
                <p className="text-[#11B6EB] text-xs uppercase tracking-widest mt-2">
                   {selectedImg.year} • {selectedImg.displayCategory[currentLang]}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}