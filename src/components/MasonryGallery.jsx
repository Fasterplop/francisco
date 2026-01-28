import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom'; // <--- IMPORTANTE: Importamos createPortal
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// --- (TUS IMPORTACIONES DE IMÁGENES - NO CAMBIAN) ---
// CATRINA BODYPAINT
import catrina4 from '../assets/CATRINABODY/4.png';
import catrina6 from '../assets/CATRINABODY/6.png';
import catrina8 from '../assets/CATRINABODY/8.png';
import catrina10 from '../assets/CATRINABODY/10.png';
import catrina15 from '../assets/CATRINABODY/15.png';
import catrina18 from '../assets/CATRINABODY/18.png';
import catrina19 from '../assets/CATRINABODY/19.png';
import catrina23 from '../assets/CATRINABODY/23.png';
import catrina28 from '../assets/CATRINABODY/28.png';
import catrina29 from '../assets/CATRINABODY/29.png';
import catrina31 from '../assets/CATRINABODY/31.png';
import catrina39 from '../assets/CATRINABODY/39.png';
import catrina41 from '../assets/CATRINABODY/41.png';
import catrina43 from '../assets/CATRINABODY/43.png';

// ACUARELAS
import acuarela1 from '../assets/ACUARELAS/1.png';
import acuarela2 from '../assets/ACUARELAS/2.png';
import acuarela3 from '../assets/ACUARELAS/3.png';
import acuarela4 from '../assets/ACUARELAS/4.png';
import acuarela5 from '../assets/ACUARELAS/5.png';
import acuarela6 from '../assets/ACUARELAS/6.png';
import acuarela7 from '../assets/ACUARELAS/7.png';
import acuarela8 from '../assets/ACUARELAS/8.png';
import acuarela9 from '../assets/ACUARELAS/9.png';
import acuarela10 from '../assets/ACUARELAS/10.png';
import acuarela11 from '../assets/ACUARELAS/11.png';
import acuarela12 from '../assets/ACUARELAS/12.png';
import acuarela13 from '../assets/ACUARELAS/13.png';

// FIRST BODYPAINT
import first2 from '../assets/FIRSTBODY/2.png';
import first4 from '../assets/FIRSTBODY/4.png';
import first5 from '../assets/FIRSTBODY/5.png';
import first6 from '../assets/FIRSTBODY/6.png';
import first7 from '../assets/FIRSTBODY/7.png';
import first8 from '../assets/FIRSTBODY/8.png';
import first9 from '../assets/FIRSTBODY/9.png';
import first11 from '../assets/FIRSTBODY/11.png';
import first13 from '../assets/FIRSTBODY/13.png';
import first15 from '../assets/FIRSTBODY/15.png';
import first16 from '../assets/FIRSTBODY/16.png';
import first17 from '../assets/FIRSTBODY/17.png';
import first18 from '../assets/FIRSTBODY/18.png';

// HADA DEL AGUA BODYPAINT
import hada17 from '../assets/HADABODY/17.png';
import hada18 from '../assets/HADABODY/18.png';
import hada23 from '../assets/HADABODY/23.png';

// OLEOS
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
import oleo14 from '../assets/OLEOS/14.png';
import oleo15 from '../assets/OLEOS/15.png';
import oleo16 from '../assets/OLEOS/16.png';
import oleo17 from '../assets/OLEOS/17.png';
import oleo18 from '../assets/OLEOS/18.png';
import oleo19 from '../assets/OLEOS/19.png';

// PASTELES
import pastel1 from '../assets/PASTELES/1.png';
import pastel2 from '../assets/PASTELES/2.png';
import pastel3 from '../assets/PASTELES/3.png';
import pastel4 from '../assets/PASTELES/4.png';
import pastel5 from '../assets/PASTELES/5.png';
import pastel6 from '../assets/PASTELES/6.png';
import pastel7 from '../assets/PASTELES/7.png';
import pastel8 from '../assets/PASTELES/8.png';
import pastel9 from '../assets/PASTELES/9.png';
import pastel10 from '../assets/PASTELES/10.png';
import pastel11 from '../assets/PASTELES/11.png';

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
  { id: 1, src: oleo14.src, year: '2024', title: { es: 'Óleo XIV', en: 'Oil XIV' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 2, src: catrina31.src, year: '2024', title: { es: 'Catrina XXXI', en: 'Catrina XXXI' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 3, src: acuarela5.src, year: '2024', title: { es: 'Acuarela V', en: 'Watercolor V' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 4, src: pastel2.src, year: '2024', title: { es: 'Pastel II', en: 'Pastel II' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 5, src: first13.src, year: '2024', title: { es: 'Bodypaint XIII', en: 'Bodypaint XIII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 6, src: oleo3.src, year: '2024', title: { es: 'Óleo III', en: 'Oil III' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 7, src: hada18.src, year: '2024', title: { es: 'Hada del Agua XVIII', en: 'Water Fairy XVIII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 8, src: catrina6.src, year: '2024', title: { es: 'Catrina VI', en: 'Catrina VI' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 9, src: acuarela12.src, year: '2024', title: { es: 'Acuarela XII', en: 'Watercolor XII' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 10, src: pastel8.src, year: '2024', title: { es: 'Pastel VIII', en: 'Pastel VIII' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 11, src: oleo19.src, year: '2024', title: { es: 'Óleo XIX', en: 'Oil XIX' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 12, src: first5.src, year: '2024', title: { es: 'Bodypaint V', en: 'Bodypaint V' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 13, src: catrina19.src, year: '2024', title: { es: 'Catrina XIX', en: 'Catrina XIX' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 14, src: oleo7.src, year: '2024', title: { es: 'Óleo VII', en: 'Oil VII' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 15, src: acuarela1.src, year: '2024', title: { es: 'Acuarela I', en: 'Watercolor I' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 16, src: pastel11.src, year: '2024', title: { es: 'Pastel XI', en: 'Pastel XI' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 17, src: hada23.src, year: '2024', title: { es: 'Hada del Agua XXIII', en: 'Water Fairy XXIII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 18, src: first17.src, year: '2024', title: { es: 'Bodypaint XVII', en: 'Bodypaint XVII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 19, src: oleo10.src, year: '2024', title: { es: 'Óleo X', en: 'Oil X' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 20, src: catrina28.src, year: '2024', title: { es: 'Catrina XXVIII', en: 'Catrina XXVIII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 21, src: acuarela9.src, year: '2024', title: { es: 'Acuarela IX', en: 'Watercolor IX' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 22, src: pastel4.src, year: '2024', title: { es: 'Pastel IV', en: 'Pastel IV' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 23, src: oleo2.src, year: '2024', title: { es: 'Óleo II', en: 'Oil II' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 24, src: catrina15.src, year: '2024', title: { es: 'Catrina XV', en: 'Catrina XV' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 25, src: first8.src, year: '2024', title: { es: 'Bodypaint VIII', en: 'Bodypaint VIII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 26, src: oleo16.src, year: '2024', title: { es: 'Óleo XVI', en: 'Oil XVI' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 27, src: acuarela3.src, year: '2024', title: { es: 'Acuarela III', en: 'Watercolor III' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 28, src: pastel6.src, year: '2024', title: { es: 'Pastel VI', en: 'Pastel VI' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 29, src: catrina41.src, year: '2024', title: { es: 'Catrina XLI', en: 'Catrina XLI' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 30, src: first11.src, year: '2024', title: { es: 'Bodypaint XI', en: 'Bodypaint XI' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 31, src: oleo5.src, year: '2024', title: { es: 'Óleo V', en: 'Oil V' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 32, src: acuarela11.src, year: '2024', title: { es: 'Acuarela XI', en: 'Watercolor XI' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 33, src: pastel1.src, year: '2024', title: { es: 'Pastel I', en: 'Pastel I' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 34, src: catrina8.src, year: '2024', title: { es: 'Catrina VIII', en: 'Catrina VIII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 35, src: oleo13.src, year: '2024', title: { es: 'Óleo XIII', en: 'Oil XIII' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 36, src: first2.src, year: '2024', title: { es: 'Bodypaint II', en: 'Bodypaint II' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 37, src: hada17.src, year: '2024', title: { es: 'Hada del Agua XVII', en: 'Water Fairy XVII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 38, src: oleo8.src, year: '2024', title: { es: 'Óleo VIII', en: 'Oil VIII' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 39, src: acuarela7.src, year: '2024', title: { es: 'Acuarela VII', en: 'Watercolor VII' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 40, src: pastel10.src, year: '2024', title: { es: 'Pastel X', en: 'Pastel X' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 41, src: catrina23.src, year: '2024', title: { es: 'Catrina XXIII', en: 'Catrina XXIII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 42, src: oleo1.src, year: '2024', title: { es: 'Óleo I', en: 'Oil I' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 43, src: first15.src, year: '2024', title: { es: 'Bodypaint XV', en: 'Bodypaint XV' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 44, src: acuarela4.src, year: '2024', title: { es: 'Acuarela IV', en: 'Watercolor IV' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 45, src: pastel5.src, year: '2024', title: { es: 'Pastel V', en: 'Pastel V' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 46, src: catrina39.src, year: '2024', title: { es: 'Catrina XXXIX', en: 'Catrina XXXIX' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 47, src: oleo11.src, year: '2024', title: { es: 'Óleo XI', en: 'Oil XI' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 48, src: first6.src, year: '2024', title: { es: 'Bodypaint VI', en: 'Bodypaint VI' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 49, src: acuarela10.src, year: '2024', title: { es: 'Acuarela X', en: 'Watercolor X' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 50, src: pastel3.src, year: '2024', title: { es: 'Pastel III', en: 'Pastel III' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 51, src: catrina10.src, year: '2024', title: { es: 'Catrina X', en: 'Catrina X' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 52, src: oleo17.src, year: '2024', title: { es: 'Óleo XVII', en: 'Oil XVII' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 53, src: first18.src, year: '2024', title: { es: 'Bodypaint XVIII', en: 'Bodypaint XVIII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 54, src: oleo4.src, year: '2024', title: { es: 'Óleo IV', en: 'Oil IV' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 55, src: acuarela8.src, year: '2024', title: { es: 'Acuarela VIII', en: 'Watercolor VIII' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 56, src: pastel9.src, year: '2024', title: { es: 'Pastel IX', en: 'Pastel IX' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 57, src: catrina43.src, year: '2024', title: { es: 'Catrina XLIII', en: 'Catrina XLIII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 58, src: oleo12.src, year: '2024', title: { es: 'Óleo XII', en: 'Oil XII' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 59, src: first4.src, year: '2024', title: { es: 'Bodypaint IV', en: 'Bodypaint IV' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 60, src: oleo6.src, year: '2024', title: { es: 'Óleo VI', en: 'Oil VI' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 61, src: acuarela2.src, year: '2024', title: { es: 'Acuarela II', en: 'Watercolor II' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 62, src: pastel7.src, year: '2024', title: { es: 'Pastel VII', en: 'Pastel VII' }, categoryType: 'pastel', displayCategory: { es: 'Pastel', en: 'Pastel' } },
  { id: 63, src: catrina18.src, year: '2024', title: { es: 'Catrina XVIII', en: 'Catrina XVIII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 64, src: oleo15.src, year: '2024', title: { es: 'Óleo XV', en: 'Oil XV' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 65, src: first9.src, year: '2024', title: { es: 'Bodypaint IX', en: 'Bodypaint IX' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 66, src: oleo9.src, year: '2024', title: { es: 'Óleo IX', en: 'Oil IX' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 67, src: acuarela13.src, year: '2024', title: { es: 'Acuarela XIII', en: 'Watercolor XIII' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 68, src: catrina29.src, year: '2024', title: { es: 'Catrina XXIX', en: 'Catrina XXIX' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 69, src: first7.src, year: '2024', title: { es: 'Bodypaint VII', en: 'Bodypaint VII' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 70, src: oleo18.src, year: '2024', title: { es: 'Óleo XVIII', en: 'Oil XVIII' }, categoryType: 'oil', displayCategory: { es: 'Óleo', en: 'Oil' } },
  { id: 71, src: acuarela6.src, year: '2024', title: { es: 'Acuarela VI', en: 'Watercolor VI' }, categoryType: 'watercolor', displayCategory: { es: 'Acuarela', en: 'Watercolor' } },
  { id: 72, src: catrina4.src, year: '2024', title: { es: 'Catrina IV', en: 'Catrina IV' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } },
  { id: 73, src: first16.src, year: '2024', title: { es: 'Bodypaint XVI', en: 'Bodypaint XVI' }, categoryType: 'bodypaint', displayCategory: { es: 'Bodypaint', en: 'Bodypaint' } }
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