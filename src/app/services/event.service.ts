import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Decorator } from '../models/decorator';
import { environment } from 'environments/environment';
import { Project } from './project.service';
import { Event } from 'app/models/event';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  



  venueId: any
  projectId: any;
  event: Event;


  setVenueId(venueId: any)
  {
    this.event.venueId = venueId;
    this.isDirty = true;
  }

  setProjectId(projectId: any)
  {
    this.projectId = projectId;
  }

  setDate(date: any) {
    this.event.date = date;
    this.isDirty = true;
  }

  setStartTime(startTime: any) {
    this.event.startTime = startTime;
    this.isDirty = true;
  }

  setEndTime(endTime: any) {
    this.event.endTime = endTime;
    this.isDirty = true;
  }

  isDirty: boolean = false;

  save()
  {
    this.isDirty = false;
    console.log(this.event);
    this.update(this.event.id, this.event).subscribe( e => {
        console.log(e);
    })
  }


  baseUrl = environment.baseUrl + '/events';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Decorator[]> {
    return this.http.get<Decorator[]>(this.baseUrl);
  }

  get(id: any): Observable<Decorator> {
    return this.http.get<Decorator>(`${this.baseUrl}/${id}`);
  }

  load(callback: any) {
    return this.http.get<Event>(`${this.baseUrl}/forProject/${this.projectId}`).subscribe( e => {

      this.event = e;
      callback(e);
    });
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
