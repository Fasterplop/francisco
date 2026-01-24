import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

// AHORA RECIBIMOS 'actionText' COMO PROP (con un valor por defecto por seguridad)
export default function BookSlider({ books, actionText = "Ver Detalles" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Estados para controlar el swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Distancia mínima en píxeles para considerar el movimiento como un swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // Reseteamos el valor final
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return; // Si no hubo arrastre, no hacemos nada

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide(); // Deslizar a la izquierda -> Siguiente libro
    } else if (isRightSwipe) {
      prevSlide(); // Deslizar a la derecha -> Libro anterior
    }
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % books.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  const getCardStyle = (index) => {
    const total = books.length;
    const prevIndex = (activeIndex - 1 + total) % total;
    const nextIndex = (activeIndex + 1) % total;

    if (index === activeIndex) {
      return "z-30 scale-100 opacity-100 translate-x-0 rotate-y-0 grayscale-0";
    } else if (index === prevIndex) {
      // MODIFICADO: opacity-80 en móvil para que se vea sin hover, opacity-50 en desktop
      return "z-20 scale-90 opacity-80 md:opacity-50 -translate-x-[70%] md:-translate-x-[130%] rotate-y-12 cursor-pointer hover:opacity-100 transition-all duration-500";
    } else if (index === nextIndex) {
      // MODIFICADO: opacity-80 en móvil para que se vea sin hover, opacity-50 en desktop
      return "z-20 scale-90 opacity-80 md:opacity-50 translate-x-[70%] md:translate-x-[130%] -rotate-y-12 cursor-pointer hover:opacity-100 transition-all duration-500";
    } else {
      return "z-10 scale-50 opacity-0 translate-x-0 pointer-events-none";
    }
  };

  return (
    <div 
      // Se agregan los eventos de touch y la clase touch-pan-y para mejor UX
      className="w-full max-w-7xl mx-auto py-12 relative flex justify-center items-center perspective-container touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      
      <div className="relative w-full h-[550px] md:h-[650px] flex justify-center items-center perspective-[1200px]">
        
        {books.map((book, index) => {
          const isActive = index === activeIndex;
          const positionStyles = getCardStyle(index);

          return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`absolute top-0 transition-all duration-700 cubic-bezier(0.25, 0.46, 0.45, 0.94) transform-style-3d ${positionStyles}`}
            >
              <div className="flex flex-col items-center w-[260px] md:w-[320px]">
                
                {/* --- EFECTO LIBRO 3D (Sin cambios) --- */}
                <div className="relative group w-full">
                  <div 
                    className="relative overflow-hidden rounded-[2px] bg-zinc-800 transition-shadow duration-300"
                    style={{
                      boxShadow: isActive 
                        ? '6px 6px 0 #eee, 7px 7px 0 #ccc, 8px 8px 0 #eee, 9px 9px 0 #ccc, 10px 10px 0 #eee, 20px 25px 30px rgba(0,0,0,0.6)' 
                        : '4px 4px 0 #eee, 5px 5px 0 #ccc, 6px 6px 0 #eee, 10px 15px 20px rgba(0,0,0,0.5)'
                    }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[4%] bg-gradient-to-r from-white/30 to-transparent z-20 pointer-events-none mix-blend-overlay border-r border-white/10"></div>
                    <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-black/20 z-20 pointer-events-none"></div>
                    <img
                      src={book.img}
                      alt={book.title}
                      className="w-full h-[380px] md:h-[480px] object-cover"
                      draggable="false"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-white/5 to-white/20 pointer-events-none mix-blend-overlay"></div>
                  </div>
                </div>

                {/* --- INFORMACIÓN DEL LIBRO --- */}
                <div 
                  className={`mt-10 text-center transition-all duration-500 
                  ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                >
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4 drop-shadow-lg tracking-tight">
                    {book.title}
                  </h3>
                  
                  <a 
                    href={book.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-xs font-bold text-slate-900 bg-white border border-transparent px-8 py-3 rounded-full hover:bg-accent hover:text-white transition-all duration-300 uppercase tracking-[0.2em] shadow-lg hover:shadow-accent/50"
                  >
                    {/* AQUÍ USAMOS LA VARIABLE DE TEXTO */}
                    {actionText}
                  </a>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      <button 
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 text-white/40 hover:text-white hover:scale-110 transition-all p-4"
      >
        <FaChevronLeft size={36} />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 text-white/40 hover:text-white hover:scale-110 transition-all p-4"
      >
        <FaChevronRight size={36} />
      </button>

    </div>
  );
}