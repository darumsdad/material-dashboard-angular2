import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EventMainService } from 'app/services/event-main.service';
import { JotFormComponent } from '../jot-form/jot-form.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  form: FormGroup;
  emails_types: any = ['bride','bride_mom','bride_dad','groom','groom_mom','groom_dad','planner'];
  emailList: any = [];

  @Input()
  eventId: any

  @Input()
  emails: any

  constructor(public dialog: MatDialog,
    private rootFormGroup: FormGroupDirective,
    private s: EventMainService) { }

  displayedColumns: string[] = ['id', 'to','status'];
  dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {

    this.form = this.rootFormGroup.control.get('data') as FormGroup;

    this.emails_types.forEach(e => {
      let email_tag = e + '_email'
      let name_tag = e + '_name'

      if (this.form.get(email_tag).value && this.form.get(name_tag).value)
      {
        this.emailList.push({
          type: e,
          name: this.form.get(name_tag).value,
          email: this.form.get(email_tag).value
        })
      }
    })
    console.log(this.emails)
    
    this.s.get(this.eventId).subscribe({
      next: (e) => {
        console.log(e.data.emails)
        this.dataSource.data = e.data.emails
      },
      error: (e) => {}
    })
    
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
      this.dataSource.data.push(result)
      this.dataSource.data = this.dataSource.data.slice();
    });
  }

}
