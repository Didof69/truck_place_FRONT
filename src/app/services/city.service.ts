import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  urlAPI = 'http://localhost:3000/api/parkings';
  constructor(private http: HttpClient) {}
}
