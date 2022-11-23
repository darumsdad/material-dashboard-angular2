import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  emailList: any;
  html: any;
  origLink: any;

  constructor(public s: JotFormService,
    
    private e: EmailService,
    public dialog: MatDialogRef<JotFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  dataModel: any
  email_address: any
  
  eventId: any

  //emailList: any [] = [];

  ngOnInit(): void {
    this.dataModel = new FormControl();
    this.email_address = new FormControl(Validators.required);
    
    console.log(this.data)
    this.eventId = this.data.eventId;
    this.emailList = this.data.emailList;

    this.s.get(this.eventId).subscribe(e => {
      this.origLink = e.link
      let value = atob(e.templateHtml);
      this.dataModel.patchValue(value)
    })
  }

  onSend($event)
  {
    console.log(this.email_address);
    console.log(this.email_address.value)

    this.e.post({
      to: this.email_address.value.email,
      name: this.email_address.value.name,
      link: this.origLink
    }).subscribe( { next: (e) => {
      console.log(e);
      //this.dataModel.reset();
      //this.email_address.reset();
      this.dialog.close(e);

    }, error: (e) => {
      console.log(e)
      alert(e.message)

    }})
  }

  // createJotFormEmail(event: any) 
  // {
  //   this.s.get(this.eventId).subscribe(e => {
  //     let value = atob(e.link);
  //       this.dataModel.patchValue(value)
  //   })
  // }

  


}
