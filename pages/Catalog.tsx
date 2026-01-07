
import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../constants';
import { Button } from '../components/Button';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Service } from '../types';

export const Catalog: React.FC = () => {
  
  const handleShare = async (e: React.MouseEvent, service: Service) => {
    e.preventDefault();
    const shareUrl = `${window.location.origin}${window.location.pathname}#/catalog/${service.slug}`;
    
    const shareData = {
      title: `בן המגנן - ${service.title}`,
      text: service.shortDescription,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.debug('Share cancelled or failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('הקישור הועתק ללוח!');
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">השירותים שלנו</h1>
          <p className="text-xl text-gray-600">מגוון פתרונות מקצועיים לגינה שלכם</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SERVICES_DATA.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full border border-gray-100">
              {/* Image Placeholder */}
              <div className="h-56 bg-gray-200 flex items-center justify-center text-gray-400">
                <span>{service.title}</span>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-primary">{service.title}</h3>
                  <button 
                    onClick={(e) => handleShare(e, service)}
                    className="text-gray-400 hover:text-primary transition-colors p-1 rounded-full hover:bg-gray-50"
                    aria-label={`שתף ${service.title}`}
                    title="שתף שירות זה"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6 flex-1 text-lg">
                  {service.shortDescription}
                </p>
                <Link to={`/catalog/${service.slug}`} className="mt-auto">
                  <Button variant="outline" fullWidth className="group flex items-center justify-center gap-2">
                    לפרטים נוספים
                    <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
