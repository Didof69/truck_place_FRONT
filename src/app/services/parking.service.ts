import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parking } from '../models/parking';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  urlAPI = 'http://localhost:3000/api/parkings';
  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  getParkings(): Observable<Parking[]> {
    return this.http.get<Parking[]>(`${this.urlAPI}`);
  }

  getParkingById(parking_id: number): Observable<Parking> {
    return this.http.get<Parking>(`${this.urlAPI}/${parking_id}`);
  }
}
