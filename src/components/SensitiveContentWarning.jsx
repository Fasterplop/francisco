import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TriangleAlert, Eye, LogOut } from 'lucide-react';

const TRANSLATIONS = {
  es: {
    title: "Contenido Sensible",
    subtitle: "Aviso de Material Explícito",
    description: "La siguiente galería contiene desnudos artísticos y material visual que podría no ser apto para todo público o menores de edad.",
    confirm: "Soy mayor de 18 años",
    exit: "Salir del sitio",
    disclaimer: "Al entrar, confirmas que eres mayor de edad y accedes bajo tu propia responsabilidad."
  },
  en: {
    title: "Sensitive Content",
    subtitle: "Explicit Material Warning",
    description: "The following gallery contains artistic nudity and visual material that may not be suitable for all audiences or minors.",
    confirm: "I am over 18 years old",
    exit: "Exit site",
    disclaimer: "By entering, you confirm that you are of legal age and access at your own risk."
  }
};

export default function SensitiveContentWarning({ lang = 'es' }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.es;

  useEffect(() => {
    setIsMounted(true);
    // Verificar si el usuario ya aceptó previamente en esta sesión
    const hasConsented = sessionStorage.getItem('adult-content-verified');
    if (hasConsented === 'true') {
      setIsVisible(false);
    } else {
      // Bloquear el scroll del body cuando el modal está activo
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem('adult-content-verified', 'true');
    setIsVisible(false);
    // Restaurar scroll
    document.body.style.overflow = 'unset';
  };

  const handleExit = () => {
    // Redirigir al home
    window.location.href = lang === 'es' ? '/' : '/en';
  };

  // Evitar renderizado en servidor (SSR flash)
  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        >
          {/* FONDO: Oscuro y muy desenfocado para que no se vea nada detrás */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />

          {/* TARJETA DE AVISO */}
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md bg-zinc-900 border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl text-center overflow-hidden"
          >
            {/* Efecto de luz roja/advertencia sutil */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-500/20 blur-[60px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center">
              
              <div className="bg-zinc-800/50 p-4 rounded-full mb-6 border border-white/5 shadow-inner">
                <TriangleAlert size={48} className="text-white" strokeWidth={1.5} />
              </div>

              <h2 className="text-3xl font-serif font-bold text-white mb-2 tracking-wide">
                {t.title}
              </h2>
              <p className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-6">
                {t.subtitle}
              </p>

              <p className="text-zinc-400 text-sm leading-relaxed mb-8 border-y border-white/5 py-6">
                {t.description}
              </p>

              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={handleAccept}
                  className="group w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-accent/20 flex items-center justify-center gap-3"
                >
                  <span>{t.confirm}</span>
                  <Eye size={18} className="group-hover:scale-110 transition-transform"/>
                </button>

                <button 
                  onClick={handleExit}
                  className="w-full bg-transparent text-zinc-500 font-bold uppercase tracking-widest py-3 rounded-xl hover:text-white hover:bg-white/5 transition-colors text-xs flex items-center justify-center gap-2"
                >
                  <LogOut size={14} />
                  {t.exit}
                </button>
              </div>

              <p className="text-zinc-600 text-[10px] mt-6 max-w-xs mx-auto">
                {t.disclaimer}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}