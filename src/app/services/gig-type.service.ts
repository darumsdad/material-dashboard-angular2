import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GigType } from '../models/gig-type';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GigTypeService {

  baseUrl = environment.baseUrl + '/gig_type';

  constructor(private http: HttpClient) { }

  getAll(): Observable<GigType[]> {
    return this.http.get<GigType[]>(this.baseUrl);
  }

  get(id: any): Observable<GigType> {
    return this.http.get<GigType>(`${this.baseUrl}/${id}`);
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
