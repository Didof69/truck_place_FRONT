import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatedOpinion } from '../models/created-opinion';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OpinionService {
  // urlAPI = 'http://localhost:3000/api/opinions';
  
  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  createOpinion(opinion: CreatedOpinion): Observable<CreatedOpinion> {
    const headers = this.setHeaders();
    return this.http.post<CreatedOpinion>(
      environment.api+`/opinions`,
      opinion,
      { headers }
    );
  }
}
