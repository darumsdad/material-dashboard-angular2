import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventContact } from 'app/models/event-contact';
 
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventContactService {


  baseUrl = environment.baseUrl + '/event_contact';

  constructor(private http: HttpClient) { }


  get(id: any): Observable<EventContact> {
    return this.http.get<EventContact>(`${this.baseUrl}/${id}`);
  }

  getByGigId(id: any): Observable<EventContact[]> {
    return this.http.get<EventContact[]>(`${this.baseUrl}/byGig/${id}`);
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
