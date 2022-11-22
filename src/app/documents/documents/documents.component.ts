import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { JotFormComponent } from '../jot-form/jot-form.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  form: FormGroup;
  emails: any = ['bride_email','bride_mom_email','bride_dad_email','groom_email','groom_mom_email','groom_dad_email'];
  emailList: any = [];

  @Input()
  eventId: any

  constructor(public dialog: MatDialog,
    private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {

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

  openJotForm(event: any): void {
    const dialogRef = this.dialog.open(JotFormComponent, {
      width: '650px',
      data: { 
        emailList: this.emailList,
        eventId: this.eventId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
