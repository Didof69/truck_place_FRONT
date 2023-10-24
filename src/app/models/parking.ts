import { Service } from './service';

export interface Parking {
  parking_id: number;
  parking_name: string;
  latitude: string;
  longitude: string;
  nb_space_all: number;
  nb_space_free: number;
  registration_date?: Date;
  public_view: boolean;
  main_road?: string;
  direction?: string;
  insee_code: string;
  user_id: number;
  photo_id?: number;
  services: Service[];
}
