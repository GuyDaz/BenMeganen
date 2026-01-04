export interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  features: string[];
  priceStart: number;
  image: string;
  slug: string;
}

export interface Lead {
  name: string;
  phone: string;
  city: string;
  service: string;
  message: string;
  createdAt: Date;
}

export enum ServiceType {
  DESIGN = 'עיצוב גינות',
  IRRIGATION = 'מערכות השקיה',
  MAINTENANCE = 'תחזוקת גינות'
}

declare global {
  interface Window {
    emailjs: any;
  }
}