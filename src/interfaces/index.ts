// ===========================
// 🧩 Shared Types & Interfaces
// ===========================

export type Screen = 'login' | 'dashboard' | 'history' | 'rewards' | 'redeemed';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  store?: {
    _id: string;
    name: string;
  };
}

export interface Cashier {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  accessCode: string;
  profileImage?: string;
  countryCode?: string;
  store?: {
    _id: string;
    name: string;
  };
}

export interface Registration {
  phoneNumber: string;
  isNew: boolean;
  isManual: boolean;
  timestamp: Date;
}

export interface DailyStats {
  date: string;
  totalRegistrations: number;
  newNumbers: number;
  existingNumbers: number;
  manualRegistrations: number;
  shiftRegistrations: number;
  registrations?: Registration[];
}

export interface RedeemedReward {
  id: string;
  name: string;
  description: string;
  pointsSpent: number;
  redeemedDate: string;
  imageUrl: string;
}

export interface RewardMilestone {
  name: string;
  description: string;
  pointsRequired: number;
  imageUrl: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  imageUrl: string;
  isFeatured?: boolean;
}
