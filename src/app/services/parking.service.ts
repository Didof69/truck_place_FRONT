import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Parking } from '../models/parking';
import { Opinion } from '../models/opinion';
import { CreatedParking } from '../models/created-parking';
import { UpdatedParking } from '../models/updated-parking';
import { OpinionByMember } from '../models/opinion-by-member';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  parking$ = new Subject<Parking>();
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
    return this.http.get<Parking[]>(environment.api+`/parkings`);
  }

  getParkingsLikedByUser(): Observable<Parking[]> {
    const headers = this.setHeaders();
    return this.http.get<Parking[]>(environment.api+`/parkings/liked`, { headers });
  }

  getParkingById(parking_id: number): Observable<Parking> {
    return this.http.get<Parking>(
      environment.api+`/parkings/${parking_id}`
    );
  }

  getOpinionsByParkingId(parking_id: number): Observable<Opinion[]> {
    return this.http.get<Opinion[]>(
      environment.api+`/opinions/parking/${parking_id}`
    );
  }

  createParking(createdParking: CreatedParking): Observable<Parking> {
    const headers = this.setHeaders();
    return this.http.post<Parking>(
      environment.api + `/parkings`,
      createdParking,
      {
        headers,
      }
    );
  }

  updateParking(updatedParking: UpdatedParking): Observable<Parking> {
    const headers = this.setHeaders();
    return this.http.patch<Parking>(
      environment.api+`/parkings/${updatedParking.parking_id}`,
      updatedParking,
      {
        headers,
      }
    );
  }

  deleteParking(parking_id: number): Observable<Parking> {
    const headers = this.setHeaders();
    return this.http.delete<Parking>(environment.api+`/parkings/${parking_id}`, {
      headers,
    });
  }
}
