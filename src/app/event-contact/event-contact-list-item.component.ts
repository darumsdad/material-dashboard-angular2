import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'app/models/contact';
 

@Component({
  selector: 'app-event-contact-list-item',
  template: `
   
    <div class="container">
        <div class="row">
            <div class="col">
                <span>
                    <h3>{{contact.firstName}} {{contact.lastName}}</h3>
                </span>
            </div>

            <div class="col">
            </div>

        </div>
        <div class="row">
            <div class="col">


              <div class="row">
                   
                  <div class="col-md">
                   <p class="text-muted mb-1"><i class="material-icons">email</i> {{contact.email}}</p>
                  </div>
              </div>

              <div class="row">
                   
                  <div class="col-md">
                    <p class="text-muted mb-1"><i class="material-icons">phone</i> {{contact.phone}}</p>
                  </div>
              </div>



            </div>
            <div class="col">
                <span>
                    <p class="text-muted mb-1">{{contact.address}}</p>
                    <p class="text-muted mb-1"> {{contact.city}} {{contact.state}}, {{contact.zip}}</p>
                </span>
            </div>
        </div>
    </div>

 
 
  `,
  styles: ['table { font-weight: bold; }',
  ' .material-icons { vertical-align: middle; }']
})
export class EventContactListItemComponent implements OnInit {

  constructor() { }

  @Input() 
  contact: Contact
  
  ngOnInit(): void {
  }

}
