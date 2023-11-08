import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatedSubscribe } from '../models/created-subscribe';
import { Subscribe } from '../models/subscribe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  urlAPI: string = 'http://localhost:3000/api/subscribes';

  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  createSubscribe(createdSubscribe: CreatedSubscribe): Observable<Subscribe> {
    const headers = this.setHeaders();
    return this.http.post<Subscribe>(`${this.urlAPI}`, createdSubscribe, {
      headers,
    });
  }

  getSubscriptionUser(): Observable<Subscribe[]>{
    const headers = this.setHeaders();
    return this.http.get<Subscribe[]>(`${this.urlAPI}`, {headers});
  }

  deleteSubscribe(subscribe_id :number): Observable<Subscribe>{
    const headers = this.setHeaders();
    return this.http.delete<Subscribe>(`${this.urlAPI}/${subscribe_id}`, { headers });
  }
}
