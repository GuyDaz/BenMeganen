import { Service } from './types';

export const SERVICES_DATA: Service[] = [
  {
    id: '1',
    title: 'עיצוב גינות',
    slug: 'garden-design',
    shortDescription: 'תכנון ועיצוב גינות חלומיות המותאמות אישית לצרכים שלכם.',
    description: 'אנו מתמחים בתכנון ועיצוב גינות יוקרה וגינות גג. התהליך כולל פגישת ייעוץ, תכנון אדריכלי, ובחירת צמחייה המתאימה לאקלים הישראלי ולמיקום הגיאוגרפי של הנכס.',
    features: [
      'תכנון אדריכלי מקיף',
      'הדמיות תלת מימד',
      'בחירת צמחייה עמידה וחסכונית במים',
      'שילוב אלמנטים דוממים (דקים, פרגולות)',
      'ליווי אישי עד גמר הביצוע'
    ],
    priceStart: 5000,
    image: 'https://picsum.photos/id/10/800/600' // Forest/Nature placeholder
  },
  {
    id: '2',
    title: 'מערכות השקיה',
    slug: 'irrigation-systems',
    shortDescription: 'פתרונות השקיה חכמים וחסכוניים במים לגינה ירוקה כל השנה.',
    description: 'התקנת מחשבי השקיה מתקדמים ומערכות טפטוף תת-קרקעיות. אנו דואגים לפיזור מים אופטימלי לכל צמח, מה שחוסך במים ומבטיח צמיחה בריאה לאורך זמן.',
    features: [
      'מחשבי השקיה חכמים (שליטה מהנייד)',
      'גילוי דליפות אוטומטי',
      'התאמת כמויות מים לפי עונות',
      'דישון אוטומטי (מדשנת)',
      'אחריות מלאה על המערכת'
    ],
    priceStart: 1500,
    image: 'https://picsum.photos/id/292/800/600' // Tools/Nature placeholder
  },
  {
    id: '3',
    title: 'תחזוקת גינות',
    slug: 'garden-maintenance',
    shortDescription: 'שירותי גינון שוטפים לשמירה על גינה מטופחת ובריאה.',
    description: 'צוות הגננים שלנו יגיע אליכם באופן קבוע לטיפול בגינה. השירות כולל כיסוח דשא, גיזום שיחים ועצים, זיבול, הדברה ירוקה וטיפול עונתי.',
    features: [
      'ביקורים קבועים (שבועי/דו-שבועי)',
      'כיסוח ודילול מדשאות',
      'עיצוב עצים ושיחים',
      'טיפול במזיקים ומחלות',
      'ניקיון יסודי לאחר העבודה'
    ],
    priceStart: 400,
    image: 'https://picsum.photos/id/306/800/600' // Lilypad/Water placeholder
  }
];

export const CONTACT_PHONE = "058-553-3112";
export const CONTACT_EMAIL = "guydznshv@gmail.com";
export const WORK_HOURS = "07:00 - 16:00";
export const SERVICE_AREA = "מרכז הארץ";