import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom'; // <--- IMPORTANTE: Importamos createPortal
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// 1. OLEOS (.png)
import oleo1 from '../assets/OLEOS/1.png';
import oleo2 from '../assets/OLEOS/2.png';
import oleo3 from '../assets/OLEOS/3.png';
import oleo4 from '../assets/OLEOS/4.png';
import oleo5 from '../assets/OLEOS/5.png';
import oleo6 from '../assets/OLEOS/6.png';
import oleo7 from '../assets/OLEOS/7.png';
import oleo8 from '../assets/OLEOS/8.png';
import oleo9 from '../assets/OLEOS/9.png';
import oleo10 from '../assets/OLEOS/10.png';
import oleo11 from '../assets/OLEOS/11.png';
import oleo12 from '../assets/OLEOS/12.png';
import oleo13 from '../assets/OLEOS/13.png';

// 2. PASTELES (.jpeg) - Nota: Carpeta "Pasteles"
import pastel1 from '../assets/Pasteles/1.jpeg';
import pastel2 from '../assets/Pasteles/2.jpeg';
import pastel3 from '../assets/Pasteles/3.jpeg';
import pastel4 from '../assets/Pasteles/4.jpeg';
import pastel5 from '../assets/Pasteles/5.jpeg';
import pastel6 from '../assets/Pasteles/6.jpeg';
import pastel7 from '../assets/Pasteles/7.jpeg';
import pastel8 from '../assets/Pasteles/8.jpeg';
import pastel9 from '../assets/Pasteles/9.jpeg';
import pastel10 from '../assets/Pasteles/10.jpeg';
import pastel11 from '../assets/Pasteles/11.jpeg';

// 3. ACUARELAS (.jpg) - Nota: Carpeta "acuarelas"
import acuarela1 from '../assets/acuarelas/1.jpg';
import acuarela2 from '../assets/acuarelas/2.jpg';
import acuarela3 from '../assets/acuarelas/3.jpg';
import acuarela4 from '../assets/acuarelas/4.jpg';
import acuarela5 from '../assets/acuarelas/5.jpg';
import acuarela6 from '../assets/acuarelas/6.jpg';
import acuarela7 from '../assets/acuarelas/7.jpg';
import acuarela8 from '../assets/acuarelas/8.jpg';
import acuarela9 from '../assets/acuarelas/9.jpg';
import acuarela10 from '../assets/acuarelas/10.jpg';
import acuarela11 from '../assets/acuarelas/11.jpg';
import acuarela12 from '../assets/acuarelas/12.jpg';
import acuarela13 from '../assets/acuarelas/13.jpg';

// 4. BODYPAINT (.png) - Nota: Carpeta "bodypaint"
import body1 from '../assets/bodypaint/1.png';
import body3 from '../assets/bodypaint/3.png';
import body5 from '../assets/bodypaint/5.png';
import body7 from '../assets/bodypaint/7.png';
import body9 from '../assets/bodypaint/9.png';
import body10 from '../assets/bodypaint/10.png';
import body11 from '../assets/bodypaint/11.png';
import body12 from '../assets/bodypaint/12.png';

// 5. CATRINA (.png) - Nota: Carpeta "bodypaintcatrina"
import catrina1 from '../assets/bodypaintcatrina/1.png';
import catrina5 from '../assets/bodypaintcatrina/5.png';
import catrina6 from '../assets/bodypaintcatrina/6.png';
import catrina7 from '../assets/bodypaintcatrina/7.png';
import catrina9 from '../assets/bodypaintcatrina/9.png';

// 6. HADA DEL AGUA (.png) - Nota: Carpeta "bodypainthadadelagua"
import hada2 from '../assets/bodypainthadadelagua/2.png';
import hada7 from '../assets/bodypainthadadelagua/7.png';
import hada9 from '../assets/bodypainthadadelagua/9.png';
import hada11 from '../assets/bodypainthadadelagua/11.png';
import hada18 from '../assets/bodypainthadadelagua/18.png';
import hada19 from '../assets/bodypainthadadelagua/19.png';
import hada22 from '../assets/bodypainthadadelagua/22.png';
import hada26 from '../assets/bodypainthadadelagua/26.png';

// 2. CONFIGURACIÓN DE FILTROS
const FILTERS = [
  { id: 'all', label: { es: 'Todo', en: 'All' } },
  { id: 'bodypaint', label: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 'oil', label: { es: 'Óleo', en: 'Oil' } },
  { id: 'watercolor', label: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 'pastel', label: { es: 'Pasteles', en: 'Pastels' } }
];

// --- 3. TUS OBRAS (NUEVA LISTA MEZCLADA) ---
const galleryData = [
  // MEZCLA ALEATORIA
  { id: 0, src: acuarela2.src, year: '2024', title: { es: 'Acuarela II', en: 'Watercolor II' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 1, src: oleo1.src, year: '2024', title: { es: 'Óleo I', en: 'Oil I' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 2, src: catrina1.src, year: '2024', title: { es: 'Catrina I', en: 'Catrina I' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 3, src: acuarela5.src, year: '2024', title: { es: 'Acuarela V', en: 'Watercolor V' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 4, src: hada2.src, year: '2024', title: { es: 'Hada del Agua II', en: 'Water Fairy II' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 5, src: pastel2.src, year: '2024', title: { es: 'Pastel II', en: 'Pastel II' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 6, src: body1.src, year: '2024', title: { es: 'Bodypaint I', en: 'Bodypaint I' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 7, src: oleo3.src, year: '2024', title: { es: 'Óleo III', en: 'Oil III' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 8, src: acuarela12.src, year: '2024', title: { es: 'Acuarela XII', en: 'Watercolor XII' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 9, src: catrina5.src, year: '2024', title: { es: 'Catrina V', en: 'Catrina V' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 10, src: pastel8.src, year: '2024', title: { es: 'Pastel VIII', en: 'Pastel VIII' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 11, src: hada7.src, year: '2024', title: { es: 'Hada del Agua VII', en: 'Water Fairy VII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 12, src: oleo13.src, year: '2024', title: { es: 'Óleo XIII', en: 'Oil XIII' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 13, src: body3.src, year: '2024', title: { es: 'Bodypaint III', en: 'Bodypaint III' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 14, src: acuarela1.src, year: '2024', title: { es: 'Acuarela I', en: 'Watercolor I' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 15, src: catrina6.src, year: '2024', title: { es: 'Catrina VI', en: 'Catrina VI' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 16, src: pastel11.src, year: '2024', title: { es: 'Pastel XI', en: 'Pastel XI' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 17, src: oleo7.src, year: '2024', title: { es: 'Óleo VII', en: 'Oil VII' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 18, src: body5.src, year: '2024', title: { es: 'Bodypaint V', en: 'Bodypaint V' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 19, src: hada9.src, year: '2024', title: { es: 'Hada del Agua IX', en: 'Water Fairy IX' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 20, src: acuarela9.src, year: '2024', title: { es: 'Acuarela IX', en: 'Watercolor IX' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 21, src: oleo10.src, year: '2024', title: { es: 'Óleo X', en: 'Oil X' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 22, src: pastel4.src, year: '2024', title: { es: 'Pastel IV', en: 'Pastel IV' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 23, src: catrina7.src, year: '2024', title: { es: 'Catrina VII', en: 'Catrina VII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 24, src: body7.src, year: '2024', title: { es: 'Bodypaint VII', en: 'Bodypaint VII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 25, src: oleo2.src, year: '2024', title: { es: 'Óleo II', en: 'Oil II' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 26, src: acuarela3.src, year: '2024', title: { es: 'Acuarela III', en: 'Watercolor III' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 27, src: hada11.src, year: '2024', title: { es: 'Hada del Agua XI', en: 'Water Fairy XI' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 28, src: pastel6.src, year: '2024', title: { es: 'Pastel VI', en: 'Pastel VI' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 29, src: body9.src, year: '2024', title: { es: 'Bodypaint IX', en: 'Bodypaint IX' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 30, src: oleo5.src, year: '2024', title: { es: 'Óleo V', en: 'Oil V' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 31, src: catrina9.src, year: '2024', title: { es: 'Catrina IX', en: 'Catrina IX' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 32, src: acuarela11.src, year: '2024', title: { es: 'Acuarela XI', en: 'Watercolor XI' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 33, src: pastel1.src, year: '2024', title: { es: 'Pastel I', en: 'Pastel I' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 34, src: hada18.src, year: '2024', title: { es: 'Hada del Agua XVIII', en: 'Water Fairy XVIII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 35, src: oleo8.src, year: '2024', title: { es: 'Óleo VIII', en: 'Oil VIII' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 36, src: body10.src, year: '2024', title: { es: 'Bodypaint X', en: 'Bodypaint X' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 37, src: acuarela7.src, year: '2024', title: { es: 'Acuarela VII', en: 'Watercolor VII' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 38, src: pastel10.src, year: '2024', title: { es: 'Pastel X', en: 'Pastel X' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 39, src: oleo1.src, year: '2024', title: { es: 'Óleo I', en: 'Oil I' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 40, src: hada19.src, year: '2024', title: { es: 'Hada del Agua XIX', en: 'Water Fairy XIX' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 41, src: body11.src, year: '2024', title: { es: 'Bodypaint XI', en: 'Bodypaint XI' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 42, src: acuarela4.src, year: '2024', title: { es: 'Acuarela IV', en: 'Watercolor IV' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 43, src: pastel5.src, year: '2024', title: { es: 'Pastel V', en: 'Pastel V' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 44, src: oleo11.src, year: '2024', title: { es: 'Óleo XI', en: 'Oil XI' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 45, src: hada22.src, year: '2024', title: { es: 'Hada del Agua XXII', en: 'Water Fairy XXII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 46, src: body12.src, year: '2024', title: { es: 'Bodypaint XII', en: 'Bodypaint XII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 47, src: acuarela10.src, year: '2024', title: { es: 'Acuarela X', en: 'Watercolor X' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 48, src: pastel3.src, year: '2024', title: { es: 'Pastel III', en: 'Pastel III' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 49, src: oleo4.src, year: '2024', title: { es: 'Óleo IV', en: 'Oil IV' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 50, src: hada26.src, year: '2024', title: { es: 'Hada del Agua XXVI', en: 'Water Fairy XXVI' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 51, src: acuarela8.src, year: '2024', title: { es: 'Acuarela VIII', en: 'Watercolor VIII' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 52, src: pastel9.src, year: '2024', title: { es: 'Pastel IX', en: 'Pastel IX' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 53, src: oleo12.src, year: '2024', title: { es: 'Óleo XII', en: 'Oil XII' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 54, src: oleo6.src, year: '2024', title: { es: 'Óleo VI', en: 'Oil VI' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 55, src: pastel7.src, year: '2024', title: { es: 'Pastel VII', en: 'Pastel VII' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 56, src: oleo9.src, year: '2024', title: { es: 'Óleo IX', en: 'Oil IX' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 57, src: acuarela13.src, year: '2024', title: { es: 'Acuarela XIII', en: 'Watercolor XIII' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 58, src: acuarela6.src, year: '2024', title: { es: 'Acuarela VI', en: 'Watercolor VI' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
];

export default function MasonryGallery({ lang = 'es' }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [mounted, setMounted] = useState(false); // Para el Portal
  const currentLang = lang || 'es';

  // Solo podemos usar Portals cuando el componente está montado en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filtramos las imágenes
  const filteredData = useMemo(() => {
    if (activeFilter === 'all') return galleryData;
    return galleryData.filter(item => item.categoryType === activeFilter);
  }, [activeFilter]);

  // Funciones de navegación segura
  const handleNext = useCallback((e) => {
    e?.stopPropagation();
    if (!selectedImg) return;
    const currentIndex = filteredData.findIndex((img) => img.id === selectedImg.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % filteredData.length;
    setSelectedImg(filteredData[nextIndex]);
  }, [selectedImg, filteredData]);

  const handlePrev = useCallback((e) => {
    e?.stopPropagation();
    if (!selectedImg) return;
    const currentIndex = filteredData.findIndex((img) => img.id === selectedImg.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + filteredData.length) % filteredData.length;
    setSelectedImg(filteredData[prevIndex]);
  }, [selectedImg, filteredData]);

  // Manejo de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImg) return;
      if (e.key === 'Escape') setSelectedImg(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImg, handleNext, handlePrev]);

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

      {/* --- GALERÍA MASONRY (SIN LAYOUT PARA EVITAR CAÍDAS) --- */}
      <motion.div 
        className="columns-3 lg:columns-4 gap-2 md:gap-6 px-2 md:px-4 space-y-2 md:space-y-6"
      >
        <AnimatePresence>
          {filteredData.map((art) => (
            <motion.div
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

      {/* --- MODAL CON PORTAL (FUERA DE CUALQUIER SECTION PADRE) --- */}
      {mounted && selectedImg && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setSelectedImg(null)}
          >
            {/* Botón Cerrar (Ajustado para asegurar visibilidad en esquinas) */}
            <button 
                onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
                className="fixed top-4 right-4 md:top-8 md:right-8 text-white z-[100000] p-3 bg-black/50 hover:bg-white/20 rounded-full transition-all border border-white/10"
                aria-label="Cerrar"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Navegación Izquierda */}
            <button
              onClick={handlePrev}
              className="fixed left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all z-[100000] p-2 hover:bg-white/10 rounded-full"
            >
              <ChevronLeft size={40} className="md:w-14 md:h-14" />
            </button>

            {/* Navegación Derecha */}
            <button
              onClick={handleNext}
              className="fixed right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all z-[100000] p-2 hover:bg-white/10 rounded-full"
            >
              <ChevronRight size={40} className="md:w-14 md:h-14" />
            </button>

            {/* Contenedor de Imagen */}
            <motion.div
              layoutId={`img-${selectedImg.id}`}
              className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none" 
            >
              <div 
                  className="pointer-events-auto flex flex-col items-center max-w-full max-h-full"
                  onClick={(e) => e.stopPropagation()} 
              >
                  <img
                    src={selectedImg.src}
                    alt={selectedImg.title[currentLang]}
                    className="w-auto h-auto max-h-[75vh] md:max-h-[85vh] object-contain shadow-2xl border border-white/10"
                  />
                  <div className="mt-4 text-center px-4">
                    <h2 className="text-lg md:text-3xl font-serif text-white">{selectedImg.title[currentLang]}</h2>
                    <p className="text-[#11B6EB] text-xs uppercase tracking-widest mt-2">
                       {selectedImg.year} • {selectedImg.displayCategory[currentLang]}
                    </p>
                  </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body // <-- Aquí está la magia: se renderiza en el body directo
      )}
    </>
  );
}