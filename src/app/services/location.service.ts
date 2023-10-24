import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  urlAPI = 'http://localhost:3000/api/locations';
  constructor(private http: HttpClient) {}

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.urlAPI}`);
  }

  getLocationByInseeCode(insee_code:string): Observable<Location> {
    return this.http.get<Location>(`${this.urlAPI}/${insee_code}`);
  }
}
