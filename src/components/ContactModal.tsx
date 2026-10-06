import React, { useState } from 'react';
import { X, Send, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Koffi & Diabaté Architectes',
    email: '',
    message: 'Bonjour l’équipe AFRIKAFUN, nous souhaitons planifier une réunion de cadrage pour la production du film...',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#10121a] rounded-2xl border border-white/20 p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <span className="text-[11px] font-mono text-[#ff3b1d] uppercase font-bold tracking-wider">
              PRISE DE CONTACT DIRECTE
            </span>
            <h3 className="font-display font-black text-xl text-white uppercase mt-0.5">
              AFRIKAFUN PRODUCTION
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#00ff66] mx-auto animate-bounce" />
            <h4 className="font-display font-bold text-xl text-white">Demande transmise avec succès !</h4>
            <p className="text-xs text-neutral-400 font-mono">
              L'équipe de production AFRIKAFUN prendra attache avec Koffi &amp; Diabaté dans les plus brefs délais.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase mb-1">
                Interlocuteur / Structure
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm focus:border-[#ff3b1d] focus:outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase mb-1">
                Adresse Email professionnelle
              </label>
              <input
                type="email"
                required
                placeholder="contact@koffi-diabate.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm focus:border-[#ff3b1d] focus:outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase mb-1">
                Message / Modalités de cadrage
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm focus:border-[#ff3b1d] focus:outline-none font-sans"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#ff3b1d] hover:bg-[#e03014] text-white font-display font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#ff3b1d]/20 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Confirmer l'intérêt &amp; Planifier la réunion</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
