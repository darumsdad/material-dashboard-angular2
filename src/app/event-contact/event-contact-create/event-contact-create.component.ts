import { Component, ComponentFactoryResolver, Input, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Decorator } from 'app/models/decorator';
import { ContactService } from 'app/services/contact.service';
import { DecoratorService } from 'app/services/decorator';

@Component({
  selector: 'app-event-contact-create',
  templateUrl: './event-contact-create.component.html',
  styles: [
  ]
})
export class EventContactCreateComponent implements OnInit {

  constructor(public zone: NgZone,
    private formBuilder: FormBuilder,
    private decoratorService: DecoratorService,
    private contactService: ContactService) { }

  form: FormGroup;
  id: string;
  addMode : boolean;
  decorators: Decorator[];
  types: any[] = [
    'BRIDE','GROOM','PLANNER'
  ]

  @Input()
  eventId: number
  
  ngOnInit(): void {

    this.addMode = !this.id;

    
    this.form = this.formBuilder.group({
      type: [''],
      contact: this.formBuilder.group({
        id: [''],
        firstName: [''],
        lastName: [''],
        email: [''],
        address: [''],
       
        city: [''],
        state: [''],
        zip: [''],
        phone: ['']})
        
    });

    this.decoratorService.getAll().subscribe( decorators => {
      console.log(decorators)
      this.decorators = decorators.filter( d => {
        return this.types.includes(d.code)
      })
    })
    
  }

  onSubmit()
  {
      let contact =  this.form.value.contact
      this.contactService.newEventContact(contact,this.form.value.type,this.eventId)
      console.log(contact)
      
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
