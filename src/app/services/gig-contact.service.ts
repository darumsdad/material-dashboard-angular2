import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GigContact } from 'app/models/gig-contact';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GigContactService {


  baseUrl = environment.baseUrl + '/gig_contact';

  constructor(private http: HttpClient) { }


  get(id: any): Observable<GigContact> {
    return this.http.get<GigContact>(`${this.baseUrl}/${id}`);
  }

  getByGigId(id: any): Observable<GigContact[]> {
    return this.http.get<GigContact[]>(`${this.baseUrl}/byGig/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
