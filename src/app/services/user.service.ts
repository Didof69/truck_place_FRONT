import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserLog } from '../models/user-log';
import { LogData } from '../models/log-data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  urlAPI = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  signUp(data: User): Observable<User> {
    console.log(data);
    return this.http.post<User>(`${this.urlAPI}auth/register`, data);
  }

  login(data: UserLog): Observable<LogData> {
    console.log(data);
    
    return this.http.post<LogData>(
      `${this.urlAPI}auth/login`,
      data
    );
  }
}
