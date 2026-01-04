
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Newspaper, Sparkles } from 'lucide-react';
import { NewsModal } from './NewsModal';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: 'בית', path: '/' },
    { name: 'קטלוג', path: '/catalog' },
    { name: 'צור קשר', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-primary hover:text-secondary focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <div className="bg-primary p-2 rounded-full text-white">
                  <Leaf size={24} />
                </div>
                <span className="font-bold text-2xl text-primary tracking-wide">בן המגנן</span>
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex md:space-x-8 md:space-x-reverse items-center">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-lg font-medium transition-colors ${
                    isActive(link.path) 
                      ? 'text-primary font-bold' 
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="flex items-center gap-2 mr-4 border-r border-gray-200 pr-6">
                <button
                  onClick={() => setIsNewsOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary transition-colors font-medium"
                >
                  <Newspaper size={18} />
                  <span>חדשות</span>
                </button>

                {/* AI Doctor Shortcut */}
                <a
                  href="/#ai-doctor"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-medium text-sm"
                >
                  <Sparkles size={16} />
                  <span>דוקטור AI</span>
                </a>
              </div>
            </div>
            
            <div className="w-8 md:hidden"></div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 absolute w-full top-20 right-0 shadow-lg animate-in slide-in-from-top-5 duration-200">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsNewsOpen(true);
                }}
                className="w-full text-right flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
              >
                <Newspaper size={20} />
                <span>חדשות ועדכונים</span>
              </button>

              <a
                href="/#ai-doctor"
                onClick={() => setIsOpen(false)}
                className="w-full text-right flex items-center gap-3 px-3 py-3 rounded-md text-base font-bold text-primary bg-primary/5"
              >
                <Sparkles size={20} />
                <span>דוקטור לצמחים (AI)</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      <NewsModal isOpen={isNewsOpen} onClose={() => setIsNewsOpen(false)} />
    </>
  );
};
