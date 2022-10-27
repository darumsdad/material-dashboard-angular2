import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { GigService } from 'app/services/gig.service';
import { first } from 'rxjs/operators';
import { Contact } from 'app/models/contact';
import { Venue } from 'app/models/venue';

@Component({
  selector: 'app-gig-detail',
  templateUrl: './gig-detail.component.html',
  styleUrls: ['./gig-detail.component.scss']
})
export class GigDetailComponent implements OnInit {

  gigForm: FormGroup;
  updateContactForm: FormGroup;
  linkContactFormControl = new FormControl('');
  venueFormControl = new FormControl('');
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

   
  contactTypes: any[] = [
    { id: 1,
        name: "Bride"
    },{ id: 2,
        name: "Groom"
    }];

    gigTypes: any[] = [
        { id: 1,
            name: "Wedding"
        },{ id: 2,
            name: "Mitzvah"
        }];

 venues: Venue[] =[{"id":3,"name":"Temple Emanu-El of Closter","phone":"(201) 750-9997","addressLine1":"180 Piermont Rd","addressLine2":null,"city":"Closter","state":"NJ ","zip":"07624"},{"id":4,"name":"The Legacy Castle","phone":"(973) 907-7750","addressLine1":"141 NJ-23","addressLine2":"","city":"Pompton Plains","state":"NJ ","zip":"07444"}];

  contacts: Contact[] = [{"id":1,"firstName":"David","lastName":"Goldstein","email":"darumsdad@gmail.com","phone":"(201) 688-6234","addressLine1":"377 Windsor Road","addressLine2":"","city":"Bergenfield","state":"NJ","zip":"07621"},{"id":13,"firstName":"Amir","lastName":"Goldstein","email":"amirgold1@yahoo.com","phone":null,"addressLine1":"9 Curtis Ave","addressLine2":null,"city":"West Orange","state":"NJ","zip":"07888"}];
  
  filteredOptions: Observable<Contact[]>;
  filteredVenues: Observable<Venue[]>;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gigService: GigService) { }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.isAddMode = !this.id;
      
      this.gigForm = new FormGroup({
        description: new FormControl(),
        venueId : this.venueFormControl
      });

      this.updateContactForm = new FormGroup({
        contact: this.linkContactFormControl,
        type: new FormControl()
      })
  
      if (!this.isAddMode) {
          this.gigService.get(this.id)
              .pipe(first())
              .subscribe(x => {
                this.gigForm.patchValue(x)
              });
      }

      console.log(this.gigForm)

      this.filteredOptions = this.linkContactFormControl.valueChanges.pipe(
        startWith(''),
        map(contact => contact ? this._filterContact(contact || '') : this.contacts.slice()),
      );

      this.filteredVenues = this.venueFormControl.valueChanges.pipe(
        startWith(''),
        map(venue => venue ? this._filterVenue(venue || '') : this.venues.slice()),
      );

    }

    displayFn(contact: Contact): string {
        return contact ? contact.firstName + ' ' + contact.lastName : '';
    }

    displayVenue(venue: Venue): string {
        console.log("--dv");
        console.log(venue);
        
        if (typeof venue === 'string' || venue instanceof String)
        {
            return venue ? venue.name : '';
        }
        else if (typeof venue === 'number' || venue instanceof Number)
        {
            return this.venues.filter(v => v.id === venue).length === 1 ? this.venues.find(v => v.id === venue).name : '';
        }
        else {
            return this.venues.filter(v => v.id === venue.id).length === 1 ? this.venues.find(v => v.id === venue.id).name : '';
        }
            // console.log(typeof venue);
            // console.log(this.venues);
            // console.log(this.venues.find(v => v.id === venue));
            // this.venues.find(v => v.id === venue)
            
         
    }

    private _filterContact(value: any): Contact[] {
        console.log("--?");
        console.log(value)
        
        const filterValue = (typeof value === 'string' || value instanceof String) ?  value.toLowerCase() : value.lastName.toLowerCase
        return this.contacts.filter(contact => contact.lastName.toLowerCase().indexOf(filterValue) === 0);
    }

    private _filterVenue(value: any): Venue[] {
        console.log("--V");
        console.log(value)
        
      

        if (typeof value === 'string' || value instanceof String)
        {
            const filterValue =  value.toLowerCase()
            return this.venues.filter(venue => venue.name.toLowerCase().indexOf(filterValue) === 0 || venue.id.toString() === value );
        }
        else
        {
            return this.venues.slice();
        }
        
    }

    onSubmit() {
      this.submitted = true;
  
      // stop here if form is invalid
      if (this.gigForm.invalid) {
          return;
      }
  
      this.loading = true;
      if (this.isAddMode) {
          this.create();
      } else {
          this.update();
      }
    }

    onLinkContact() {
        console.log(this.updateContactForm.value)     
    }

    private create() {
      this.gigService.create(this.gigForm.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  //this.alertService.success('User added', { keepAfterRouteChange: true });
                  this.router.navigate(['gig-list']);
              },
              error: error => {
                  //this.alertService.error(error);
                  //this.loading = false;
              }
          });
    }
    
    private update() {
      this.gigService.update(this.id, this.gigForm.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  //this.alertService.success('User updated', { keepAfterRouteChange: true });
                  this.router.navigate(['gig-list']);
              },
              error: error => {
                  //this.alertService.error(error);
                  this.loading = false;
              }
          });
    }

}
