import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserLog } from '../models/user-log';
import { LogData } from '../models/log-data';
import { CreatedUser } from '../models/created-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  urlAPI = 'http://localhost:3000/api/';
  public isLog$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.isLog$ = new BehaviorSubject(true);
    } else {
      this.isLog$ = new BehaviorSubject(false);
    }
  }

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  signUp(createdUser: CreatedUser): Observable<CreatedUser> {
    // console.log(createdUser);
    return this.http.post<CreatedUser>(
      `${this.urlAPI}auth/register`,
      createdUser
    );
  }

  login(userLog: UserLog): Observable<LogData> {
    // console.log(userLog);
    return this.http.post<LogData>(`${this.urlAPI}auth/login`, userLog);
  }

  getUserByPseudo(): Observable<User> {
    const headers = this.setHeaders();
    return this.http.get<User>(`${this.urlAPI}users`, { headers }).pipe(
      tap((user: User) => {
        sessionStorage.setItem('user_admin', user.admin.toString());
      })
    );
  }

  deleteUser(pseudo: string): Observable<User> {
    const headers = this.setHeaders();
    return this.http.delete<User>(`${this.urlAPI}users/${pseudo}`, { headers });
  }
}
