export interface Therapist {
  id: number;
  name: string;
  country: string;
  verified: boolean;
  superSpecialist: boolean;
  price: number;
  rating: number;
  reviews: number;
  duration: number;
  description: string;
  experience: number;
  clients: number;
  sessions: number;
  image: string;
  availableSlots: string[];
  isFavorite: boolean;
  age?: number;
  gender?: 'man' | 'woman';
}

export interface DatabaseSchema {
  therapists: Therapist[];
}

