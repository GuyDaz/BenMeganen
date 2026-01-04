import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { SERVICES_DATA } from '../constants';
import { Button } from '../components/Button';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES_DATA.find(s => s.slug === slug);

  if (!service) {
    return <Navigate to="/catalog" replace />;
  }

  // Robust way to generate consistent random images based on service ID, 
  // ensuring it works even if ID is not a number.
  const getSafeSeed = (id: string, index: number) => {
    // Simple hash of the ID string + index
    let hash = 0;
    const str = id + index.toString();
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % 1000;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header / Hero */}
      <div className="relative h-[400px]">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white tracking-wide">{service.title}</h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3 border-b border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary">בית</Link>
            <ChevronRight size={14} />
            <Link to="/catalog" className="hover:text-primary">קטלוג</Link>
            <ChevronRight size={14} />
            <span className="text-primary font-semibold">{service.title}</span>
         </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">תיאור השירות</h2>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {service.description}
              </p>
            </div>

            <div className="bg-background p-8 rounded-xl border border-secondary/30">
              <h3 className="text-xl font-bold text-dark mb-6">מה השירות כולל?</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Gallery Placeholder (Grid of images) */}
            <div>
              <h3 className="text-xl font-bold text-dark mb-6">גלריית עבודות</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {[1, 2, 3, 4, 5, 6].map((i) => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/400/300?random=${getSafeSeed(service.id, i)}`}
                      alt="Gallery"
                      className="rounded-lg shadow-sm w-full h-40 object-cover hover:opacity-90 transition-opacity cursor-pointer"
                    />
                 ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Pricing */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">תמחור</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-gray-500 text-lg">החל מ-</span>
                <span className="text-4xl font-bold text-primary">₪{service.priceStart.toLocaleString()}</span>
              </div>
              
              <div className="space-y-4 mb-8">
                 <p className="text-sm text-gray-500">
                   * המחיר משתנה בהתאם לגודל הגינה ומורכבות העבודה.
                 </p>
                 <p className="text-sm text-gray-500">
                   * כולל פגישת ייעוץ ראשונית.
                 </p>
              </div>

              <a href="#contact-form-section" onClick={(e) => {
                e.preventDefault();
                document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' }); // Scroll towards bottom where form is
              }}>
                <Button fullWidth className="py-4 text-lg shadow-primary/30">
                  לקבלת הצעת מחיר
                </Button>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};