
import React, { useEffect, useState } from 'react';
import { X, Loader2, Newspaper, Calendar } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  body: string;
  date: string;
  url: string;
}

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 101,
    title: 'טיפים לגינון בקיץ הישראלי',
    body: 'הקיץ הגיע וזה הזמן להכין את הגינה שלכם לימים החמים. קבלו את המדריך המלא להשקיה נכונה וחיסכון במים.',
    date: new Date().toLocaleDateString('he-IL'),
    url: 'https://www.google.com/search?q=גינון+בקיץ'
  },
  {
    id: 102,
    title: 'צמחים מומלצים למרפסת מוצלת',
    body: 'יש לכם מרפסת שמש אך ללא שמש ישירה? הנה רשימת הצמחים שישגשגו אצלכם בבית.',
    date: new Date(Date.now() - 86400000 * 2).toLocaleDateString('he-IL'),
    url: 'https://www.google.com/search?q=צמחים+למרפסת+מוצלת'
  },
  {
    id: 103,
    title: 'מהפכת הגינון האורבני',
    body: 'יותר ויותר ישראלים הופכים את הגגות שלהם לגינות ירק פורחות. איך מתחילים ומה כדאי לשתול?',
    date: new Date(Date.now() - 86400000 * 5).toLocaleDateString('he-IL'),
    url: 'https://www.google.com/search?q=גינון+אורבני'
  },
  {
    id: 104,
    title: 'עיצוב גינות יוקרה: הטרנדים החדשים',
    body: 'מהם הטרנדים החמים בעולם עיצוב הגינות לשנת 2024? כל מה שצריך לדעת לפני שמתחילים לשפץ.',
    date: new Date(Date.now() - 86400000 * 7).toLocaleDateString('he-IL'),
    url: 'https://www.google.com/search?q=עיצוב+גינות+יוקרה'
  }
];

export const NewsModal: React.FC<NewsModalProps> = ({ isOpen, onClose }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // Simulate network delay for better UX, but use local data to ensure reliability
      const timer = setTimeout(() => {
        setNews(FALLBACK_NEWS);
        setLoading(false);
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-primary text-white p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Newspaper size={24} />
            </div>
            <h2 className="text-2xl font-bold">חדשות ועדכונים</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 bg-gray-50 flex-grow">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <Loader2 size={48} className="animate-spin mb-4 text-secondary" />
              <p>טוען חדשות...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {news.map((item) => (
                <article key={item.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-2">
                    <Calendar size={16} className="text-secondary mt-1 shrink-0" />
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="group">
                    <h3 className="text-lg font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </a>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-100 flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
};
