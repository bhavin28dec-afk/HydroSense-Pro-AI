
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  PLANT_GUIDE = 'PLANT_GUIDE',
  DIAGNOSIS = 'DIAGNOSIS',
  NUTRIENTS = 'NUTRIENTS',
  CHECKLIST = 'CHECKLIST',
  ADMIN_SETTINGS = 'ADMIN_SETTINGS'
}

export type Language = 'en' | 'hi';
export type UserRole = 'admin' | 'user';

export interface UserAccount {
  username: string;
  password: string; // stored simply for this demo, usually should be hashed
  expiryDate: string; // ISO string
  createdDate: string; // ISO string
  isActive?: boolean;
}

export interface NutrientSalt {
  name: string;
  chemicalName: string;
  purpose: string;
}

export interface GrowthStage {
  stage: string;
  duration: string;
  ec: string;
  tds: string;
  pH: string;
  notes: string;
}
