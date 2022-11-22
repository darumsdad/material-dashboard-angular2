import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { EmailService } from 'app/services/email-service';
import { JotFormService } from 'app/services/jot-form-service';
import * as e from 'express';

@Component({
  selector: 'app-jot-form',
  templateUrl: './jot-form.component.html',
  styleUrls: ['./jot-form.component.scss']
})
export class JotFormComponent implements OnInit {
  ref: any;
  form: FormGroup;

  constructor(public s: JotFormService,
    private rootFormGroup: FormGroupDirective,
    private e: EmailService) { }

  dataModel: any
  email_address: any
  emails: any = ['bride_email','bride_mom_email','bride_dad_email','groom_email','groom_mom_email','groom_dad_email'];
  @Input()
  eventId: any

  emailList: any [] = [];

  ngOnInit(): void {
    this.dataModel = new FormControl();
    this.email_address = new FormControl();
    this.form = this.rootFormGroup.control.get('data') as FormGroup;

    this.emails.forEach(e => {
      if (this.form.get(e).value)
      {
        this.emailList.push({
          name: e,
          email: this.form.get(e).value
        })
      }
    })
    console.log(this.emailList)
  }

  onSend($event)
  {
    console.log(this.email_address.value)
    this.e.post({
      email: this.email_address.value,
      html: btoa(this.dataModel.value)
    }).subscribe( { next: (e) => {
      console.log(e);
      this.dataModel.reset();
      this.email_address.reset();

    }, error: (e) => {
      console.log(e)
      alert(e.message)

    }})
  }

  createJotFormEmail(event: any) 
  {
    this.s.get(this.eventId).subscribe(e => {
      let value = atob(e.link);
        this.dataModel.patchValue(value)
    })
  }

}
