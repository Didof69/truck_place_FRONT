import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  // urlAPI = 'http://localhost:3000/api/services';

  constructor(private http: HttpClient) {}

  getAllService():Observable<Service[]> {
    return this.http.get<Service[]>(environment.api + `/services`);
  }
}
