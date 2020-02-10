import { Coords } from "./Coords";

export interface Gym {
  id: number;
  type: string;
  name: string;
  ownername: string;
  location: {
    city: string;
    state: string;
    coordinates: Coords;
  };
  cost: number;
  equipment: Array<string>;
}
