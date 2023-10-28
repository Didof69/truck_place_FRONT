import { Service } from './service';

export interface UpdatedParking {
  parking_id: number;
  nb_space_free: number;
  registration_date: Date;
  public_view: boolean;
  photo_id?: number;
  services: Service[];
}
