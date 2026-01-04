
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Camera, Upload, Loader2, AlertCircle, CheckCircle2, Leaf, X, RefreshCw, Zap } from 'lucide-react';
import { Button } from './Button';

export const AIPlantDoctor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Stop camera when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    setError(null);
    setIsCameraActive(true);
    setResult(null);
    setImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied", err);
      setError("אין גישה למצלמה. אנא וודאו שאישרתם הרשאות בדפדפן.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImage(dataUrl);
        stopCamera();
      }
    }
  };

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
      
      const prompt = `
        You are "Ben the Expert Gardener" (בן הגנן המומחה). 
        Analyze this plant image. 
        Provide a structured response in Hebrew using this format:
        
        🌿 **זיהוי הצמח**: [Plant Name]
        🔍 **אבחון**: [What is wrong or how is it doing?]
        💊 **טיפול מומלץ**: [Step by step cure or maintenance tip]
        🛡️ **מניעה**: [How to keep it healthy in the future]
        
        Keep it professional, friendly, and very concise. If the image is not a plant, politely ask for a plant photo.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: base64Data } },
            { text: prompt },
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
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-secondary/20 max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-primary p-6 text-white relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-secondary/30 p-3 rounded-2xl backdrop-blur-md">
            <Zap className="text-secondary fill-secondary" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">דוקטור לצמחים (AI)</h3>
            <p className="text-sm text-white/70">אבחון חכם של מחלות וטיפול בצמחים</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Main Interface Area */}
        <div className="relative aspect-square md:aspect-video bg-gray-900 rounded-3xl overflow-hidden mb-6 shadow-inner border-4 border-white">
          
          {/* Initial State / Selection */}
          {!image && !isCameraActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gray-50">
              <Leaf size={64} className="text-primary/20 mb-6" />
              <h4 className="text-xl font-bold text-dark mb-2">מוכנים לבדיקה?</h4>
              <p className="text-gray-500 mb-8 max-w-xs">צלמו את הצמח או העלו תמונה לקבלת אבחון מיידי</p>
              
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <button 
                  onClick={startCamera}
                  className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-primary/10 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                    <Camera size={28} />
                  </div>
                  <span className="font-bold text-primary">צילום במקום</span>
                </button>
                
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-primary/10 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <div className="p-3 bg-secondary/20 rounded-xl group-hover:bg-secondary transition-colors">
                    <Upload size={28} className="text-primary" />
                  </div>
                  <span className="font-bold text-primary">העלאת קובץ</span>
                </button>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            </div>
          )}

          {/* Live Camera View */}
          {isCameraActive && (
            <div className="absolute inset-0 bg-black">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none">
                 <div className="w-full h-full border-2 border-dashed border-white/50 rounded-xl flex items-center justify-center">
                    <div className="w-12 h-12 border-t-2 border-l-2 border-white absolute top-4 left-4" />
                    <div className="w-12 h-12 border-t-2 border-r-2 border-white absolute top-4 right-4" />
                    <div className="w-12 h-12 border-b-2 border-l-2 border-white absolute bottom-4 left-4" />
                    <div className="w-12 h-12 border-b-2 border-r-2 border-white absolute bottom-4 right-4" />
                 </div>
              </div>
              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-4">
                <button 
                  onClick={stopCamera}
                  className="bg-white/20 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/30 transition-colors"
                >
                  <X size={24} />
                </button>
                <button 
                  onClick={capturePhoto}
                  className="bg-white text-primary p-4 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all"
                >
                  <Camera size={32} />
                </button>
              </div>
            </div>
          )}

          {/* Preview Image & Result Animation */}
          {image && (
            <div className="absolute inset-0 bg-gray-100">
              <img src={image} alt="Captured" className="w-full h-full object-cover" />
              
              {/* Scanning Laser Animation */}
              {loading && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="w-full h-1 bg-secondary shadow-[0_0_15px_rgba(181,201,154,0.8)] absolute top-0 animate-scanning" />
                  <div className="absolute inset-0 bg-secondary/10 animate-pulse" />
                </div>
              )}

              {!loading && !result && (
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 px-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setImage(null)}
                    className="bg-white/90 backdrop-blur-sm border-white"
                  >
                    ביטול
                  </Button>
                  <Button onClick={diagnosePlant} className="shadow-2xl">
                    אבחן את הצמח
                  </Button>
                </div>
              )}
            </div>
          )}
          
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Results Display */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="bg-green-50 border border-secondary/30 p-6 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full -mr-12 -mt-12" />
              <div className="flex items-center gap-3 mb-4 text-primary font-bold text-lg border-b border-secondary/20 pb-2">
                <CheckCircle2 size={24} className="text-primary" />
                <span>סיכום אבחון המומחה</span>
              </div>
              <div className="text-gray-800 leading-relaxed whitespace-pre-line assistant-font prose prose-green">
                {result}
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                fullWidth 
                onClick={() => {setResult(null); setImage(null);}}
                className="flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                בדיקה חדשה
              </Button>
              <a href="#contact-form-section" className="w-full">
                <Button fullWidth className="bg-secondary text-primary hover:bg-secondary/80">
                  הזמן גנן לטיפול
                </Button>
              </a>
            </div>
          </div>
        )}

        {/* Loading Message Overlay */}
        {loading && (
          <div className="text-center py-8">
            <Loader2 size={40} className="animate-spin text-primary mx-auto mb-4" />
            <p className="text-primary font-bold text-xl animate-pulse">הדוקטור מנתח את התמונה...</p>
            <p className="text-gray-400 text-sm mt-2">זה עשוי לקחת כמה שניות</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 border border-red-100 shadow-sm animate-shake">
            <AlertCircle size={24} />
            <span className="font-medium">{error}</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scanning {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
        .animate-scanning {
          animation: scanning 3s ease-in-out infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};
