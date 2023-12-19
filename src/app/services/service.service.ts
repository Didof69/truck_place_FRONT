import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
  
export class ServiceService {
  constructor(private http: HttpClient) {}

  getAllService():Observable<Service[]> {
    return this.http.get<Service[]>(environment.api + `/services`);
  }
}
