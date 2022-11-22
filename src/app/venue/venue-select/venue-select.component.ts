import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Venue } from 'app/models/venue';
import { VenueService } from 'app/services/venue.service';
import { VenueAddComponent } from 'app/venue-add/venue-add.component';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-venue-select',
  templateUrl: './venue-select.component.html',
  styles: [' .mat-option { height: 100px; line-height: 20px; }'
  ]
})
export class VenueSelectComponent implements OnInit {
  
  form: FormGroup;

  constructor(public venueService: VenueService, 
    public dialog: MatDialog,
    public rootFormGroup: FormGroupDirective) { }

  venues: Venue[] = [];
  filteredVenues: Observable<Venue[]>;
  
  
  // ngOnChanges () {
  //   console.log('venue change detected')
  //   console.log(this.venueId)
  //   // Check if the data exists before using it
  //   if (this.venueId) {
  //     this.venueFormControl.patchValue(this.venueId);
  //   }
  // }

  //@Output() onVenueSelected = new EventEmitter<string>();

  ngOnInit(): void {
    console.log('starting  detected')
    this.form = this.rootFormGroup.control;
    console.log(this.rootFormGroup.control)
    this.venueService.getAll().subscribe(x => { 
      console.log(x)
      this.venues = x;
      this.filteredVenues = this.form.get('venueId').valueChanges.pipe(
        startWith(''),
        map(venue => venue ? this._filterVenue(venue || '') : this.venues.slice()),
      );
      console.log(this.form)

      // hack to get it to repaint after we have the list of venues
      this.form.get('venueId').patchValue(this.form.get('venueId').value)
      
    })
  }

 

  openDialog(): void {
    const dialogRef = this.dialog.open(VenueAddComponent, {
      width: '650px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result)
        return;

      console.log(result);
      this.venues.push(result)
      this.form.get('venueId').patchValue(result.id)
     
    });
  }

   

  displayVenue(venue: Venue): string {

    console.log('Venue: displayVenue' + venue);

    if (!this.venues) {
      console.log('no venues')
      return ''
    }
    else if (typeof venue === 'number' || venue instanceof Number) {
      console.log('number')
      console.log(this.venues)
      return this.venues.filter(v => v.id === venue).length === 1 ? this.venues.find(v => v.id === venue).name : '';
    }

    return ''

  }

  
  private _filterVenue(value: any): Venue[] {
    console.log('_filterVenue ' + value)

    if ((typeof value === 'string' || value instanceof String) && value != "") {
      const filterValue = value.toLowerCase()
      
      return this.venues.filter(venue => venue.name.toLowerCase().includes(filterValue) || venue.id.toString() === value);
    }
    
    else if (typeof value === 'number') {
      return this.venues.filter(venue => venue.id === value);
    }
    else
   {
    console.log(this.venues.slice())

      return this.venues.slice();
      
    }

  }


}
