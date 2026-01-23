import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function MobileMenu({ links, routes, isEs }) {
  const [isOpen, setIsOpen] = useState(false);

  // Bloqueo estricto del scroll al abrir el menú
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh'; 
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Botón Z-Index más alto */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="relative z-[70] text-white p-2 focus:outline-none"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} 
            className="fixed inset-0 bg-black z-[60] flex flex-col justify-center items-center w-screen h-screen"
          >
            
            {/* 1. BLOQUE NAVEGACIÓN (Arriba/Centro) */}
            <ul className="flex flex-col items-center gap-12 mb-16">
              <li>
                <a 
                  href={routes.writer} 
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                >
                  {links.writer}
                </a>
              </li>
              
              <li>
                <a 
                  href={routes.artist} 
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                >
                  {links.artist}
                </a>
              </li>
            </ul>

            {/* Separador Sutil */}
            <div className="w-16 h-px bg-white/10 mb-8"></div>

            {/* 2. BLOQUE IDIOMA (Abajo) */}
            <div className="flex items-center gap-6 text-xl font-bold uppercase tracking-[0.2em]">
              
              {/* Opción EN */}
              {!isEs ? (
                <span className="text-accent cursor-default relative">
                  EN
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"></span>
                </span>
              ) : (
                <a 
                  href={routes.langSwitch} 
                  className="text-zinc-600 hover:text-white transition-colors"
                >
                  EN
                </a>
              )}

              <span className="text-zinc-800">|</span>

              {/* Opción ES */}
              {isEs ? (
                <span className="text-accent cursor-default relative">
                  ES
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"></span>
                </span>
              ) : (
                <a 
                  href={routes.langSwitch} 
                  className="text-zinc-600 hover:text-white transition-colors"
                >
                  ES
                </a>
              )}
              
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}