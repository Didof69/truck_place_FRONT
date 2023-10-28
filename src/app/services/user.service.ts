import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, tap } from 'rxjs';
import { UserLog } from '../models/user-log';
import { LogData } from '../models/log-data';
import { CreatedUser } from '../models/user copy';

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

  signUp(data: CreatedUser): Observable<CreatedUser> {
    console.log(data);
    return this.http.post<CreatedUser>(`${this.urlAPI}auth/register`, data);
  }

  login(data: UserLog): Observable<LogData> {
    console.log(data);
    
    return this.http.post<LogData>(
      `${this.urlAPI}auth/login`,
      data
    );
  }

  getUserByPseudo(): Observable<User> {
        const headers = this.setHeaders();
        return this.http
          .get<User>(`${this.urlAPI}users`, { headers })
          .pipe(
            tap((user: User) => {
              sessionStorage.setItem(
                'user_profil',
                user.admin.toString()
              );
            })
          );
  }
}
