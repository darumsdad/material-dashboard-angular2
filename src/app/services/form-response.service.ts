import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormResponseService {

  baseUrl = environment.baseUrl + '/gigs';

  constructor(private http: HttpClient) { }

  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/response`);
  }
}
