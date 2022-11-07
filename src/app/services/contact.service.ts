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

import { EventContactService } from './event-contact.service';
import { EventContactDecoratorService } from './event-contact-decorator.service';



@Injectable({
  providedIn: 'root'
})
export class ContactService {


  contactUrl = environment.baseUrl + '/contacts';
  eventContactUrl = environment.baseUrl + '/event_contact';
  eventContactDecoratorUrl = environment.baseUrl + '/event_contact_decorator';
  decoratorUrl = environment.baseUrl + '/decorators';

  eventContactStore: EStore<EventContact> = new EStore<EventContact>();

  tree: EStore<EventContact> = new EStore<EventContact>();

  decoratorStore: EStore<Decorator> = new EStore<Decorator>();
  contactStore: EStore<Contact> = new EStore<Contact>();
  eventStore: EStore<Event> = new EStore<Event>();

  eventContactDecoratorStore: EStore<EventContactDecorator> = new EStore<EventContactDecorator>();
  eventContacts$: Observable<Map<string, EventContact>> = this.eventContactStore.observeActive();
  contacts$: Observable<Map<string, Contact>> = this.contactStore.observeActive();
  eventContactDecorators$: Observable<Map<string, EventContactDecorator>> = this.eventContactDecoratorStore.observeActive();
  event$: Observable<Map<string, Event>> = this.eventStore.observeActive();
  tree$: Observable<Map<string, EventContact>> = this.tree.observeActive();

  eventContacts: EventContact[]

  initEventContactDecoratorStore = false;

  constructor(private http: HttpClient,
    public eventContactService: EventContactService,
    public eventContactDecoratorService: EventContactDecoratorService) {

  }

  newEventContact(contact: any, type: any, eventId: number): void {

    let isActive = this.eventContactStore.countSnapshot() === 0

    this.create(contact).subscribe(c => {

      this.contactStore.addActive(c)

      let _eventContact: EventContact = {
        eventId: eventId,
        contactId: c.id,
      }

      this.eventContactService.create(_eventContact).subscribe(ec => {
        this.eventContactStore.addActive(ec);

        let _eventContactDecorator: EventContactDecorator = {
          eventContactId: ec.id,
          decoratorId: type.id,
          type: 'contact-type'
        }

        this.eventContactDecoratorService.create(_eventContactDecorator).subscribe(ecd => {

          this.eventContactDecoratorStore.addActive(ecd)

          if (isActive) {
            let _eventContactDecorator: EventContactDecorator = {
              eventContactId: ec.id,
              decoratorId: 4,
              type: 'primary-contact-indicator'
            }

            this.eventContactDecoratorService.create(_eventContactDecorator).subscribe(ecd => {

              this.eventContactDecoratorStore.addActive(ecd)

              this.buildTree()


            })
          }
          else
            [
              this.buildTree()
            ]





        })

      })
    })
  }


  load(eventId: any) {


    this.http.get<any[]>(`${this.decoratorUrl}`).subscribe(ds => {

      ds.forEach(d => {
        this.decoratorStore.addActive(d);
      })

        this.http.get<any[]>(`${this.eventContactUrl}/forEvent/${eventId}`).subscribe(eventContacts => {

          eventContacts.forEach(eventContact => {
            this.eventContactStore.addActive(eventContact)
          })

          this.http.get<any[]>(`${this.contactUrl}/forEvent/${eventId}`).subscribe(contacts => {

            if (!contacts)
              return
            contacts.forEach(contact => {
              this.contactStore.addActive(contact)
            })

            this.http.get<any[]>(`${this.eventContactDecoratorUrl}/forEvent/${eventId}`).subscribe(ecds => {
              ecds.forEach(ecd => {
                this.eventContactDecoratorStore.addActive(ecd)
              })



              this.buildTree();


            })
          })
        })
       
    });
  }


  buildTree(): void {

    this.eventContacts = this.eventContactStore.activeSnapshot()
    this.eventContacts.forEach(ec => {

      let contact = this.contactStore.select(contact => contact.id === ec.contactId)[0]
      ec.contact = contact

      let ecds = this.eventContactDecoratorStore.activeSnapshot()

      ec.decorators = []
      ec.decorators = ecds.filter(ecd => {
        return ecd.eventContactId === ec.id
      })

      let ds = this.decoratorStore.activeSnapshot()

      ec.decorators.forEach(d => {
        d.decorator = ds.find(decorator => {
          return decorator.id === d.decoratorId
        })
      });


    })

    this.eventContacts.forEach(x => {
      this.tree.addActive(x);
    })

    console.log(this.eventContacts)

  }
  makeEventContactPrimary(ec: any) {

    let current = this.eventContactDecoratorStore.activeSnapshot().find(x => x.type === 'primary-contact-indicator')

    this.eventContactDecoratorStore.delete(current);

    let eventContact = this.eventContactStore.findOne(ec.gid)

    let decorator = this.decoratorStore.select(d => d.code === 'PRIMARY')[0]

    let eventContactDecoratorPrimary: EventContactDecorator = {
      eventContactId: eventContact.id,
      decoratorId: decorator.id,
      type: 'primary-contact-indicator',
    }

    this.eventContactDecoratorStore.addActive(eventContactDecoratorPrimary);
    this.buildTree()

  }

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactUrl);
  }

  get(id: any): Observable<Contact> {
    return this.http.get<Contact>(`${this.contactUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.contactUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.contactUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.contactUrl}/${id}`);
  }


}
