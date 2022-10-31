import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GigContactType } from 'app/models/gig-contact-type';

import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GigContactTypeService {


  baseUrl = environment.baseUrl + '/gig_contact_type';

  constructor(private http: HttpClient) { }

  getAll(): Observable<GigContactType[]> {
    return this.http.get<GigContactType[]>(this.baseUrl);
  }

  get(id: any): Observable<GigContactType> {
    return this.http.get<GigContactType>(`${this.baseUrl}/${id}`);
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
