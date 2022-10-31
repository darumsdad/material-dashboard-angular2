import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GigDetailComponent } from 'app/gig-detail/gig-detail.component';
import { GigContactType } from 'app/models/gig-contact-type';
import { ContactService } from 'app/services/contact.service';
import { GigContactTypeService } from 'app/services/gig-contact-type.service';
import { GigContactService } from 'app/services/gig-contact.service';
import { VenueService } from 'app/services/venue.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-gig-contact',
  templateUrl: './gig-contact.component.html',
  styleUrls: ['./gig-contact.component.scss']
})
export class GigContactComponent implements OnInit {

  form: FormGroup;
  gigContactType: FormControl;
  gigContactTypes: GigContactType[];
  addMode : boolean;
  id : number
  

  constructor(public zone: NgZone,
    private formBuilder: FormBuilder,
    private gigContactService: GigContactService,
    private contactService: ContactService,
    private gigContactTypeService: GigContactTypeService,
    public dialogRef: MatDialogRef<GigDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    
    console.log(this.data)
    this.addMode = !this.data.gigContact


    this.gigContactType = new FormControl()

    this.form = this.formBuilder.group({
        type: [''],
        contact: this.formBuilder.group({
          id: [''],
          firstName: [''],
          lastName: [''],
          email: [''],
          addressLine1: [''],
          addressLine2: [''],
          city: [''],
          state: [''],
          zip: [''],
          phone: ['']})
          
    });

    this.gigContactTypeService.getAll().pipe(first())
    .subscribe(x => { 
      this.gigContactTypes = x  
      if (!this.addMode)
      {
        console.log(this.data)
        let v = {
          type: this.data.gigContact.type.id,
          contact: this.data.gigContact.contact
        }
        this.form.patchValue(v)
      }
    });
       
  }

  onSubmit() {
    
    console.log('onSubmit')
    console.log(this.form.value)
   
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.contactService.create(
      this.form.value.contact
    ).subscribe( contact => {

      this.gigContactService.create({
        contactId: contact.id,
        gigId: this.data.gigId,
        typeId: this.form.value.type,
      }).subscribe({
            next: (data) => {
                console.log(this.form.value)
                this.dialogRef.close(this.form.value);
            },
            error: error => {
            }
        });
    })

  }

  onUpdate() {
    
    console.log('onUpdate')
    console.log(this.form.value)
   
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.contactService.update(this.form.value.contact.id,this.form.value.contact)
    .subscribe({

      next: (contact) => {
        console.log('next step')
        console.log(this.form.value)
        this.gigContactService.update(
          this.data.gigContact.id, {
            typeId: this.form.value.type
        }).subscribe({
          next: (update) => {
            this.dialogRef.close(this.form.value);
          }
          
        })


      },
      error: error => {
      }
    })
      
      
      
  }


  getEstablishmentAddress(place: object) {
    
    console.log(place)
    this.form.patchValue({
      contact : { 
        addressLine1 : this.getStreetNumber(place) + ' ' + this.getStreet(place),
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
