import React from 'react';
import { Phone } from 'lucide-react';
import { CONTACT_PHONE } from '../constants';

export const ClickToCall: React.FC = () => {
  return (
    <a
      href={`tel:${CONTACT_PHONE.replace(/-/g, '')}`}
      className="fixed bottom-6 left-6 z-40 bg-secondary text-primary p-4 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 border-2 border-primary"
      aria-label="התקשר עכשיו"
    >
      <Phone size={28} strokeWidth={2.5} />
    </a>
  );
};