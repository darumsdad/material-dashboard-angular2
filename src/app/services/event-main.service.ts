import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventMainService {


  baseUrl = environment.baseUrl + '/events';
  webhookUrl = environment.baseUrl + '/webhook';

  constructor(private http: HttpClient) { }


  get(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  submission(id: any): Observable<any> {
    return this.http.put(`${this.webhookUrl}/${id}`, { id: id});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
