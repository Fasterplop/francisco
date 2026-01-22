import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

// 1. IMPORTA TUS IMÁGENES AQUÍ
import imgBodypaint from '../assets/woman4.jpg';
import imgWar from '../assets/war.jpg';
import imgGuerra from '../assets/guerra2.jpg';
import imgMarco from '../assets/marco.jpg';
import imgFrancisco from '../assets/francisco.webp';
import { img } from 'framer-motion/client';


// 2. TUS OBRAS
// Nota: El diseño Masonry (tipo Pinterest) depende del tamaño real de tu imagen.
// - Si la imagen es vertical, se verá alta.
// - Si es horizontal, se verá baja.
// - El ancho siempre se ajusta a la columna.
// Puedes usar 'className' para recortar la imagen artificialmente si lo necesitas.

const galleryData = [
  { 
    id: 1, 
    src: imgBodypaint.src, 
    year: '2024',
    title: { es: 'Lienzo Vivo', en: 'Living Canvas' }, 
    category: { es: 'Bodypaint', en: 'Bodypaint' },
    // Sin className: usa el tamaño natural de la foto
  },
  { 
    id: 2, 
    src: imgWar.src, 
    year: '2023',
    title: { es: 'Batalla Celestial', en: 'Celestial Battle' }, 
    category: { es: 'Ilustración Digital', en: 'Digital Illustration' },
    // Ejemplo: Forzar aspecto cuadrado (aspect-square) recortando la imagen
    // className: "aspect-square object-cover" 
  },
  { 
    id: 3, 
    src: imgGuerra.src, 
    year: '2014',
    title: { es: 'Génesis Oscuro', en: 'Dark Genesis' }, 
    category: { es: 'Arte Conceptual', en: 'Conceptual Art' }
  },
  { 
    id: 4, 
    src: imgMarco.src, 
    year: '2023',
    title: { es: 'Memento Mori', en: 'Memento Mori' }, 
    category: { es: 'Clásico / Óleo', en: 'Classic / Oil' }
  },
  // REPETIMOS PARA DEMOSTRAR EL EFECTO MASONRY
  { 
    id: 5, 
    src: imgBodypaint.src, 
    year: '2025',
    title: { es: 'Metamorfosis', en: 'Metamorphosis' }, 
    category: { es: 'Bodypaint', en: 'Bodypaint' }
  },
  { 
    id: 6, 
    src: imgFrancisco.src, 
    year: '2022',
    title: { es: 'Caos', en: 'Chaos' }, 
    category: { es: 'Boceto', en: 'Sketch' }
  },
  { 
    id: 7, 
    src: imgFrancisco.src, 
    year: '2022',
    title: { es: 'Caos', en: 'Chaos' }, 
    category: { es: 'Boceto', en: 'Sketch' }
  },
  { 
    id: 8, 
    src: imgFrancisco.src, 
    year: '2022',
    title: { es: 'Caos', en: 'Chaos' }, 
    category: { es: 'Boceto', en: 'Sketch' }
  },
  { 
    id: 9, 
    src: imgWar.src, 
    year: '2022',
    title: { es: 'Caos', en: 'Chaos' }, 
    category: { es: 'Boceto', en: 'Sketch' }
  }
];

export default function MasonryGallery({ lang = 'es' }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const currentLang = lang || 'es';

  return (
    <>
      {/* CAMBIO CLAVE AQUÍ:
         - md:columns-2 (Tablets: 2 columnas)
         - lg:columns-4 (Laptops/Escritorio: 4 columnas -> ESTO ES LO QUE BUSCAS)
         - gap-6: Espacio entre columnas
      */}
      <div className="columns-1 md:columns-2 lg:columns-4 gap-6 px-4">
        {galleryData.map((art, index) => (
          <motion.div
            key={art.id + index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="break-inside-avoid mb-6 relative group cursor-pointer overflow-hidden rounded-sm bg-zinc-900"
            onClick={() => setSelectedImg(art)}
          >
            <img
              src={art.src}
              alt={art.title[currentLang]}
              className={`w-full transition-transform duration-700 group-hover:scale-105 ${art.className || 'h-auto'}`}
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4">
              <span className="text-[#11B6EB] text-xs tracking-[0.2em] uppercase mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {art.category[currentLang]}
              </span>
              <h3 className="text-white font-serif text-2xl italic translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                {art.title[currentLang]}
              </h3>
              <ZoomIn className="text-white/50 w-6 h-6 mt-4 opacity-0 group-hover:opacity-100 transition-opacity delay-150" />
            </div>
          </motion.div>
        ))}
      </div>

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
                <h2 className="text-2xl md:text-3xl font-serif text-white">{selectedImg.title[currentLang]}</h2>
                <p className="text-[#11B6EB] text-xs uppercase tracking-widest mt-2">
                   {selectedImg.year} • {selectedImg.category[currentLang]}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}