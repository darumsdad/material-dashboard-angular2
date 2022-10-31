import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {forkJoin, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { GigService } from 'app/services/gig.service';
import { GigTypeService } from 'app/services/gig-type.service';
import { VenueService } from 'app/services/venue.service';
import { first } from 'rxjs/operators';
import { Contact } from 'app/models/contact';
import { Venue } from 'app/models/venue';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VenueAddComponent } from 'app/venue-add/venue-add.component';
import { GigContactService } from 'app/services/gig-contact.service';
import { GigContact } from 'app/models/gig-contact';
import { GigContactComponent } from 'app/gig-contact/gig-contact.component';
import { ContactService } from 'app/services/contact.service';


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

   
  contactTypes: any[];

  gigTypes: any[] = [];
  venues: Venue[] = [];
  contacts: Contact[] = []
  gigContacts : GigContact[] = [];
  
  filteredOptions: Observable<Contact[]>;
  filteredVenues: Observable<Venue[]>;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gigService: GigService,
    private venueService: VenueService,
    private gigTypeService: GigTypeService,
    private gigContactService: GigContactService,
    private contactService: ContactService,
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
      .subscribe(x => { this.gigTypes = x  });

      this.venueService.getAll().pipe(first())
      .subscribe(x => { 
        
        console.log(this.venues)
        this.venues = x  

            this.filteredVenues = this.venueFormControl.valueChanges.pipe(
                startWith(''),
                map(venue => venue ? this._filterVenue(venue || '') : this.venues.slice()),
              );

              if (!this.isAddMode) {
                this.gigContactService.getByGigId(!this.id ? 0 :this.id).pipe(first())
                .subscribe(x => { 
                  this.gigContacts = x  

                  this.gigService.get(this.id)
                  .pipe(first())
                  .subscribe(x => {
                    this.gigForm.patchValue(x)
                    this.venueUpdateForm.patchValue({
                        venueId : x.venueId
                    })
                  });

                });
              }
        });
       

      console.log(this.venues)

      this.filteredOptions = this.linkContactFormControl.valueChanges.pipe(
        startWith(''),
        map(contact => contact ? this._filterContact(contact || '') : this.contacts.slice()),
      );
     
    }

    loadContacts()
    {}

    displayFn(contact: Contact): string {
        return contact ? contact.firstName + ' ' + contact.lastName : '';
    }

    displayVenue(venue: Venue): string {
        console.log('Venue: displayVenue' + venue);

        
        if (!this.venues)
        {
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
        console.log('_filterVenue ' + value)

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

    onUpdateContacts() {
      this.gigContactService.getByGigId(!this.id ? 0 :this.id).pipe(first())
      .subscribe(x => { 
        this.gigContacts = x  })

    }

    onUpdateVenue() {
      console.log(this.venueUpdateForm.value)  
      this.gigService.updateVenue(this.id,this.venueUpdateForm.value)
      .pipe(first())
      .subscribe({
          next: () => {
          },
          error: error => {
          }
      });
  }

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
                  this.router.navigate(["gig-detail", data.id ]);
              },
              error: error => {
              }
          });
    }
    
    private update() {
      this.gigService.update(this.id, this.gigForm.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.router.navigate(["gig-detail", this.id]);
              },
              error: error => {
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
       
        if (this.venues)
        {
          this.venues.push(result)
        }
        else
        {
          this.venues = [result];
        }
        this.venueUpdateForm.patchValue({
          venueId : result.id
        })
        this.onUpdateVenue()
      });
    }

    addNewContact(): void {
      const dialogRef = this.dialog.open(GigContactComponent, {
        width: '750px',
        data: {gigId: this.id},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
       
        
        this.onUpdateContacts()
      });
    }

    editContact(data: any): void {
      const dialogRef = this.dialog.open(GigContactComponent, {
        width: '750px',
        data: {gigId: this.id, gigContact: data},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
       
        
        this.onUpdateContacts()
      });
    }

    deleteContact(data: any): void {
      console.log(data);
      //this.gigContactService.delete(data.)
      if(confirm("Are you sure to delete "+ data.contact.firstName + ' ' + data.contact.lastName)) {
        console.log("Implement delete functionality here");
        this.gigContactService.delete(data.id).subscribe({
          next: () => {
              this.contactService.delete(data.contact.id).subscribe({
                next: () => {
                  this.onUpdateContacts()
                }
              })
              
          },
          error: error => {
               
          }
      });
      }
        
      
    }

}

 