import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/location';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  // urlAPI = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(environment.api+`/locations`);
  }

  getLocationByInseeCode(insee_code:string): Observable<Location> {
    return this.http.get<Location>(environment.api + `/locations/${insee_code}`);
  }
}
