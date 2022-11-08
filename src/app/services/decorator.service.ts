import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Decorator } from '../models/decorator';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DecoratorService {

  baseUrl = environment.baseUrl + '/decorators';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Decorator[]> {
    return this.http.get<Decorator[]>(this.baseUrl);
  }

  get(id: any): Observable<Decorator> {
    return this.http.get<Decorator>(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  updateVenue(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/venue`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
