import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { UserLog } from '../models/user-log';
import { LogData } from '../models/log-data';
import { CreatedUser } from '../models/created-user';
import { UpdatedUser } from '../models/updated-user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isLog$: BehaviorSubject<boolean>;
  public isAdmin$ = new Subject<boolean>();
  isAdmin = false

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.isLog$ = new BehaviorSubject(true);
    } else {
      this.isLog$ = new BehaviorSubject(false);
    }
  }

  getIsAdmin() {  
    return this.isAdmin
  }

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  signUp(createdUser: CreatedUser): Observable<CreatedUser> {
    return this.http.post<CreatedUser>(
      environment.api + `/auth/register`,
      createdUser
    );
  }

  login(userLog: UserLog): Observable<LogData> {
    return this.http.post<LogData>(environment.api + `/auth/login`, userLog);
  }

  getAllUsers(): Observable<User[]> {
    const headers = this.setHeaders();
    return this.http.get<User[]>(environment.api + `/users/admin`, { headers });
  }

  getUserByPseudo(): Observable<User> {
    const headers = this.setHeaders();
    return this.http.get<User>(environment.api +`/users`, { headers }).pipe(
      tap((user: User) => {
        this.isAdmin$.next(user.admin);
        this.isAdmin = user.admin
      })
    );
  }

  updateUser(user: UpdatedUser): Observable<User> {
    const headers = this.setHeaders();
    return this.http.patch<User>(environment.api +`/users/${user.user_id}`, user, {
      headers,
    });
  }

  deleteUser(pseudo: string): Observable<User> {
    const headers = this.setHeaders();
    return this.http.delete<User>(environment.api +`/users/${pseudo}`, { headers });
  }
}
