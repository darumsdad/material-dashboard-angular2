import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { Event } from '../models/event';
import { environment } from 'environments/environment';
import { EStore, KeyObsValueReset, OStore } from '@fireflysemantics/slice';
import { EventContact } from 'app/models/event-contact';
import { Decorator } from 'app/models/decorator';
import { EventContactDecorator } from 'app/models/event-contact-decorator';

import { EventContactService } from './event-contact.service';
import { EventContactDecoratorService } from './event-contact-decorator.service';
import { DecoratorService } from './decorator.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  decorators: Decorator[];

  types: any[] = [
    'BRIDE','GROOM','PLANNER'
  ]
 
  

 
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

  OS: OStore<KeyObsValueReset> = new OStore({
    loading: {

      value: false

    },
  });

  constructor(private http: HttpClient,
    public eventContactService: EventContactService,
    public eventContactDecoratorService: EventContactDecoratorService,
    public decoratorService: DecoratorService
  ) 
  {
    this.decoratorService.getAll().subscribe( decorators => {
      console.log(decorators)
      this.decorators = decorators.filter( d => {
        return this.types.includes(d.code)
      })
    })
  }

  getContactTypeDecorators(): Decorator[] {
    return this.decorators
  }

  subscribeLoading(): Observable<boolean> {
    return this.OS.S.loading.obs;
  }

  setLoading() {
    this.OS.put(this.OS.S.loading, true);
  }

  setDoneLoading() {
    this.OS.put(this.OS.S.loading, false);
  }

  onUpdateEventContact(contact: Contact, type: any, eventContact: EventContact) {

    this.setLoading();

    this.update(contact.id, contact).subscribe(c => {
      this.contactStore.put(contact)
      let contactType = eventContact.decorators.find(x => x.type === 'contact-type')
      contactType.decoratorId = type.id;

      console.log('tyype in ')
      console.log(type)
      
      console.log('update')
      console.log(contactType)

      this.eventContactDecoratorService.update(contactType.id,contactType).subscribe(ecd => {
        this.buildTree()
        this.setDoneLoading();
      })
      
    })

  }

  newEventContact(contact: any, type: any, eventId: number): void {

    this.setLoading();

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
          this.setDoneLoading();

        })

      })
    })


  }


  load(eventId: any) {

    this.setLoading();
    this.http.get<any[]>(`${this.decoratorUrl}`).subscribe(ds => {

      ds.forEach(d => {
        this.decoratorStore.addActive(d);
      })

       this.http.get<any[]>(`${this.eventContactUrl}/forEvent/${eventId}`).subscribe({

         next: (eventContacts) => {

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

         },

         complete: () =>   {
          this.setDoneLoading();
         }

       })
         
           


  

    });

  }


  buildTree(): void {
     
    this.setLoading();
    this.eventContacts = this.eventContactStore.activeSnapshot()
    
    this.eventContacts.forEach(ec => {

      ec.contact = this.contactStore.select(contact => contact.id === ec.contactId)[0]

      ec.decorators = []

      ec.decorators = this.eventContactDecoratorStore.select(ecd => ecd.eventContactId === ec.id)

      let ds = this.decoratorStore.activeSnapshot()

      ec.decorators.forEach(ec_decorator => {
        ec_decorator.decorator = this.decoratorStore.select(d => ec_decorator.decoratorId ===d.id)[0] 
      })
     
    })

    this.tree.clearActive();
    
    this.eventContacts.forEach(ec => {
      this.tree.addActive(ec);
    })

    this.setDoneLoading();

  }
  
  
  makeEventContactPrimary(ec: any) {

    this.setLoading();
    let current = this.eventContactDecoratorStore.activeSnapshot().find(x => x.type === 'primary-contact-indicator')

    console.log('start delete')
    this.eventContactDecoratorService.delete(current.id).subscribe(e => {
      console.log('end delete')

      this.eventContactDecoratorStore.delete(current);

      let eventContact = this.eventContactStore.findOne(ec.gid)
      let decorator = this.decoratorStore.select(d => d.code === 'PRIMARY')[0]

      let eventContactDecoratorPrimary: EventContactDecorator = {
        eventContactId: eventContact.id,
        decoratorId: decorator.id,
        type: 'primary-contact-indicator',
      }

      this.eventContactDecoratorService.create(eventContactDecoratorPrimary).subscribe(c => {
        this.eventContactDecoratorStore.addActive(c);
        this.buildTree()
        this.setDoneLoading();
      })

    })




  }

  onDelete(eventContact: EventContact) {
    this.setLoading()
    let contact = eventContact.contact
    this.delete(contact.id).subscribe(c => {
      this.contactStore.delete(contact)
      this.eventContactService.delete(eventContact.id).subscribe( ec => {
        this.eventContactStore.delete(eventContact);
        eventContact.decorators.forEach ( ecd => {
          this.eventContactDecoratorService.delete(ecd.id).subscribe( d => {
            this.eventContactDecoratorStore.delete(ecd)
          })
          this.buildTree();
          this.setDoneLoading();
        })
      })
    })
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
