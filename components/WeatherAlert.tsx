
import React, { useState, useEffect } from 'react';
import { Sun, CloudRain, Thermometer, Wind, Droplets, AlertTriangle, CheckCircle, Navigation } from 'lucide-react';

interface WeatherData {
  temp: number;
  precip: number;
  wind: number;
  humidity: number;
  description: string;
  recommendation: string;
  type: 'hot' | 'rain' | 'wind' | 'ideal';
}

export const WeatherAlert: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState('טוען מיקום...');

  const getRecommendation = (temp: number, precip: number, wind: number) => {
    if (precip > 0.5) return { 
      text: "יורד גשם! כבו את מערכת ההשקיה האוטומטית כדי לחסוך במים ולמנוע ריקבון שורשים.",
      type: 'rain' as const
    };
    if (temp > 32) return { 
      text: "גל חום לפנינו! מומלץ להשקות מוקדם בבוקר או מאוחר בערב. הימנעו משתילה חדשה היום.",
      type: 'hot' as const
    };
    if (wind > 35) return { 
      text: "רוחות חזקות. וודאו שצמחים מטפסים קשורים היטב והגנו על שתילים צעירים.",
      type: 'wind' as const
    };
    return { 
      text: "מזג אוויר אידיאלי לגינון! זמן מצוין לדישון, גיזום או שתילה חדשה.",
      type: 'ideal' as const
    };
  };

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&timezone=auto`
        );
        const data = await response.json();
        const current = data.current;
        
        const rec = getRecommendation(current.temperature_2m, current.precipitation, current.wind_speed_10m);
        
        setWeather({
          temp: Math.round(current.temperature_2m),
          precip: current.precipitation,
          wind: Math.round(current.wind_speed_10m),
          humidity: current.relative_humidity_2m,
          description: rec.type === 'rain' ? 'גשום' : rec.type === 'hot' ? 'חם מאוד' : 'בהיר',
          recommendation: rec.text,
          type: rec.type
        });
      } catch (error) {
        console.error("Weather fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    // Default to Tel Aviv
    const defaultLat = 32.0853;
    const defaultLon = 34.7818;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocationName("לפי מיקומך הנוכחי");
          fetchWeather(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          setLocationName("תל אביב (מרכז)");
          fetchWeather(defaultLat, defaultLon);
        }
      );
    } else {
      setLocationName("תל אביב (מרכז)");
      fetchWeather(defaultLat, defaultLon);
    }
  }, []);

  if (loading) return (
    <div className="bg-white/50 animate-pulse h-32 rounded-2xl border border-gray-100 flex items-center justify-center">
      <p className="text-gray-400">מעדכן נתוני מזג אוויר...</p>
    </div>
  );

  if (!weather) return null;

  const typeStyles = {
    hot: "bg-orange-50 border-orange-200 text-orange-800",
    rain: "bg-blue-50 border-blue-200 text-blue-800",
    wind: "bg-gray-100 border-gray-300 text-gray-800",
    ideal: "bg-green-50 border-green-200 text-green-800"
  };

  const Icon = weather.type === 'rain' ? CloudRain : weather.type === 'hot' ? Sun : weather.type === 'wind' ? Wind : CheckCircle;

  return (
    <div className={`rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md ${typeStyles[weather.type]}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Side: Stats */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Thermometer size={24} className="opacity-70" />
            <span className="text-3xl font-bold">{weather.temp}°</span>
          </div>
          
          <div className="h-10 w-px bg-current opacity-20 hidden md:block" />
          
          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <div className="flex items-center gap-1">
              <Droplets size={16} />
              <span>{weather.humidity}% לחות</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind size={16} />
              <span>{weather.wind} קמ"ש</span>
            </div>
            <div className="flex items-center gap-1 opacity-70">
              <Navigation size={14} />
              <span>{locationName}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Recommendation */}
        <div className="flex items-start gap-3 md:max-w-md bg-white/40 p-3 rounded-xl border border-white/40">
          <Icon className="shrink-0 mt-1" size={24} />
          <div>
            <p className="font-bold text-sm mb-1 uppercase tracking-wider opacity-80">המלצת הגנן להיום:</p>
            <p className="text-sm leading-relaxed font-medium">{weather.recommendation}</p>
          </div>
        </div>

      </div>
    </div>
  );
};
