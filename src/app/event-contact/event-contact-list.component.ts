import { Component, OnInit } from '@angular/core';
import { EventContact } from 'app/models/event-contact';
import { ContactService } from 'app/services/contact.service';

@Component({
  selector: 'app-event-contact-list',
  template: `
  <div class="table-responsive">
    <table class="table align-middle bg-white">
      <thead class="bg-light">
          <tr>
              
              <th>Contact</th>
              <th>Type</th>
              <th>Actions</th>
               
          </tr>
      </thead>
      <tbody>
        <tr *ngFor="let ec of eventContacts">
          <td>
          <app-event-contact-list-item [contact]=ec.contact >
          </app-event-contact-list-item>
        </td>
        <td>
        
        </td> 
        <td>
        
        </td> 
        </tr>
      </tbody>
    </table>
  <div>
   
 
  `,
  styles: [
  ]
})
export class EventContactListComponent implements OnInit {

  eventContacts: EventContact[];
  constructor(private s: ContactService) { }

  ngOnInit(): void {
  
    this.s.eventContacts$.subscribe((m: Map<string, EventContact>) => {
      const eventContacts: EventContact[] = Array.from(m.values());
      console.log(`OBSERVED ENTITIES`);
      console.log(eventContacts);
      this.eventContacts = eventContacts
    });

    this.s.load()
  }

}
