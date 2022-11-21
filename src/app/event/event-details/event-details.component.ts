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

  @Input()
  dataModel: any;

  // eventTypes: any[] = ['Wedding', 'Mitzvah', 'Other']
  

  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  // statuses: any[] = [
  //   { id: 0, name: '(Default) Hold' },
  //   { id: 1, name: 'Lead' },
  //   { id: 2, name: 'Proposal Sent (2 days after Lead )' },
  //   { id: 4, name: 'Proposal Accepted' },
  //   { id: 5, name: 'Pre-Contract Questionnaire Sent (2 days after Proposal Accepted)' },
  //   { id: 6, name: 'Pre-Contract Questionnaire Completed' },
  //   { id: 7, name: 'Contract Sent (2 days after Pre-Contract Questionnaire Completed)' },
  //   { id: 8, name: 'Contract Received - Deposit Pending, Contract and Deposit Received' },
  //   { id: 9, name: 'Pre-Wedding Meeting Scheduled (2-3 weeks prior to Wedding Date)' },
  //   { id: 10, name: 'Pre-Wedding Questionnaire Sent (3 days prior to meeting)' },
  //   { id: 11, name: 'Pre-Wedding Meeting Complete, Wedding Paid in Full (no later than Wedding Date)' },
  //   { id: 12, name: 'Highlight Song Selection Pending' },
  //   { id: 13, name: 'Highlight Song Selected' },
  //   { id: 14, name: 'Highlight Video Production Pending (3-4 weeks after Song Selected)' },
  //   { id: 15, name: 'Highlight Video Production Completed/Pending Approval' },
  //   { id: 16, name: 'Highlight Video Approved' }
  // ]

  jotFormMapping: any [] = [

    { jotName: 'brideName', formName: 'bride_name' },
    { jotName: 'bridePhone', formName: 'bride_phone' },
    { jotName: 'brideEmail', formName: 'bride_email' },

    { jotName: 'brideMomName', formName: 'bride_mom_name' },
    { jotName: 'brideMomPhone', formName: 'bride_mom_phone' },
    { jotName: 'brideMomEmail', formName: 'bride_mom_email' },
    { jotName: 'brideSocial', formName: 'bride_social' },

    { jotName: 'brideDadName', formName: 'bride_dad_name' },
    { jotName: 'brideDadPhone', formName: 'bride_dad_phone' },
    { jotName: 'brideDadEmail', formName: 'bride_dad_email' },
    { jotName: 'brideCanText', formName: 'bride_phone_text' },
    { jotName: 'cid', formName: 'id' },

    { jotName: 'groomName', formName: 'groom_name' },
    { jotName: 'groomPhone', formName: 'groom_phone' },
    { jotName: 'groomEmail', formName: 'groom_email' },
    { jotName: 'groomSocial', formName: 'groom_social' },

    { jotName: 'groomMomName', formName: 'groom_mom_name' },
    { jotName: 'groomMomPhone', formName: 'groom_mom_phone' },
    { jotName: 'groomMomEmail', formName: 'groom_mom_email' },

    { jotName: 'groomDadName', formName: 'groom_dad_name' },
    { jotName: 'groomDadPhone', formName: 'groom_dad_phone' },
    { jotName: 'groomDadEmail', formName: 'groom_dad_email' },
    { jotName: 'groomCanText', formName: 'groom_phone_text' },
    
    { jotName: 'weddingDate', formName: 'date' },
    
    { jotName: 'additionalLocations', formName: 'other_location' },

    { jotName: 'weddingStart', formName: 'start' },
    { jotName: 'weddingEnd', formName: 'end' },

  ]

  copyJotForm() {
    const pending = this.clipboard.beginCopy(this.dataModel.value);
    let remainingAttempts = 3;
    const attempt = () => {
      const result = pending.copy();
      if (!result && --remainingAttempts) {
        setTimeout(attempt);
      } else {
        // Remember to destroy when you're done!
        pending.destroy();
      }
    };
    attempt();
  }

  handleEditorInit(event: any)
  {
    console.log("load")
    console.log(event)
    this.e = event;
    

  }

  jotLink: any

  copyJotHtml(event: any)
  {
    
    console.log(this.e)
    this.jotLink = this.onJotUrl(null);
    this.dataModel.patchValue("<h4> Thanks for your interest</h4> <p> Please <a href='" + this.jotLink + "'>click here</a> to fill out the form </h4>")
    this.copyJotForm();
    //this.router.navigateByUrl("https://mail.google.com/mail/u/0/?fs=1&to=email@domain.example&tf=cm")


  }


  emailRedirect(event: any)
  {
    this.router.navigateByUrl("https://mail.google.com/mail/u/0/?fs=1&to=email@domain.example&tf=cm")
  }

  onJotUrl(event: any) : any
  {
    let url: any = "https://www.jotform.com/223214405057143?"

    let maps = this.jotFormMapping.map(e => {
      
      if (e.jotName === 'cid')
      {
        return e.jotName + '=' + this.eventId
      }
      else if (this.form.get('data').get(e.formName).value)
      {

        
        if (e.formName.endsWith('phone'))
        {
          console.log(this.form.get('data').get(e.formName).value)
          return e.jotName + '[full]=' + this.form.get('data').get(e.formName).value
          
        }
        else if (e.formName.endsWith('phone_text'))
        {
          return e.jotName + '=' + (this.form.get('data').get(e.formName) ? "Yes" : "No")
        }
        else if (e.formName === 'date')
        {

          console.log(this.form.get('data').get(e.formName).value)

          let value = this.form.get('data').get(e.formName).value;
          let parts = value.split("T")[0].split("-");
          


          let year = parts[0]
          let month = parts[1]
          let day = parts[2]

          return e.jotName  + '[month]=' + month + '&' + e.jotName + '[day]=' +day + '&' + e.jotName + '[year]=' + year
          
          
        }

        else if (e.formName === 'start' || e.formName === 'end')
        {
          

          let value = this.form.get('data').get(e.formName).value;
          let parts = value.split(" ");
          let ampm = parts[1]
          let hour_parts = parts[0].split(':')
          let hourSelect = hour_parts[0]
          let minueSelect = hour_parts[1]

          return e.jotName  + '[hourSelect]=' + hourSelect + '&' + e.jotName + '[minuteSelect]=' +minueSelect + '&' + e.jotName + '[ampm]=' + ampm
          
          
        }
        else
        {
          return e.jotName + '=' + this.form.get('data').get(e.formName).value
        }
        
      }
        
    }).filter(x => x !== undefined).join('&')

    url = url + encodeURI(maps)
    
    console.log(url);
    return url;

  }

  ngOnInit(): void {

    this.dataModel = new FormControl();

    this.form = this.rootFormGroup.control.get('data') as FormGroup;

    // this.data = this.fb.group({
      
    //   status: [''],
    //   event_type: [''],
    //   description: [''],
    //   date: [''],
    //   start: [''],
    //   end: [''],
    //   status_update_date: [''],

    //   bride_name: [''],
    //   bride_phone: new FormControl(''),
    //   bride_phone_text: new FormControl(''),
    //   bride_email: new FormControl('', Validators.email),
    //   bride_social: new FormControl(''),

    //   bride_mom_name: [''],
    //   bride_mom_phone: new FormControl(''),
    //   bride_mom_email: new FormControl('', Validators.email),

    //   bride_dad_name: [''],
    //   bride_dad_phone: new FormControl(''),
    //   bride_dad_email: new FormControl('', Validators.email),

    //   groom_name: [''],
    //   groom_phone: new FormControl(''),
    //   groom_email: new FormControl('', Validators.email),
    //   groom_phone_text: new FormControl(''),
    //   groom_social: new FormControl(''),

    //   groom_mom_name: [''],
    //   groom_mom_phone: new FormControl(''),
    //   groom_mom_email: new FormControl('', Validators.email),

    //   groom_dad_name: [''],
    //   groom_dad_phone: new FormControl(''),
    //   groom_dad_email: new FormControl('', Validators.email),

    //   planner_name: [''],
    //   planner_phone: new FormControl(''),
    //   planner_email: new FormControl('', Validators.email),
    //   other_contact: [''],

    //   jotform_venue: [''],
    //   venueId: [''],
    //   other_location: [''],
    //   webhook_last_error: [''],
    //   last_submission_id: new FormControl()

    // })
    // this.form = this.fb.group({
    //   id: [''],
    //   data: this.data
    // })

    // this.form.markAsPristine()
   

    // if (this.eventId)
    // {
    //   this.s.get(this.eventId).subscribe(e => {
    //     console.log(e)
    //     this.form.get('data').patchValue(e.data);
    //     this.venueId = e.data.venueId
    //   })
    // }
  }

 
  // onSave(event: any) {
    
  //   console.log(this.form.value)

    
  //   if (this.form.get('data').get('bride_phone').value) 
  //     this.form.get('data').get('bride_phone').patchValue((this.form.get('data').get('bride_phone').value).number)
  //   if (this.form.get('data').get('bride_mom_phone').value) this.form.get('data').get('bride_mom_phone').patchValue((this.form.get('data').get('bride_mom_phone').value).number)
  //   if (this.form.get('data').get('bride_dad_phone').value) this.form.get('data').get('bride_dad_phone').patchValue((this.form.get('data').get('bride_dad_phone').value).number)

  //   if (this.form.get('data').get('groom_phone').value) this.form.get('data').get('groom_phone').patchValue((this.form.get('data').get('groom_phone').value).number)
  //   if (this.form.get('data').get('groom_mom_phone').value) this.form.get('data').get('groom_mom_phone').patchValue((this.form.get('data').get('groom_mom_phone').value).number)
  //   if (this.form.get('data').get('groom_dad_phone').value) this.form.get('data').get('groom_dad_phone').patchValue((this.form.get('data').get('groom_dad_phone').value).number)

  //   if (this.form.get('data').get('planner_phone').value) this.form.get('data').get('planner_phone').patchValue((this.form.get('data').get('planner_phone').value).number)

  //   console.log(this.form.value)

  //   if (this.eventId)
  //   {
  //     this.s.update(this.eventId,this.form.value).subscribe(result => {
  //       this.form.markAsUntouched()
  //       this.router.navigate(['detail',this.eventId])
  //     })
  //   }
  //   else
  //   {
  //     this.s.create(this.form.value).subscribe(result => {
  //       console.log(result)
  //       this.form.markAsUntouched()
  //       this.eventId = result.id
  //       this.router.navigate(['detail', this.eventId])
  //     })
  //   }

    
   
  //}

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
