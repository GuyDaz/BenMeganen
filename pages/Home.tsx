
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Check, MapPin, Clock, Sparkles, CloudSun } from 'lucide-react';
import { AIPlantDoctor } from '../components/AIPlantDoctor';
import { WeatherAlert } from '../components/WeatherAlert';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[650px] w-full flex items-center justify-center text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1920&auto=format&fit=crop" 
            alt="Beautiful Garden" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg leading-tight">
            בן המגנן: <span className="text-secondary">מגשימים לכם חלום ירוק</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-light mb-8 text-gray-100 drop-shadow-md">
            שירותי גינון מקצועיים, אבחון AI וייעוץ חכם במרכז הארץ
          </h2>
          
          {/* Quick Weather Banner In Hero */}
          <div className="mb-8 max-w-2xl mx-auto hidden md:block">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1 inline-flex items-center gap-3 pr-4">
                <div className="bg-secondary text-primary p-2 rounded-xl">
                   <CloudSun size={20} />
                </div>
                <span className="text-sm font-medium">בדקו את המלצות ההשקיה שלנו להיום למטה</span>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog">
              <Button variant="secondary" className="text-lg px-8 py-4 w-full sm:w-auto">
                לצפייה בשירותים שלנו
              </Button>
            </Link>
            <a href="#ai-doctor">
              <Button variant="outline" className="text-lg px-8 py-4 w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
                אבחון צמחים ב-AI
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Live Updates Bar (Weather) */}
      <section className="py-8 bg-white border-b border-gray-100 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <WeatherAlert />
        </div>
      </section>

      {/* AI Doctor Section */}
      <section id="ai-doctor" className="py-20 bg-background scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Sparkles size={16} />
              חדש: טכנולוגיה בשירות הגינה
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">הצמח נראה קצת עייף?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              השתמשו בכלי ה-AI המתקדם שלנו לאבחון מהיר של מחלות צמחים או קבלת טיפים לטיפול.
            </p>
          </div>
          <AIPlantDoctor />
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">קצת עלינו</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              אנו ב"בן המגנן" מתמחים בהפיכת חללים חיצוניים לפינות חמד ירוקות ומרהיבות. 
              עם ניסיון רב שנים במרכז הארץ, אנו מביאים איתנו ידע מקצועי, אהבה לטבע ושירות חסר פשרות.
              בין אם אתם צריכים תכנון והקמה מאפס או תחזוקה שוטפת, הצוות שלנו כאן כדי לוודא שהגינה שלכם תפרח.
            </p>
          </div>

          {/* Why Choose Us - Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Check size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-dark">מקצועיות ללא פשרות</h3>
              <p className="text-gray-600">צוות מנוסה ובעל הכשרה מקצועית, המשתמש בציוד המתקדם ביותר ובחומרים איכותיים.</p>
            </div>

            <div className="bg-background p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-dark">שירות מקומי וזמין</h3>
              <p className="text-gray-600">פועלים בכל מרכז הארץ וזמינים לקריאות שירות, תוך היכרות מעמיקה עם האקלים והקרקע באזור.</p>
            </div>

            <div className="bg-background p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-dark">עמידה בלוחות זמנים</h3>
              <p className="text-gray-600">אנו מכבדים את הזמן שלכם, מתחייבים להגיע בזמן שנקבע ולסיים את העבודה במועד.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
