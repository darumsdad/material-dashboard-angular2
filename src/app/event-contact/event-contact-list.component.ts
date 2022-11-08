import { Component, Input, OnInit } from '@angular/core';
import { EventContact } from 'app/models/event-contact';
import { ContactService } from 'app/services/contact.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventContactCreateComponent } from './event-contact-create/event-contact-create.component';



@Component({
  selector: 'app-event-contact-list',
  template: `
  <div class="row" *ngIf="isSaving" >
  <mat-spinner style="margin:0 auto;" mode="indeterminate" ></mat-spinner>
  </div>
  <div *ngIf="!isSaving" class="table-responsive">
  
    <table class="table align-middle bg-white">
      <thead class="bg-light">
          <tr>
              
              <th>Contact</th>
              <th>Type</th>
              <th>Actions</th>
               
          </tr>
      </thead>
      <tbody>
        <tr *ngFor="let ec of eventContacts">
          <td>
          <app-event-contact-list-item [contact]=ec.contact [isPrimary]=isPrimary(ec)>
          </app-event-contact-list-item>
        </td>
        <td>
        {{getType(ec)}}
        </td> 
        <td>
        <div class="example-button-row">
          <button [disabled]="isPrimary(ec)" (click)="makePrimary(ec)" mat-raised-button color="basic"><i class="material-icons">star</i></button>
          <button (click)="onUpdate(ec)" mat-raised-button color="warning"><i class="material-icons">edit</i></button>
          <button (click)="onDelete(ec)" mat-raised-button color="error"><i class="material-icons">delete</i></button>
        </div>
        </td> 
        </tr>
      </tbody>
    </table>
  <div>
  <button (click)="openDialog(null)" mat-raised-button color="primary">Add Contact</button>
  </div>
   
  `,
  styles: [
    '.example-button-row { display: flex; }'
   ]
})
 
export class EventContactListComponent implements OnInit {

  eventContacts: EventContact[];
  isSaving: boolean;
  constructor(private s: ContactService, public dialog: MatDialog) { }

  @Input()
  eventId: number
  


  ngOnInit(): void {
  
    this.s.tree$.subscribe((m: Map<string, EventContact>) => {
     
      //this.isLoading = true;
      const eventContacts: EventContact[] = Array.from(m.values());
      this.eventContacts = eventContacts
      //this.isLoading = false;
      

    });

    this.s.subscribeLoading().subscribe(loading => {
     // console.log('setting')
     // console.log(loading)
      this.isSaving = loading;
      //console.log(this.isSaving)
    })

    //this.isLoading = true;
    this.s.load(this.eventId)
    //this.isLoading = false;
  }

  openDialog(contactId: number): void {
    const dialogRef = this.dialog.open(EventContactCreateComponent, {
      width: '650px',
      data: {eventId: this.eventId, contactId: contactId},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  onDelete(eventContact: EventContact)
  {
      this.s.onDelete(eventContact);

  }

  onUpdate(eventContact: EventContact): void {
    const dialogRef = this.dialog.open(EventContactCreateComponent, {
      width: '650px',
      data: {eventContact: eventContact},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  public getType(ec: EventContact): string {

    if (!ec.decorators) {
        return null
    }
    const found = ec.decorators.find(x => {
        return x.type === "contact-type"
    })

    return found.decorator.decoratorString
  }

  public isPrimary(ec: EventContact): boolean {

    if (!ec.decorators)
        return false;

    return ec.decorators.some(x => {
        return x.type === "primary-contact-indicator"
    })

  }

  makePrimary(eventContct: any)
  {
    //this.isLoading = true;
    console.log(eventContct)
    this.s.makeEventContactPrimary(eventContct)
    //this.isLoading = false;

  }
}
