export interface HousingLocation {
    id: number;
    name: string;
    city: string;
    state: string;
    photo: string;
    availableUnits: number;
    coordinates:{
      latitude: number;
      longitude: number;
    };
    wifi: boolean;
    laundry: boolean;
    seguridad: string[];
  }