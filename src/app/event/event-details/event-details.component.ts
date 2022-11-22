import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventMainService } from 'app/services/event-main.service';
 
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import {Clipboard} from '@angular/cdk/clipboard';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  
  e: any;

  @Input()
  eventId: any
 

  constructor(
    public fb: FormBuilder, 
    public s: EventMainService,
    private route: ActivatedRoute,
    private router: Router,
    private clipboard: Clipboard,
    private rootFormGroup: FormGroupDirective
    ) { }

  
  form: FormGroup;
  // data: FormGroup;

  dataModel: any;

  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];


  handleEditorInit(event: any)
  {
    console.log("load")
    console.log(event)
    this.e = event;
    

  }

   

  emailRedirect(event: any)
  {
    this.router.navigateByUrl("https://mail.google.com/mail/u/0/?fs=1&to=email@domain.example&tf=cm")
  }

  

  ngOnInit(): void {
 
    this.form = this.rootFormGroup.control.get('data') as FormGroup;
  }
 
 
  onChangeStatus(event: any) {
    console.log(event);
    this.form.get('data').get('status_update_date').patchValue(new Date().toISOString())
  }

  onRetrySubmission(id: any)
  {
    this.s.submission(id).subscribe( e => {
      this.router.navigate(["event",this.eventId])
    });

  }

  onVenueSelected(event: any) {
    console.log(event);
    this.form.get('data').get('venueId').patchValue(event);
    this.form.markAsTouched();
  }

}
