import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gig } from '../models/gig';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GigService {

  baseUrl = environment.baseUrl + '/gigs';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Gig[]> {
    return this.http.get<Gig[]>(this.baseUrl);
  }

  get(id: any): Observable<Gig> {
    return this.http.get<Gig>(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
