import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { Event } from '../models/event';
import { environment } from 'environments/environment';
import { EStore } from '@fireflysemantics/slice';
import { EventContact } from 'app/models/event-contact';
import { Decorator } from 'app/models/decorator';
import { EventContactDecorator } from 'app/models/event-contact-decorator';


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
      firstName: 'Amir',
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

    const groom: Decorator = {
      id: 1,
      code: 'GROOM',
      decoratorString: 'Groom',
      icon: 'groom'
    }

    const bride: Decorator = {
      id: 2,
      code: 'BRIDE',
      decoratorString: 'Bride',
      icon: 'bride'
    }

    const planner: Decorator = {
      id: 3,
      code: 'PLANNER',
      decoratorString: 'Planner',
      icon: 'planner'
    }

    const primary: Decorator = {
      id: 4,
      code: 'PRIMARY',
      decoratorString: 'Primary',
      icon: 'primary'
    }

    const eventContectDecoratorGroom: EventContactDecorator = {
      id: 2,
      eventContact: null,
      decorator: groom,
       type: 'contact-type',
      
    }

    const eventContectDecoratorBride: EventContactDecorator = {
      id: 1,
      eventContact: null,
      decorator: bride,
      type: 'contact-type',
      
    }

    const eventContectDecoratorPlanner: EventContactDecorator = {
      id: 3,
      eventContact: null,
      decorator: planner,
      type: 'contact-type',
      
    }

    const eventContectDecoratorPrimary: EventContactDecorator = {
      id: 4,
      eventContact: null,
      decorator: primary,
      type: 'primary-contact-indicator',
      
    }

    const eventContact: EventContact = new EventContact() ;

    eventContact.id = 1;
    eventContact.event = event;
    eventContact.contact = contact;
    
    eventContact.decorators = [eventContectDecoratorGroom]
      
     
    const eventContact2: EventContact = new EventContact() ;

    eventContact2.id = 2;
    eventContact2.event = event;
    eventContact2.contact = contact2;
    
    eventContact2.decorators = [eventContectDecoratorBride]

    const eventContact3: EventContact = new EventContact() ;

    eventContact3.id = 3;
    eventContact3.event = event;
    eventContact3.contact = contact2;
    
    eventContact3.decorators = [eventContectDecoratorPlanner,eventContectDecoratorPrimary]
       

    this.eventContactStore.addActive(eventContact)
    this.eventContactStore.addActive(eventContact2)
    this.eventContactStore.addActive(eventContact3)
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
