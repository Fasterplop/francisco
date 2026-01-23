import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Check, Loader2 } from 'lucide-react';

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch('/api/promo', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
        // Cerrar automáticamente después de 3 segundos si es exitoso
        setTimeout(() => {
            setIsOpen(false);
            setStatus(null);
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 1. Botón Flotante (FAB) */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 bg-accent text-black p-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow"
        aria-label="Aplicar a Bodypaint"
      >
        <Palette size={28} />
      </motion.button>

      {/* 2. Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Fondo oscuro (Backdrop) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Contenido del Modal */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-full max-w-md bg-zinc-900 border border-white/10 p-8 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Botón Cerrar */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                aria-label="Cerrar modal"
              >
                <X size={24} />
              </button>

              {/* Lógica de Estados: Éxito vs Formulario */}
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                  <div className="bg-green-500/10 p-4 rounded-full text-green-500">
                    <Check size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wider">¡Recibido!</h3>
                  <p className="text-gray-400">Gracias por tu interés. Te contactaré pronto.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-2">
                      Bodypaint Gratis
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Busco lienzos para nuevos proyectos artísticos. Si te interesa ser parte de una obra, déjame tus datos.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* --- HONEYPOT (Trampa Anti-Spam) --- */}
                    {/* Invisible para humanos, visible para bots */}
                    <div className="opacity-0 absolute top-0 left-0 h-0 w-0 z-[-1] overflow-hidden">
                      <label htmlFor="confirm_email">No llenar este campo</label>
                      <input
                        type="text"
                        name="confirm_email"
                        id="confirm_email"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                    {/* ----------------------------------- */}

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Nombre</label>
                      <input 
                        name="name" 
                        required 
                        type="text" 
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Email</label>
                      <input 
                        name="email" 
                        required 
                        type="email" 
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Instagram (Opcional)</label>
                      <input 
                        name="instagram" 
                        type="text" 
                        placeholder="@usuario"
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">¿Por qué te interesa?</label>
                      <textarea 
                        name="message" 
                        required 
                        rows="3"
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none transition-colors resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-accent text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="animate-spin" size={20} /> Enviando...</>
                      ) : (
                        'Aplicar Ahora'
                      )}
                    </button>
                    
                    {status === 'error' && (
                      <p className="text-red-500 text-xs text-center mt-2">
                        Hubo un error al enviar. Por favor intenta de nuevo.
                      </p>
                    )}
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}