
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Camera, Upload, Loader2, AlertCircle, CheckCircle2, Leaf } from 'lucide-react';
import { Button } from './Button';

export const AIPlantDoctor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const diagnosePlant = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = image.split(',')[1];
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: base64Data,
              },
            },
            {
              text: "You are a professional Israeli gardener. Analyze this plant image. If it looks sick, diagnose the problem and suggest a cure. If it looks healthy, identify the plant and give a maintenance tip. Respond in Hebrew. Keep it professional, helpful, and concise (under 100 words).",
            },
          ],
        },
      });

      setResult(response.text || "לא הצלחנו לנתח את התמונה. נסה שוב.");
    } catch (err) {
      console.error(err);
      setError("אירעה שגיאה בחיבור לבינה המלאכותית. אנא נסה שוב מאוחר יותר.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-secondary/20 max-w-2xl mx-auto">
      <div className="bg-primary p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Leaf size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">דוקטור לצמחים (AI)</h3>
            <p className="text-sm text-white/80">העלו תמונה וקבלו אבחון מקצועי בשניות</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {!image ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary cursor-pointer transition-colors group"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10">
              <Camera size={32} className="text-gray-400 group-hover:text-primary" />
            </div>
            <p className="text-gray-600 font-medium">לחצו להעלאת תמונה או צילום</p>
            <p className="text-gray-400 text-sm mt-1">צדקו את המצלמה אל העלה או הצמח</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative h-64 w-full rounded-xl overflow-hidden bg-gray-100">
              <img src={image} alt="Uploaded plant" className="w-full h-full object-contain" />
              <button 
                onClick={() => setImage(null)}
                className="absolute top-2 left-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                שנה תמונה
              </button>
            </div>

            {loading ? (
              <div className="flex flex-col items-center py-8">
                <Loader2 size={40} className="animate-spin text-primary mb-4" />
                <p className="text-gray-600 font-bold animate-pulse">הדוקטור בודק את הצמח שלכם...</p>
              </div>
            ) : result ? (
              <div className="bg-green-50 border border-green-200 p-6 rounded-xl animate-in fade-in duration-500">
                <div className="flex items-center gap-2 mb-3 text-green-700 font-bold">
                  <CheckCircle2 size={20} />
                  <span>אבחון המומחה:</span>
                </div>
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                  {result}
                </p>
                <div className="mt-6 pt-4 border-t border-green-200">
                   <p className="text-xs text-green-600">
                     * האבחון מבוסס על בינה מלאכותית. למקרים מורכבים מומלץ להזמין ביקור גנן.
                   </p>
                </div>
              </div>
            ) : (
              <Button onClick={diagnosePlant} fullWidth className="py-4">
                אבחן את הצמח עכשיו
              </Button>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
