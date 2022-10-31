import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GigStatus } from 'app/models/gig-status';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GigStatusService {


  baseUrl = environment.baseUrl + '/gig_status';

  constructor(private http: HttpClient) { }

  getAll(): Observable<GigStatus[]> {
    return this.http.get<GigStatus[]>(this.baseUrl);
  }

  get(id: any): Observable<GigStatus> {
    return this.http.get<GigStatus>(`${this.baseUrl}/${id}`);
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
