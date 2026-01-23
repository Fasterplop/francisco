import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Check, Loader2, UserCheck, ArrowRight } from 'lucide-react';

// ==========================================
// DICCIONARIO DE TRADUCCIONES
// ==========================================
const TRANSLATIONS = {
  es: {
    // TEXTO EN DOS LÍNEAS (Más impacto visual)
    fabLine1: "APLICAR A",
    fabLine2: "BODYPAINT GRATIS",
    fabLabel: "Abrir formulario de aplicación",
    
    modalTitle: "Bodypaint Gratis",
    modalDescription: "Busco lienzos para nuevos proyectos artísticos. Completa los datos para evaluar tu perfil.",
    
    nameLabel: "Nombre Completo",
    emailLabel: "Email",
    instagramLabel: "Instagram",
    instagramPlaceholder: "@usuario",
    reasonLabel: "¿Por qué te interesa participar?",
    
    typeLabel: "Tipo de Sesión Preferida",
    typeFull: "Cuerpo Entero",
    typePartial: "Parcial",
    isAdultLabel: "Confirmo que soy mayor de 18 años.",

    honeypotLabel: "No llenar este campo",
    submitButton: "Enviar Solicitud",
    submittingButton: "Procesando...",
    successTitle: "¡Solicitud Recibida!",
    successMessage: "Gracias. Si tu perfil encaja con el concepto artístico actual, te contactaré pronto.",
    errorMessage: "Hubo un error al enviar. Por favor verifica tus datos e intenta de nuevo."
  },
  en: {
    fabLine1: "APPLY FOR",
    fabLine2: "FREE BODYPAINT",
    fabLabel: "Open application form",
    
    modalTitle: "Free Bodypaint",
    modalDescription: "I'm looking for canvases for new artistic projects. Complete the details to evaluate your profile.",
    
    nameLabel: "Full Name",
    emailLabel: "Email",
    instagramLabel: "Instagram",
    instagramPlaceholder: "@username",
    reasonLabel: "Why are you interested in participating?",
    
    typeLabel: "Preferred Session Type",
    typeFull: "Full Body",
    typePartial: "Partial",
    isAdultLabel: "I confirm I am over 18 years old.",

    honeypotLabel: "Do not fill this field",
    submitButton: "Submit Application",
    submittingButton: "Processing...",
    successTitle: "Application Received!",
    successMessage: "Thanks. If your profile fits the current artistic concept, I'll contact you soon.",
    errorMessage: "There was an error sending. Please check your data and try again."
  }
};

export default function PromoModal({ lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.es;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    if (!form.isAdult.checked) {
        alert(lang === 'es' ? "Debes ser mayor de 18 años para participar." : "You must be over 18 to participate.");
        setIsSubmitting(false);
        return;
    }
    
    const formData = new FormData(form);
    
    try {
      const response = await fetch('/api/promo', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
            setIsOpen(false);
            setStatus(null);
        }, 4000);
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
      {/* ========================================
         BOTÓN FLOTANTE: 2 LÍNEAS + ESTILO LEAD MAGNET
         ========================================
      */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40">
        <div className="relative group">
            
            {/* Brillo / Sombra Azul (Efecto Neon/Pulse) */}
            <div className="absolute -inset-1 bg-accent/60 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
            
            <motion.button
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                // Botón Azul (bg-accent) + Texto Negro = Alto Contraste
                className="relative flex items-center gap-3 bg-accent text-black pl-4 pr-6 py-3 rounded-full shadow-xl transition-all border-2 border-accent/50 hover:border-white/50 overflow-hidden"
                aria-label={t.fabLabel}
            >
                {/* Efecto de brillo interior animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>

                {/* Icono */}
                <Palette size={26} strokeWidth={2} className="relative z-10 shrink-0" />
                
                {/* Texto en 2 Líneas */}
                <div className="flex flex-col items-start leading-none relative z-10">
                    <span className="text-[10px] font-bold opacity-80 mb-0.5 tracking-wider">
                        {t.fabLine1}
                    </span>
                    <span className="text-sm font-black uppercase tracking-tight">
                        {t.fabLine2}
                    </span>
                </div>

                {/* Flecha sutil al final */}
                <ArrowRight size={16} className="relative z-10 opacity-60 group-hover:translate-x-1 transition-transform ml-1" />
            </motion.button>
        </div>
      </div>

      {/* MODAL (Formulario Completo - Sin cambios funcionales) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4 md:py-8 overflow-y-auto h-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl my-auto"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-full transition-all z-10"
              >
                <X size={20} />
              </button>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="bg-accent/20 p-5 rounded-full text-accent border border-accent/30"
                  >
                    <Check size={40} strokeWidth={3} />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">{t.successTitle}</h3>
                    <p className="text-zinc-400 text-sm max-w-xs mx-auto">{t.successMessage}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6 pr-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 font-serif italic">
                      {t.modalTitle}
                    </h2>
                    <div className="h-1 w-12 bg-accent rounded-full mb-4"></div>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {t.modalDescription}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="opacity-0 absolute top-0 left-0 h-0 w-0 z-[-1] overflow-hidden">
                      <label htmlFor="confirm_email">{t.honeypotLabel}</label>
                      <input type="text" name="confirm_email" id="confirm_email" tabIndex={-1} autoComplete="off" />
                    </div>

                    <div className="space-y-4">
                        <div className="group">
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1.5 ml-1 font-bold">{t.nameLabel}</label>
                            <input name="name" required type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-all placeholder:text-zinc-700 hover:border-zinc-700" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="group">
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1.5 ml-1 font-bold">{t.emailLabel}</label>
                                <input name="email" required type="email" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-all placeholder:text-zinc-700 hover:border-zinc-700" />
                            </div>
                            <div className="group">
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1.5 ml-1 font-bold">{t.instagramLabel}</label>
                                <input name="instagram" type="text" placeholder={t.instagramPlaceholder} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-all placeholder:text-zinc-700 hover:border-zinc-700" />
                            </div>
                        </div>

                        <div className="group py-2">
                             <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3 ml-1 font-bold">{t.typeLabel} <span className="text-accent">*</span></label>
                             <div className="grid grid-cols-2 gap-3">
                                <label className="relative cursor-pointer">
                                    <input type="radio" name="sessionType" value="Cuerpo Entero" className="peer sr-only" required defaultChecked />
                                    <div className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-center transition-all peer-checked:border-accent peer-checked:bg-accent/5 peer-hover:border-zinc-600">
                                        <span className="block text-sm font-bold text-white peer-checked:text-accent">{t.typeFull}</span>
                                    </div>
                                    <div className="absolute top-2 right-2 text-accent opacity-0 peer-checked:opacity-100 transition-opacity"><Check size={16} strokeWidth={3} /></div>
                                </label>
                                
                                <label className="relative cursor-pointer">
                                    <input type="radio" name="sessionType" value="Parcial" className="peer sr-only" required />
                                    <div className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-center transition-all peer-checked:border-accent peer-checked:bg-accent/5 peer-hover:border-zinc-600">
                                        <span className="block text-sm font-bold text-white peer-checked:text-accent">{t.typePartial}</span>
                                    </div>
                                    <div className="absolute top-2 right-2 text-accent opacity-0 peer-checked:opacity-100 transition-opacity"><Check size={16} strokeWidth={3} /></div>
                                </label>
                             </div>
                        </div>

                        <div className="group">
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1.5 ml-1 font-bold">{t.reasonLabel}</label>
                            <textarea name="message" required rows="2" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-all resize-none placeholder:text-zinc-700 hover:border-zinc-700"></textarea>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 mt-6 bg-zinc-950/50 p-3 rounded-lg border border-white/5">
                        <div className="flex h-6 items-center">
                            <input id="isAdult" name="isAdult" type="checkbox" required className="h-5 w-5 rounded border-zinc-700 bg-zinc-900 text-accent focus:ring-accent cursor-pointer" />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="isAdult" className="font-medium text-white select-none cursor-pointer flex items-center gap-2">
                                {t.isAdultLabel} <UserCheck size={16} className="text-zinc-500 inline" />
                            </label>
                            <p className="text-zinc-500 text-xs">Requisito legal obligatorio.</p>
                        </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-accent hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-4 shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5">
                      {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> {t.submittingButton}</> : t.submitButton}
                    </button>
                    
                    {status === 'error' && (
                      <p className="text-red-400 text-sm font-medium text-center mt-3 bg-red-500/10 py-3 rounded-xl border border-red-500/20">{t.errorMessage}</p>
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