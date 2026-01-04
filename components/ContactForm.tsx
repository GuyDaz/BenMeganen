import React, { useState } from 'react';
import { submitLead } from '../services/firebaseService';
import { Button } from './Button';
import { SERVICES_DATA } from '../constants';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    service: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear validation error when user types
    if (e.target.name === 'phone') setValidationError(null);
  };

  const validatePhone = (phone: string) => {
    // Basic regex for Israeli mobile/landline numbers (05X-XXXXXXX or 0X-XXXXXXX)
    const phoneRegex = /^(05\d|0[23489])([-]{0,1})\d{7}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validate Phone
    if (!validatePhone(formData.phone)) {
      setValidationError('אנא הזן מספר טלפון תקין (לדוגמה: 050-1234567)');
      return;
    }

    setStatus('loading');

    try {
      // 1. Save to Database (Firebase) - Keeps a backup record
      const dbSuccess = await submitLead(formData);
      
      if (!dbSuccess) {
        console.warn("Could not save to database, attempting email anyway...");
      }

      // 2. Send Email (EmailJS) - Real Integration
      const SERVICE_ID = "service_l4acjyt"; 
      const TEMPLATE_ID = "template_5ddwodg";
      const PUBLIC_KEY = "HHNDcFaxpDYUTdBlk";

      if (!window.emailjs) {
        throw new Error("EmailJS SDK not loaded. Please check your internet connection.");
      }

      await window.emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          phone: formData.phone,
          city: formData.city,
          service: formData.service,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      // Success state
      setStatus('success');
      setFormData({ name: '', phone: '', city: '', service: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      console.error("Failed to send form:", error);
      setStatus('error');
    }
  };

  return (
    <section className="bg-background py-16 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            רוצה גינה מושלמת? דברו איתנו
          </h2>
          <p className="text-lg text-gray-600">
            השאירו פרטים ונחזור אליכם בהקדם להגשמת החלום הירוק שלכם.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-secondary/20 relative overflow-hidden">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-500">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <CheckCircle size={48} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">תודה!</h3>
              <p className="text-gray-600 text-lg">פנייתך נשלחה בהצלחה. נחזור אליך בקרוב.</p>
              <Button onClick={() => setStatus('idle')} variant="outline" className="mt-6">
                שלח פניה נוספת
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">שם מלא *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="ישראל ישראלי"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">טלפון *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="050-0000000"
                    dir="ltr"
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all text-right ${
                      validationError ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary'
                    }`}
                  />
                  {validationError && (
                    <p className="text-red-500 text-xs mt-1">{validationError}</p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">עיר</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="תל אביב"
                  />
                </div>

                {/* Service */}
                <div className="space-y-2">
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700">סוג השירות</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">בחר שירות...</option>
                    {SERVICES_DATA.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="other">אחר</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">הודעה</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  placeholder="ספר לנו קצת על הגינה שלך..."
                ></textarea>
              </div>

              {/* Error Message */}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle size={20} />
                  <span>אירעה שגיאה בשליחת הטופס. אנא וודאו שכל השדות מלאים ונסו שוב.</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <Button 
                  type="submit" 
                  fullWidth 
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      שולח...
                    </>
                  ) : (
                    'שלח פנייה'
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};