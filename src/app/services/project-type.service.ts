import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProjectType } from '../models/project-type';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService   {

  baseUrl = environment.baseUrl + '/project_type';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProjectType[]> {
    return this.http.get<ProjectType[]>(this.baseUrl);
  }

  get(id: any): Observable<ProjectType> {
    return this.http.get<ProjectType>(`${this.baseUrl}/${id}`);
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
