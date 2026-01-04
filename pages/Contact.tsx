import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { CONTACT_PHONE, CONTACT_EMAIL, WORK_HOURS, SERVICE_AREA } from '../constants';

export const Contact: React.FC = () => {
  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary text-center mb-16">צור קשר</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Contact Details (Left Column in RTL) */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 h-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-dark mb-8">פרטי התקשרות</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/20 p-3 rounded-full text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">טלפון</h3>
                    <a href={`tel:${CONTACT_PHONE.replace(/-/g, '')}`} className="text-xl text-gray-600 hover:text-primary transition-colors" dir="ltr">
                      {CONTACT_PHONE}
                    </a>
                    <p className="text-sm text-gray-400 mt-1">זמינים לשיחה או ווצאפ</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary/20 p-3 rounded-full text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">אימייל</h3>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg text-gray-600 hover:text-primary transition-colors">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary/20 p-3 rounded-full text-primary">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">שעות פעילות</h3>
                    <p className="text-lg text-gray-600">{WORK_HOURS}</p>
                    <p className="text-sm text-gray-400 mt-1">ימי א' - ה'</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary/20 p-3 rounded-full text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">אזור שירות</h3>
                    <p className="text-lg text-gray-600">{SERVICE_AREA}</p>
                    <p className="text-sm text-gray-400 mt-1">תל אביב, רמת גן, גבעתיים, הרצליה והסביבה</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map (Right Column in RTL) */}
          <div className="h-[400px] lg:h-auto rounded-2xl overflow-hidden shadow-md order-1 lg:order-2 border-4 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27038.56360434255!2d34.781767599999995!3d32.0852999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4ca6193b7c1f%3A0xc1fb72a2c0963f90!2sTel%20Aviv-Yafo!5e0!3m2!1sen!2sil!4v1715423854321!5m2!1sen!2sil" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Tel Aviv"
            ></iframe>
          </div>
          
        </div>
      </div>
    </div>
  );
};