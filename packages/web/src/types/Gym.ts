import { Coords } from "./Coords";

export interface Gym {
  id: number;
  isActive: boolean;
  rating: number;
  ownerName: string;
  gymName: string;
  email: string;
  phone: string;
  location: {
    city: string;
    state: string;
    coordinates: Coords;
  };
  cost: number;
  equipment: Array<string>;
  type: string;
  about: string;
  registered: string;
}
