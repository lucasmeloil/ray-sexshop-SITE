import React from 'react';
import { Heart } from 'lucide-react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Background Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-red-50/30 to-gray-100 transition-opacity duration-1000"></div>

      {/* Pulsing Aura Effect */}
      <div className="absolute w-[500px] h-[500px] bg-red-500/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>

      {/* Main Card Container */}
      <div className="relative bg-white/90 backdrop-blur-2xl border border-white/50 p-12 md:p-16 rounded-3xl shadow-2xl shadow-red-900/10 max-w-md w-[90%] text-center transform transition-all duration-500 animate-fade-in-up">
        
        {/* Decorative Roses - Top Left */}
        <div className="absolute -top-6 -left-6 text-6xl opacity-80 animate-[spin_20s_linear_infinite] origin-center">
          🌹
        </div>
        
        {/* Decorative Roses - Top Right */}
        <div className="absolute -top-6 -right-6 text-6xl opacity-80 animate-[spin_20s_linear_infinite_reverse] origin-center">
          🌹
        </div>
        
        {/* Decorative Roses - Bottom Left */}
        <div className="absolute -bottom-6 -left-6 text-5xl opacity-70 animate-[spin_15s_linear_infinite] origin-center">
          🌺
        </div>
        
        {/* Decorative Roses - Bottom Right */}
        <div className="absolute -bottom-6 -right-6 text-5xl opacity-70 animate-[spin_15s_linear_infinite_reverse] origin-center">
          🌺
        </div>

        {/* Heart Icon Section */}
        <div className="relative mx-auto w-32 h-32 mb-8 flex items-center justify-center">
          {/* Outer pulse ring */}
          <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-30"></div>
          
          {/* Middle pulse ring */}
          <div className="absolute inset-2 bg-red-200 rounded-full animate-pulse opacity-40"></div>
          
          {/* Heart container */}
          <div className="relative bg-gradient-to-br from-red-50 via-white to-red-50 p-6 rounded-full shadow-xl border-2 border-red-100 animate-[pulse_2s_ease-in-out_infinite]">
            <Heart 
              size={56} 
              className="text-red-600 fill-red-500 drop-shadow-lg" 
              strokeWidth={1.5}
            />
          </div>
          
          {/* Sparkle effects */}
          <div className="absolute top-0 right-0 text-2xl animate-bounce">✨</div>
          <div className="absolute bottom-0 left-0 text-2xl animate-bounce delay-150">✨</div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight mb-3">
          Carregando
        </h2>
        
        <p className="text-gray-500 text-sm font-light mb-6">
          Preparando sua experiência...
        </p>

        {/* Loading Bar */}
        <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-400 to-red-500 animate-[shimmer_1.5s_infinite] bg-[length:200%_100%]"></div>
        </div>

        {/* Brand */}
        <div className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest font-semibold opacity-60">
          Ray Sexshop & Moda Íntima
        </div>
      </div>
    </div>
  );
};

export default Loader;
