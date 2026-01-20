// src/components/SocialIcons.jsx
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";

export default function SocialIcons() {
  return (
    <div className="flex gap-6 justify-center items-center p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm w-fit">
      
      {/* Facebook: Azul oficial (#1877F2) */}
      <a 
        href="https://facebook.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:scale-110 transition-transform duration-200"
      >
        <FaFacebook size={32} color="#1877F2" />
      </a>

      {/* Instagram: Rosa/Morado */}
      <a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-pink-600 hover:text-pink-700 hover:scale-110 transition-all duration-200"
      >
        <FaInstagram size={32} />
      </a>

      {/* YouTube: Rojo */}
      <a 
        href="https://youtube.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-red-600 hover:text-red-700 hover:scale-110 transition-all duration-200"
      >
        <FaYoutube size={32} />
      </a>

    </div>
  );
}