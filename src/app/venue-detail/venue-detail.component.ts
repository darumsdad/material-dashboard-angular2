import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VenueService } from 'app/services/venue.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.scss']
})
export class VenueDetailComponent implements OnInit {

  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private venueService: VenueService) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    
    this.form = new FormGroup({
        name: new FormControl('',Validators.required),
        addressLine1: new FormControl(),
        addressLine2: new FormControl(),
        city: new FormControl(),
        state: new FormControl(),
        zip: new FormControl(),
        phone: new FormControl()
    });

    if (!this.isAddMode) {
        this.venueService.get(this.id)
            .pipe(first())
            .subscribe(x => this.form.patchValue(x));
    }
  }

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
        this.create();
    } else {
        this.update();
    }
  }

  private create() {
    this.venueService.create(this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
                //this.alertService.success('User added', { keepAfterRouteChange: true });
                this.router.navigate(['venue-list']);
            },
            error: error => {
                //this.alertService.error(error);
                //this.loading = false;
            }
        });
  }
  
  private update() {
    this.venueService.update(this.id, this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
                //this.alertService.success('User updated', { keepAfterRouteChange: true });
                this.router.navigate(['venue-list']);
            },
            error: error => {
                //this.alertService.error(error);
                this.loading = false;
            }
        });
  }



}
