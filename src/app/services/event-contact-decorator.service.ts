import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventContact } from 'app/models/event-contact';
import { EventContactDecorator } from 'app/models/event-contact-decorator';
 
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventContactDecoratorService {


  baseUrl = environment.baseUrl + '/event_contact_decorator';

  constructor(private http: HttpClient) { }


  get(id: any): Observable<EventContactDecorator> {
    return this.http.get<EventContactDecorator>(`${this.baseUrl}/${id}`);
  }

  forEvent(id: any): Observable<EventContactDecorator[]> {
    return this.http.get<EventContactDecorator[]>(`${this.baseUrl}/forEvent/${id}`);
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
