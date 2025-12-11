
import React from 'react';
import { Heart, Mail, MapPin, Clock, Phone, CheckCircle2, Instagram, MessageCircle } from 'lucide-react';

const BRAND_LOGO_URL = 'https://image2url.com/images/1761343291020-59b1ead0-0c00-4f56-ade4-696d390a6c7b.png';

const Footer: React.FC = () => {
    const quickLinks = [
        { name: 'Início', href: '#home' },
        { name: 'Catálogo', href: '#catalog' },
        { name: 'Sobre Nós', href: '#about' },
        { name: 'Contato', href: '#contact' }
    ];

    const confidenceItems = [
        "Produtos Originais",
        "Entrega Discreta",
        "Pagamento Seguro",
        "Atendimento Especializado"
    ];

  return (
    <footer className="bg-gradient-to-b from-white via-gray-50 to-red-50 text-gray-600 py-6 pb-20 md:py-12 md:pb-12 lg:py-16 lg:pb-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200 relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#dc2626 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Grid: 2 colunas no mobile, 4 no desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12 mb-5 md:mb-10">
            
            {/* Column 1: Logo and Social - Mobile Left */}
            <div className="flex flex-col items-start text-left">
                <img src={BRAND_LOGO_URL} alt="Ray Sexshop Logo" className="h-8 md:h-10 lg:h-12 w-auto mb-3 md:mb-4" />
                <p className="text-xs md:text-sm lg:text-sm max-w-xs text-gray-500 leading-relaxed font-light mb-4 md:mb-5 hidden md:block">
                    Sua boutique de prazer. Moda íntima e produtos sensuais com estética elegante.
                </p>
                
                {/* Social Media */}
                <div className="flex space-x-2 md:space-x-3">
                    <a 
                        href="https://instagram.com/ray_sexshop_cvel" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="transition-transform transform hover:scale-110"
                        aria-label="Instagram"
                    >
                        <div className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-600 hover:border-red-600 group transition-all duration-300 shadow-sm">
                            <Instagram className="text-gray-400 group-hover:text-white transition-colors" size={16} />
                        </div>
                    </a>
                    <a 
                        href="https://wa.me/5545991484617" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="transition-transform transform hover:scale-110"
                        aria-label="WhatsApp"
                    >
                        <div className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-green-600 hover:border-green-600 group transition-all duration-300 shadow-sm">
                            <MessageCircle className="text-gray-400 group-hover:text-white transition-colors" size={16} />
                        </div>
                    </a>
                </div>
                
                {/* Quick Links - Mobile: Abaixo do logo */}
                <div className="mt-4 md:hidden">
                    <h3 className="text-gray-900 font-bold mb-2 uppercase tracking-wider text-xs">
                       Links
                    </h3>
                    <ul className="space-y-1.5 text-xs">
                        {quickLinks.map(link => (
                             <li key={link.name}>
                                 <a 
                                    href={link.href} 
                                    className="text-gray-500 hover:text-red-600 transition-colors"
                                 >
                                    {link.name}
                                 </a>
                             </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Column 2: Contact - Mobile Right */}
            <div className="text-left">
                <h3 className="text-gray-900 font-bold mb-2 md:mb-4 uppercase tracking-wider text-xs md:text-sm">
                   Contato
                </h3>
                <ul className="space-y-2 md:space-y-2.5 text-xs md:text-sm text-gray-500">
                    <li className="flex items-start gap-2">
                        <MapPin size={14} className="text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">
                            Av. Brasil, 6282<br/>
                            Loja 305
                        </span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Clock size={14} className="text-red-600 flex-shrink-0" />
                        <span>Seg-Sáb: 9h-19h</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Phone size={14} className="text-red-600 flex-shrink-0" />
                        <span>(45) 99148-4617</span>
                    </li>
                </ul>
                
                {/* Security - Mobile: Abaixo do contato */}
                <div className="mt-4 md:hidden">
                    <h3 className="text-gray-900 font-bold mb-2 uppercase tracking-wider text-xs">
                        Segurança
                    </h3>
                    <ul className="space-y-1.5 text-xs">
                        {confidenceItems.map(item => (
                            <li key={item} className="flex items-center gap-2 text-gray-500">
                                <CheckCircle2 size={12} className="text-green-500 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {/* Column 3: Quick Links - Desktop Only */}
            <div className="hidden md:block text-left">
                <h3 className="text-gray-900 font-bold mb-3 md:mb-4 uppercase tracking-wider text-xs md:text-sm">
                   Links Rápidos
                </h3>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
                    {quickLinks.map(link => (
                         <li key={link.name}>
                             <a 
                                href={link.href} 
                                className="text-gray-500 hover:text-red-600 transition-colors inline-flex items-center gap-1.5 group"
                             >
                                <span className="w-1 h-1 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                {link.name}
                             </a>
                         </li>
                    ))}
                </ul>
            </div>

            {/* Column 4: Security - Desktop Only */}
            <div className="hidden md:block text-left">
                <h3 className="text-gray-900 font-bold mb-3 md:mb-4 uppercase tracking-wider text-xs md:text-sm">
                    Segurança
                </h3>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
                    {confidenceItems.map(item => (
                        <li key={item} className="flex items-center gap-2 text-gray-500">
                            <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-4 md:mt-8 lg:mt-12 border-t border-gray-200/60 pt-3 md:pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-2 md:gap-3">
          <p className="text-center md:text-left">
            &copy; 2025 Ray Sexshop
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              <span className="hover:text-red-600 cursor-pointer transition-colors">Termos</span>
              <span className="text-gray-300">•</span>
              <span className="hover:text-red-600 cursor-pointer transition-colors">Privacidade</span>
          </div>
        </div>
        
        {/* Developer Credit */}
        <div className="mt-3 md:mt-4 text-center">
          <p className="text-[10px] md:text-xs text-gray-400">
            Desenvolvido por{' '}
            <a 
              href="https://www.nexussofttech.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-600 font-semibold transition-colors"
            >
              Nexus Soft Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
