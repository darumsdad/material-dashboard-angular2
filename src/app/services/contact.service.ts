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

  constructor(private http: HttpClient) {

    this.eventContactDecoratorStore.observeDelta().subscribe(ecds => {
      console.log("delta");
      console.log(ecds)
    })

  }

  // groom: Decorator = {
  //   id: 1,
  //   code: 'GROOM',
  //   decoratorString: 'Groom',
  //   icon: 'groom'
  // }

  // bride: Decorator = {
  //   id: 2,
  //   code: 'BRIDE',
  //   decoratorString: 'Bride',
  //   icon: 'bride'
  // }

  // planner: Decorator = {
  //   id: 3,
  //   code: 'PLANNER',
  //   decoratorString: 'Planner',
  //   icon: 'planner'
  // }

  // primary: Decorator = {
  //   id: 4,
  //   code: 'PRIMARY',
  //   decoratorString: 'Primary',
  //   icon: 'primary'
  // }

  load(eventContactId: any) {


    this.http.get<any[]>(`${this.eventContactUrl}/${eventContactId}`).subscribe(eventContacts => {

      eventContacts.forEach(eventContact => {
        this.eventContactStore.addActive(eventContact)
      })

      this.http.get<any[]>(`${this.contactUrl}/forEvent/${eventContactId}`).subscribe(contacts => {


        contacts.forEach(contact => {

          this.contactStore.addActive(contact)
        })

        this.http.get<any[]>(`${this.eventContactDecoratorUrl}/byEventContact/${eventContactId}`).subscribe(ecds => {

          ecds.forEach(ecd => {

            this.eventContactDecoratorStore.addActive(ecd)
          })

          this.http.get<any[]>(`${this.decoratorUrl}`).subscribe(ds => {

            ds.forEach(d => {
              this.decoratorStore.addActive(d);

            });

            this.buildTree();



          })




        })


      })




      // console.log('all')
      // console.log(this.eventContactStore.allSnapshot())
      // console.log(eventContact)
      // let first = this.eventContactStore.select(x => x.id === eventContact.id)[0]
      // first.decorators = [eventContectDecoratorGroom]
      // this.eventContactStore.put(first)

      // first = this.eventContactStore.select(x => x.id === eventContact2.id)[0]
      // first.decorators = [eventContectDecoratorBride]
      // this.eventContactStore.put(first)

      // first = this.eventContactStore.select(x => x.id === eventContact3.id)[0]
      // first.decorators = [eventContectDecoratorPlanner, eventContectDecoratorPrimary]
      // this.eventContactStore.put(first)



      // this.eventContactDecoratorStore.addActive(eventContectDecoratorGroom)
      // this.eventContactDecoratorStore.addActive(eventContectDecoratorBride)
      // this.eventContactDecoratorStore.addActive(eventContectDecoratorPlanner)
      // this.eventContactDecoratorStore.addActive(eventContectDecoratorPrimary)



    })
  }


  buildTree(): void {

    this.eventContacts = this.eventContactStore.activeSnapshot()
    this.eventContacts.forEach(ec => {

      let contact = this.contactStore.select(contact => contact.id === ec.contactId)[0]
      ec.contact = contact

      let ecds = this.eventContactDecoratorStore.activeSnapshot()

      console.log('ecds store')
      console.log(ecds)

      console.log('filter by')
      console.log(ec.id)

      ec.decorators = []
      ec.decorators = ecds.filter(ecd => {
        return ecd.eventContactId === ec.id
      })


      let ds = this.decoratorStore.activeSnapshot()

      console.log('find1')
      console.log(ec.decorators)
      console.log(ds)

      ec.decorators.forEach(d => {

        console.log('find')
        console.log(d.decoratorId)
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
