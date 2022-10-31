import { Component, Inject,NgZone,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GigDetailComponent } from 'app/gig-detail/gig-detail.component';
import { Venue } from 'app/models/venue';
import { VenueService } from 'app/services/venue.service';
import { first } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-venue-add',
  templateUrl: './venue-add.component.html',
  styleUrls: ['./venue-add.component.scss']
})


export class VenueAddComponent  implements OnInit {
  
  form: FormGroup;

  constructor(public zone: NgZone,
    private formBuilder: FormBuilder,
    private venueService: VenueService,
    public dialogRef: MatDialogRef<GigDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public newVenue: Venue) { }

  ngOnInit(): void {
    
    this.form = new FormGroup({
        name: new FormControl(),
        addressLine1: new FormControl(),
        addressLine2: new FormControl(),
        city: new FormControl(),
        state: new FormControl(),
        zip: new FormControl(),
        phone: new FormControl()
    });
       
  }

  onSubmit() {
    
    console.log('onSubmit')
   
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.venueService.create(this.form.value).subscribe({
          next: (data) => {
              console.log(data.id)
              this.newVenue = data
              this.dialogRef.close(data);
          },
          error: error => {
          }
      });

  }


  getEstablishmentAddress(place: object) {
    
    console.log(place)
    this.form.patchValue({
      name: place['name'],
      addressLine1 : this.getStreetNumber(place) + ' ' + this.getStreet(place),
      city : this.getCity(place),
      state : this.getState(place),
      zip : this.getPostCode(place),
      phone : place['formatted_phone_number']
    })

    this.zone.run(() => {

      this.form.patchValue({
        name: place['name'],
        addressLine1 : this.getStreetNumber(place) + ' ' + this.getStreet(place),
        city : this.getCity(place),
        state : this.getState(place),
        zip : this.getPostCode(place),
        phone : place['formatted_phone_number']
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
