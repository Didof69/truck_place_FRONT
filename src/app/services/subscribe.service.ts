import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatedSubscribe } from '../models/created-subscribe';
import { Subscribe } from '../models/subscribe';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  // urlAPI: string = 'http://localhost:3000/api/subscribes';
public userSubscription$= new Subject<Subscribe[]>
  
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
    return this.http.post<Subscribe>(
      environment.api + `/subscribes`,
      createdSubscribe,
      {
        headers,
      }
    );
  }

  getSubscriptionUser(): Observable<Subscribe[]>{
    const headers = this.setHeaders();
    return this.http.get<Subscribe[]>(environment.api + `/subscribes`, {
      headers,
    });
  }

  deleteSubscribe(subscribe_id :number): Observable<Subscribe>{
    const headers = this.setHeaders();
    return this.http.delete<Subscribe>(environment.api + `/subscribes/${subscribe_id}`, { headers });
  }
}
