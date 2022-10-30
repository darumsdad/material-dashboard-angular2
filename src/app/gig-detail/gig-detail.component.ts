import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { GigService } from 'app/services/gig.service';
import { GigTypeService } from 'app/services/gig-type.service';
import { VenueService } from 'app/services/venue.service';
import { first } from 'rxjs/operators';
import { Contact } from 'app/models/contact';
import { Venue } from 'app/models/venue';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VenueAddComponent } from 'app/venue-add/venue-add.component';


@Component({
  selector: 'app-gig-detail',
  templateUrl: './gig-detail.component.html',
  styleUrls: ['./gig-detail.component.scss']
})



export class GigDetailComponent implements OnInit {

  gigForm: FormGroup;
  venueUpdateForm: FormGroup;
  updateContactForm: FormGroup;
  linkContactFormControl = new FormControl('');
  venueFormControl = new FormControl('');

  newVenue: Venue;

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

  gigTypes: any[];
  venues: Venue[];
  contacts: Contact[] = [{"id":1,"firstName":"David","lastName":"Goldstein","email":"darumsdad@gmail.com","phone":"(201) 688-6234","addressLine1":"377 Windsor Road","addressLine2":"","city":"Bergenfield","state":"NJ","zip":"07621"},{"id":13,"firstName":"Amir","lastName":"Goldstein","email":"amirgold1@yahoo.com","phone":null,"addressLine1":"9 Curtis Ave","addressLine2":null,"city":"West Orange","state":"NJ","zip":"07888"}];

  
  filteredOptions: Observable<Contact[]>;
  filteredVenues: Observable<Venue[]>;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gigService: GigService,
    private venueService: VenueService,
    private gigTypeService: GigTypeService,
    public dialog: MatDialog
    ) { }

    
    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.isAddMode = !this.id;
      
      this.gigForm = new FormGroup({
        description: new FormControl(),
        typeId: new FormControl(),
      });

      this.updateContactForm = new FormGroup({
        contact: this.linkContactFormControl,
        type: new FormControl()
      })

      this.venueUpdateForm = new FormGroup({
        venueId : this.venueFormControl,
      })
  
     
      
      this.gigTypeService.getAll().pipe(first())
      .subscribe(x => { 
        this.gigTypes = x  });

      this.venueService.getAll().pipe(first())
      .subscribe(x => { 
           this.venues = x  

            this.filteredVenues = this.venueFormControl.valueChanges.pipe(
                startWith(''),
                map(venue => venue ? this._filterVenue(venue || '') : this.venues.slice()),
              );

              if (!this.isAddMode) {
                this.gigService.get(this.id)
                    .pipe(first())
                    .subscribe(x => {
                      this.gigForm.patchValue(x)
                      this.venueUpdateForm.patchValue({
                          venueId : x.venueId
                      })
                    });
            }

        });
     

      //console.log(this.gigForm)
      console.log(this.venues)

      this.filteredOptions = this.linkContactFormControl.valueChanges.pipe(
        startWith(''),
        map(contact => contact ? this._filterContact(contact || '') : this.contacts.slice()),
      );
     
    }


    displayFn(contact: Contact): string {
        return contact ? contact.firstName + ' ' + contact.lastName : '';
    }

    displayVenue(venue: Venue): string {
        console.log("--dv");
        console.log(venue);

        
        if (!this.venues)
        {
            console.log("bompb");
            return ''
           
        }
      
        else if (typeof venue === 'number' || venue instanceof Number)
        {
            return this.venues.filter(v => v.id === venue).length === 1 ? this.venues.find(v => v.id === venue).name : '';
        }
        
        return ''
          
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
            return this.venues.filter(venue => venue.name.toLowerCase().includes(filterValue) || venue.id.toString() === value );
        }
        else
        {
            return this.venues.slice();
        }
        
    }

    onUpdateVenue() {
        console.log(this.venueUpdateForm.value)  
        this.gigService.updateVenue(this.id,this.venueUpdateForm.value)
        .pipe(first())
        .subscribe({
            next: () => {
                //this.router.navigate(['gig-list']);
            },
            error: error => {
            }
        });
    }

    // addNewVenue()  {
    //     const dialogRef = this.dialog.open(VenueDetailComponent, {
    //         width: '250px',
    //         // data: {name: this.name, animal: this.animal},
    //       });
      
    //       dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         //this.animal = result;
    //       });

    // }


    onSubmit() {
      this.submitted = true;
  
      console.log(this.gigForm.value)     
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
          .subscribe( {
              next: (data) => {
                  //this.alertService.success('User added', { keepAfterRouteChange: true });
                  this.router.navigate(["gig-detail", data.id ]);
                  
                  
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
                  this.router.navigate(["gig-detail", this.id]);
              },
              error: error => {
                  //this.alertService.error(error);
                  this.loading = false;
              }
          });
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(VenueAddComponent, {
        width: '750px',
        data: {newVenue: this.newVenue},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
       
        this.venues.push(result)
        this.venueUpdateForm.patchValue({
          venueId : result.id
        })
        this.onUpdateVenue()
      });
    }

}

 