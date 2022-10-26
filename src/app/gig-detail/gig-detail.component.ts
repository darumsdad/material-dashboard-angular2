import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { GigService } from 'app/services/gig.service';
import { first } from 'rxjs/operators';
import { Contact } from 'app/models/contact';

@Component({
  selector: 'app-gig-detail',
  templateUrl: './gig-detail.component.html',
  styleUrls: ['./gig-detail.component.scss']
})
export class GigDetailComponent implements OnInit {

  gigForm: FormGroup;
  updateContactForm: FormGroup;
  linkContactFormControl = new FormControl('');
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

  contacts: Contact[] = [
    { id: 1,
        firstName: "David",
        lastName: "G",
        email: "dddd",
        phone: "string",
        addressLine1: "string",
        addressLine2: "string",
        city: "string",
        state: "string",
        zip: "string"},
    { id: 2,
        firstName: "Amir",
        lastName: "G",
        email: "zzzz",
        phone: "string",
        addressLine1: "string",
        addressLine2: "string",
        city: "string",
        state: "string",
        zip: "string"},
    { id: 3,
        firstName: "Joe",
        lastName: "B",
        email: "vvvv",
        phone: "string",
        addressLine1: "string",
        addressLine2: "string",
        city: "string",
        state: "string",
        zip: "string"},];
  
  filteredOptions: Observable<Contact[]>;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gigService: GigService) { }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.isAddMode = !this.id;
      
      this.gigForm = new FormGroup({
        description: new FormControl(),
      });

      this.updateContactForm = new FormGroup({
        contact: this.linkContactFormControl,
        type: new FormControl()
      })
  
      if (!this.isAddMode) {
          this.gigService.get(this.id)
              .pipe(first())
              .subscribe(x => this.gigForm.patchValue(x));
      }

      this.filteredOptions = this.linkContactFormControl.valueChanges.pipe(
        startWith(''),
        map(contact => contact ? this._filter(contact || '') : this.contacts.slice()),
      );

    }

    displayFn(contact: Contact): string {
        return contact ? contact.firstName + ' ' + contact.lastName : '';
    }

    private _filter(value: any): Contact[] {
        console.log("--?");
        console.log(value)
        
        const filterValue = (typeof value === 'string' || value instanceof String) ?  value.toLowerCase() : value.lastName.toLowerCase
        return this.contacts.filter(contact => contact.lastName.toLowerCase().indexOf(filterValue) === 0);
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
