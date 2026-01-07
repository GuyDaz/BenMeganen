
import React, { useState, useEffect } from 'react';
import { Calculator, Ruler, Trees, Sprout, Droplets, Check, Info, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '../components/Button';

type ServiceType = 'setup' | 'maintenance' | 'irrigation' | 'cleanup';
type Complexity = 'flat' | 'sloped' | 'complex';

interface EstimateState {
  serviceType: ServiceType;
  area: number;
  complexity: Complexity;
  hasGrass: boolean;
  hasIrrigationComputer: boolean;
  hasLighting: boolean;
}

export const EstimationTool: React.FC = () => {
  const [step, setStep] = useState(1);
  const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(null);
  const [form, setForm] = useState<EstimateState>({
    serviceType: 'setup',
    area: 50,
    complexity: 'flat',
    hasGrass: false,
    hasIrrigationComputer: false,
    hasLighting: false,
  });

  const calculateEstimate = () => {
    let basePrice = 0;
    
    // Base rate per square meter
    const rates: Record<ServiceType, number> = {
      setup: 350,      // Complete garden setup
      maintenance: 15, // Monthly maintenance
      irrigation: 45,  // Irrigation system only
      cleanup: 60      // One time cleanup
    };

    basePrice = form.area * rates[form.serviceType];

    // Complexity Multiplier
    const multipliers: Record<Complexity, number> = {
      flat: 1.0,
      sloped: 1.25,
      complex: 1.5
    };
    basePrice *= multipliers[form.complexity];

    // Add-ons
    let extras = 0;
    if (form.hasGrass) extras += form.area * 120; // Synthetic grass approx
    if (form.hasIrrigationComputer) extras += 600;
    if (form.hasLighting) extras += 2500; // Basic kit

    // Adjust for maintenance minimums
    if (form.serviceType === 'maintenance' && basePrice < 350) {
        basePrice = 350;
        extras = 0; // Extras usually included or separate for maintenance
    }

    const total = basePrice + extras;
    
    // Create a range (+/- 15%)
    setEstimate({
      min: Math.round(total * 0.85),
      max: Math.round(total * 1.15)
    });
  };

  useEffect(() => {
    calculateEstimate();
  }, [form]);

  const handleServiceSelect = (type: ServiceType) => {
    setForm(prev => ({ ...prev, serviceType: type }));
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <div className="bg-primary text-white py-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary/10 rounded-full -mr-10 -mb-10 blur-2xl"></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-4 backdrop-blur-sm">
             <Calculator size={32} className="text-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">מחשבון עלויות גינה</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            קבלו הערכת מחיר ראשונית לפרויקט שלכם בתוך שניות.
            <br/>
            <span className="text-sm opacity-80">* המחירים הם להערכה בלבד ואינם מחייבים</span>
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-3">
            
            {/* Input Section */}
            <div className="md:col-span-2 p-6 md:p-8 space-y-8">
              
              {/* Step 1: Service Type */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <h3 className="font-bold text-lg text-dark">איזה שירות אתם מחפשים?</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'setup', label: 'הקמת גינה', icon: Trees },
                    { id: 'maintenance', label: 'תחזוקה', icon: Sprout },
                    { id: 'irrigation', label: 'מערכת השקיה', icon: Droplets },
                    { id: 'cleanup', label: 'שיקום וניקיון', icon: RefreshCw },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleServiceSelect(item.id as ServiceType)}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 text-center hover:bg-gray-50 ${
                        form.serviceType === item.id 
                          ? 'border-primary bg-primary/5 text-primary' 
                          : 'border-gray-100 text-gray-600'
                      }`}
                    >
                      <item.icon size={24} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Step 2: Area */}
              <section className="border-t border-gray-100 pt-8">
                <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-2">
                     <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                     <h3 className="font-bold text-lg text-dark">מה גודל הגינה?</h3>
                   </div>
                   <div className="bg-secondary/20 text-primary px-3 py-1 rounded-full font-bold">
                     {form.area} מ"ר
                   </div>
                </div>

                <div className="px-2">
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>10 מ"ר</span>
                    <span>250 מ"ר</span>
                    <span>500 מ"ר</span>
                  </div>
                </div>
              </section>

              {/* Step 3: Complexity */}
              <section className="border-t border-gray-100 pt-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <h3 className="font-bold text-lg text-dark">תנאי השטח</h3>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                   {[
                     { id: 'flat', label: 'שטח מישורי', desc: 'גישה נוחה' },
                     { id: 'sloped', label: 'שיפוע קל/בינוני', desc: 'דורש פילוס' },
                     { id: 'complex', label: 'שטח מורכב', desc: 'גישה קשה/טרסות' },
                   ].map(c => (
                     <button
                        key={c.id}
                        onClick={() => setForm({ ...form, complexity: c.id as Complexity })}
                        className={`flex-1 p-3 rounded-lg border text-right transition-all ${
                          form.complexity === c.id 
                            ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                     >
                        <div className={`font-bold ${form.complexity === c.id ? 'text-primary' : 'text-gray-700'}`}>
                          {c.label}
                        </div>
                        <div className="text-xs text-gray-400">{c.desc}</div>
                     </button>
                   ))}
                </div>
              </section>

              {/* Step 4: Extras (Only for Setup) */}
              {form.serviceType === 'setup' && (
                <section className="border-t border-gray-100 pt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <h3 className="font-bold text-lg text-dark">תוספות מיוחדות</h3>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={form.hasGrass}
                        onChange={(e) => setForm({...form, hasGrass: e.target.checked})}
                        className="w-5 h-5 text-primary rounded focus:ring-primary border-gray-300"
                      />
                      <span className="text-gray-700">דשא סינטטי איכותי</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={form.hasIrrigationComputer}
                        onChange={(e) => setForm({...form, hasIrrigationComputer: e.target.checked})}
                        className="w-5 h-5 text-primary rounded focus:ring-primary border-gray-300"
                      />
                      <span className="text-gray-700">מחשב השקיה אוטומטי</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={form.hasLighting}
                        onChange={(e) => setForm({...form, hasLighting: e.target.checked})}
                        className="w-5 h-5 text-primary rounded focus:ring-primary border-gray-300"
                      />
                      <span className="text-gray-700">תאורת גן (מערכת בסיסית)</span>
                    </label>
                  </div>
                </section>
              )}

            </div>

            {/* Result Sidebar */}
            <div className="bg-gray-50 p-6 md:p-8 border-r md:border-r-0 md:border-l border-gray-100 flex flex-col">
               <div className="sticky top-24">
                 <h3 className="text-xl font-bold text-dark mb-6">סיכום הערכה</h3>
                 
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 text-center">
                    <p className="text-gray-500 text-sm mb-2">טווח מחירים משוער</p>
                    {estimate ? (
                      <div className="text-3xl font-bold text-primary animate-in zoom-in duration-300">
                        ₪{estimate.min.toLocaleString()} - ₪{estimate.max.toLocaleString()}
                      </div>
                    ) : (
                      <div className="text-gray-300">...</div>
                    )}
                    <div className="mt-4 flex items-center justify-center gap-1 text-xs text-gray-400 bg-gray-50 py-1 px-2 rounded-lg">
                       <Info size={12} />
                       <span>לא כולל מע"מ</span>
                    </div>
                 </div>

                 <div className="space-y-4 text-sm text-gray-600 mb-8">
                   <div className="flex justify-between border-b border-gray-200 pb-2">
                     <span>סוג שירות:</span>
                     <span className="font-bold text-dark">
                        {form.serviceType === 'setup' && 'הקמת גינה'}
                        {form.serviceType === 'maintenance' && 'תחזוקה חודשית'}
                        {form.serviceType === 'irrigation' && 'מערכת השקיה'}
                        {form.serviceType === 'cleanup' && 'שיקום וניקיון'}
                     </span>
                   </div>
                   <div className="flex justify-between border-b border-gray-200 pb-2">
                     <span>גודל גינה:</span>
                     <span className="font-bold text-dark">{form.area} מ"ר</span>
                   </div>
                   <div className="flex justify-between border-b border-gray-200 pb-2">
                     <span>מורכבות:</span>
                     <span className="font-bold text-dark">
                        {form.complexity === 'flat' && 'רגיל'}
                        {form.complexity === 'sloped' && 'שיפוע'}
                        {form.complexity === 'complex' && 'מורכב'}
                     </span>
                   </div>
                   {form.serviceType === 'setup' && (
                     <div className="pt-2">
                       <span className="block mb-2">תוספות:</span>
                       <ul className="space-y-1 pr-4 list-disc text-gray-500">
                         {form.hasGrass && <li>דשא סינטטי</li>}
                         {form.hasIrrigationComputer && <li>מחשב השקיה</li>}
                         {form.hasLighting && <li>תאורה</li>}
                         {!form.hasGrass && !form.hasIrrigationComputer && !form.hasLighting && <li>ללא תוספות</li>}
                       </ul>
                     </div>
                   )}
                 </div>

                 <Button 
                   fullWidth 
                   onClick={() => {
                     document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
                   }}
                   className="shadow-lg shadow-primary/20 mb-3"
                 >
                   קבל הצעת מחיר מדויקת
                 </Button>
                 <p className="text-xs text-center text-gray-400">
                   * המחיר הסופי ייקבע לאחר פגישת ייעוץ בשטח.
                 </p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
