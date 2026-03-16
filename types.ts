
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  PLANT_GUIDE = 'PLANT_GUIDE',
  DIAGNOSIS = 'DIAGNOSIS',
  NUTRIENTS = 'NUTRIENTS',
  CHECKLIST = 'CHECKLIST',
  ADMIN_SETTINGS = 'ADMIN_SETTINGS',
  CROPS = 'CROPS',
  PEST_CONTROL = 'PEST_CONTROL'
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

export interface Crop {
  id: number;
  name: string;
  icon: string;
  stage: string;
  plantedDate: string;
  harvestDate: string;
  daysLeft: number;
  progress: number;
  health: 'excellent' | 'good' | 'fair' | 'poor';
  system: string;
  phRange: string;
  ecRange: string;
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
