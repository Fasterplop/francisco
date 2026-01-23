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
            <ul className="flex flex-col items-center gap-10">
              <li>
                <a 
                  href={routes.writer} 
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors"
                >
                  {links.writer}
                </a>
              </li>
              
              <li>
                <a 
                  href={routes.artist} 
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors"
                >
                  {links.artist}
                </a>
              </li>

              {/* Contacto eliminado de aquí */}

              <div className="w-16 h-px bg-white/20 my-2"></div>

              {/* Selector de Idioma EN | ES */}
              <li>
                <div className="flex items-center gap-4 text-3xl font-bold uppercase tracking-widest">
                  
                  {/* EN Logic */}
                  {!isEs ? (
                    <span className="text-accent cursor-default">EN</span>
                  ) : (
                    <a 
                      href={routes.langSwitch} 
                      className="text-white/50 hover:text-white transition-colors"
                    >
                      EN
                    </a>
                  )}

                  <span className="text-white/30">|</span>

                  {/* ES Logic */}
                  {isEs ? (
                    <span className="text-accent cursor-default">ES</span>
                  ) : (
                    <a 
                      href={routes.langSwitch} 
                      className="text-white/50 hover:text-white transition-colors"
                    >
                      ES
                    </a>
                  )}
                  
                </div>
              </li>

            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}