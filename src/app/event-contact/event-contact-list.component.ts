import { Component, Input, OnInit } from '@angular/core';
import { EventContact } from 'app/models/event-contact';
import { ContactService } from 'app/services/contact.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventContactCreateComponent } from './event-contact-create/event-contact-create.component';



@Component({
  selector: 'app-event-contact-list',
  templateUrl: './event-contact-list.component.html',
  styles: [
    '.example-button-row { display: flex; }'
   ]
})
 
export class EventContactListComponent implements OnInit {

  eventContacts: EventContact[];
  isSaving: boolean;
  constructor(private s: ContactService, public dialog: MatDialog) { }

  @Input()
  projectId: number
  


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
    this.s.load(this.projectId)
    //this.isLoading = false;
  }

  openDialog(contactId: number): void {
    const dialogRef = this.dialog.open(EventContactCreateComponent, {
      width: '650px',
      data: {eventId: this.projectId, contactId: contactId},
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
