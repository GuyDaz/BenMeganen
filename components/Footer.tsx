import React from 'react';
import { CONTACT_PHONE, WORK_HOURS, SERVICE_AREA } from '../constants';
import { Phone, Clock, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-center md:text-right">
          
          <div>
            <h3 className="text-2xl font-bold mb-4">בן המגנן</h3>
            <p className="text-gray-200 text-lg mb-4">
              מגשימים לכם חלום ירוק.
            </p>
            <p className="text-gray-300 text-sm max-w-md">
              אנו מתמחים בהקמה, עיצוב ותחזוקת גינות ברמה הגבוהה ביותר, תוך שימת דגש על שירות אישי ומקצועיות ללא פשרות.
            </p>
          </div>

          <div className="space-y-4">
             <h3 className="text-xl font-bold mb-4">פרטי התקשרות</h3>
             
             <div className="flex items-center justify-center md:justify-start gap-3">
               <Phone className="text-secondary" size={20} />
               <a href={`tel:${CONTACT_PHONE.replace(/-/g, '')}`} className="hover:text-secondary transition-colors text-lg" dir="ltr">
                 {CONTACT_PHONE}
               </a>
             </div>

             <div className="flex items-center justify-center md:justify-start gap-3">
               <Clock className="text-secondary" size={20} />
               <span>שעות פעילות: {WORK_HOURS}</span>
             </div>

             <div className="flex items-center justify-center md:justify-start gap-3">
               <MapPin className="text-secondary" size={20} />
               <span>אזור שירות: {SERVICE_AREA}</span>
             </div>
          </div>

        </div>
        
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} בן המגנן. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};