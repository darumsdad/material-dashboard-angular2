import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { Event } from '../models/event';
import { environment } from 'environments/environment';
import { EStore } from '@fireflysemantics/slice';
import { EventContact } from 'app/models/event-contact';
import { Decorator } from 'app/models/decorator';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl = environment.baseUrl + '/contacts';

  eventContactStore: EStore<EventContact> = new EStore<EventContact>();
  decoratorStore: EStore<Decorator> = new EStore<Decorator>();
  contactStore: EStore<Contact> = new EStore<Contact>();
  eventContacts$: Observable<Map<string, EventContact>> = this.eventContactStore.observeActive();
  contacts$: Observable<Map<string, Contact>> = this.contactStore.observeActive();

  constructor(private http: HttpClient) { 

  }

  load() {
    const contact: Contact = {
      gid: null,
      id: 1,
      firstName: 'David',
      lastName: 'Goldstein',
      address: '109 Ayrmont Lane',
      city: 'Bergenfield',
      state: 'NJ',
      zip: '07747',
      phone: '201-555-1111',
      email: 'daveg@yahoo.com'
    }

    const contact2: Contact = {
      gid: null,
      id: 3,
      firstName: 'David',
      lastName: 'Goldstein',
      address: '109 Ayrmont Lane',
      city: 'Bergenfield',
      state: 'NJ',
      zip: '07747',
      phone: '201-555-1111',
      email: 'daveg@yahoo.com'
    }

    this.contactStore.addActive(contact)  
    this.contactStore.addActive(contact2)

    const event: Event = {
      id: 1
    };

    const eventContact: EventContact = {
      id: 1,
      event: event,
      contact: contact,
      decorators: []
    }

    const eventContact2: EventContact = {
      id: 1,
      event: event,
      contact: contact2,
      decorators: []
    }

    this.eventContactStore.addActive(eventContact)
    this.eventContactStore.addActive(eventContact2)
  }

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseUrl);
  }

  get(id: any): Observable<Contact> {
    return this.http.get<Contact>(`${this.baseUrl}/${id}`);
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
