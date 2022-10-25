import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'app/services/contact.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
       
        this.form = new FormGroup({
            firstName: new FormControl('',Validators.required),
            lastName: new FormControl(),
            addressLine1: new FormControl(),
            addressLine2: new FormControl(),
            city: new FormControl(),
            state: new FormControl(),
            zip: new FormControl(),
            email: new FormControl(),
            phone: new FormControl(),
        });

        if (!this.isAddMode) {
            this.contactService.get(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
  }

  get f() { return this.form.controls; }

  getClass(invalid: boolean) {
    if (invalid) return 'example-full-width has-danger' 
    else return 'example-full-width'
   
 }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.createUser();
    } else {
        this.updateUser();
    }
}

private createUser() {
  this.contactService.create(this.form.value)
      .pipe(first())
      .subscribe({
          next: () => {
              //this.alertService.success('User added', { keepAfterRouteChange: true });
              this.router.navigate(['contact-list']);
          },
          error: error => {
              //this.alertService.error(error);
              //this.loading = false;
          }
      });
}

private updateUser() {
  this.contactService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
          next: () => {
              //this.alertService.success('User updated', { keepAfterRouteChange: true });
              this.router.navigate(['contact-list']);
          },
          error: error => {
              //this.alertService.error(error);
              this.loading = false;
          }
      });
}



}
