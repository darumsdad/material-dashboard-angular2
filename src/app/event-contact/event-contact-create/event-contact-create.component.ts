import { Component, Inject, Input, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Decorator } from 'app/models/decorator';
import { EventContact } from 'app/models/event-contact';
import { EventContactDecorator } from 'app/models/event-contact-decorator';
import { ContactService } from 'app/services/contact.service';
import { DecoratorService } from 'app/services/decorator.service';
import { EventContactDecoratorService } from 'app/services/event-contact-decorator.service';
import { EventContactService } from 'app/services/event-contact.service';

@Component({
  selector: 'app-event-contact-create',
  templateUrl: './event-contact-create.component.html',
  styles: ['.center { display: flex; }'
  ]
})
export class EventContactCreateComponent implements OnInit {

  constructor(public zone: NgZone,
    private formBuilder: FormBuilder,
    private decoratorService: DecoratorService,
    private eventContactService: EventContactService,
    private eventContactDecoratorService: EventContactDecoratorService,
    private contactService: ContactService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  form: FormGroup;
  addMode : boolean;
  decorators: Decorator[];
  unlock: boolean = false;
  
  
  ngOnInit(): void {

    this.addMode = !this.data.eventContact;
    
    this.form = this.formBuilder.group({
      type: [''],
       
      
      contact: this.formBuilder.group({
        id: [''],
        gid: [''],
        firstName: [''],
        lastName: [''],
        email: [''],
        address: [''],
       
        city: [''],
        state: [''],
        zip: ['',Validators.required],
        phone: ['']})
        
    });

    
   

    this.decorators = this.contactService.getContactTypeDecorators();

    if (!this.addMode)
    {
      let eventContact: EventContact = this.data.eventContact
     
      let type = eventContact.decorators.find(d => d.type === 'contact-type').decorator

      let _type = this.decorators.find(x => x.id === type.id)

      let p = {
        contact: eventContact.contact,
        type: _type
      }

      console.log(p)
      console.log(this.decorators)
      this.form.patchValue(p)

      
    }
    
  }

  setChecked(completed: boolean) {
    this.unlock = completed;
    
  }

  onSubmit()
  {
      let contact =  this.form.value.contact
      this.contactService.newEventContact(contact,this.form.value.type,this.data.eventId)
      console.log(contact)    
  }

  onUpdate(eventContact: EventContact)
  {
      let contact =  this.form.value.contact
      let type = this.form.value.type
      console.log('saving')
      console.log(contact)
      console.log(type)
      this.contactService.onUpdateEventContact(contact, type,this.data.eventContact)

         
  }

  getEstablishmentAddress(place: object) {
    
    console.log(place)
    this.form.patchValue({
      contact : { 
        address : this.getStreetNumber(place) + ' ' + this.getStreet(place),
        city : this.getCity(place),
        state : this.getState(place),
        zip : this.getPostCode(place)
      }
       
    })

    this.zone.run(() => {

      this.form.patchValue({
        
        addressLine1 : this.getStreetNumber(place) + ' ' + this.getStreet(place),
        city : this.getCity(place),
        state : this.getState(place),
        zip : this.getPostCode(place),
        
      })

    });
  }

  getAddrComponent(place, componentTemplate) {
    let result;

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  getStreetNumber(place) {
    const COMPONENT_TEMPLATE = { street_number: 'short_name' },
      streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return streetNumber;
  }

  getStreet(place) {
    const COMPONENT_TEMPLATE = { route: 'long_name' },
      street = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return street;
  }

  getCity(place) {
    const COMPONENT_TEMPLATE = { locality: 'long_name' },
      city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return city;
  }

  getState(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_1: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getDistrict(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_2: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getCountryShort(place) {
    const COMPONENT_TEMPLATE = { country: 'short_name' },
      countryShort = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return countryShort;
  }

  getCountry(place) {
    const COMPONENT_TEMPLATE = { country: 'long_name' },
      country = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return country;
  }

  getPostCode(place) {
    const COMPONENT_TEMPLATE = { postal_code: 'long_name' },
      postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }

  getPhone(place) {
    const COMPONENT_TEMPLATE = { formatted_phone_number: 'formatted_phone_number' },
      phone = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return phone;
  }


    

}
