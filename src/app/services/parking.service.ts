import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Parking } from '../models/parking';
import { Opinion } from '../models/opinion';
import { CreatedParking } from '../models/created-parking';
import { UpdatedParking } from '../models/updated-parking';
import { OpinionByMember } from '../models/opinion-by-member';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  urlAPI = 'http://localhost:3000/api/parkings';
  opinionsMembersTab$ = new Subject<OpinionByMember[]>();
  averageParking$ = new Subject<number>();
  numberOpinions$ = new Subject<number>();

  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  getAllParkings(): Observable<Parking[]> {
    return this.http.get<Parking[]>(`${this.urlAPI}`);
  }

  getParkingsLikedByUser(): Observable<Parking[]> {
    const headers = this.setHeaders();
    return this.http.get<Parking[]>(`${this.urlAPI}/liked`, { headers });
  }

  getParkingById(parking_id: number): Observable<Parking> {
    return this.http.get<Parking>(`${this.urlAPI}/${parking_id}`);
  }

  getOpinionsByParkingId(parking_id: number): Observable<Opinion[]> {
    return this.http.get<Opinion[]>(
      `http://localhost:3000/api/opinions/parking/${parking_id}`
    );
  }

  createParking(createdParking: CreatedParking): Observable<Parking> {
    const headers = this.setHeaders();
    return this.http.post<Parking>(`${this.urlAPI}`, createdParking, {
      headers,
    });
  }

  updateParking(updatedParking: UpdatedParking): Observable<Parking> {
    const headers = this.setHeaders();
    return this.http.patch<Parking>(
      `${this.urlAPI}/${updatedParking.parking_id}`,
      updatedParking,
      {
        headers,
      }
    );
  }

  deleteParking(parking_id: number): Observable<Parking> {
    const headers = this.setHeaders();
    return this.http.delete<Parking>(`${this.urlAPI}/${parking_id}`, {
      headers,
    });
  }
}
