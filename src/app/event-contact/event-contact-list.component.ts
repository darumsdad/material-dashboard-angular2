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
          <app-event-contact-list-item [contact]=ec.contact>
          </app-event-contact-list-item>
        </td>
        <td>
        {{getType(ec)}}
        </td> 
        <td>
        <button *ngIf="!isPrimary(ec)" (click)="onClick(ec)" mat-raised-button color="primary">Primary</button>
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
  
    this.s.tree$.subscribe((m: Map<string, EventContact>) => {
      const eventContacts: EventContact[] = Array.from(m.values());
     
      //console.log(eventContacts)
      this.eventContacts = eventContacts
    });

    this.s.load(1)
  }

  public getType(ec: EventContact): string {

    if (!ec.decorators) {
        return null
    }

   // console.log(ec.decorators)
    const found = ec.decorators.find(x => {

        return x.type === "contact-type"
    })

    return found.decorator.decoratorString
}

public isPrimary(ec: EventContact): boolean {

  if (!ec.decorators)
      return false;

  return ec.decorators.some(x => {
      return x.type === "primary-contact-indicator"
  })

}

  onClick(eventContct: any)
  {
    console.log(eventContct)
    this.s.makeEventContactPrimary(eventContct)

  }

}
