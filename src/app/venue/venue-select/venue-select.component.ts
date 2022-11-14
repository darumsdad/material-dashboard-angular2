import { Component, EventEmitter, OnChanges, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
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
export class VenueSelectComponent implements OnInit,OnChanges {

  constructor(public venueService: VenueService, public dialog: MatDialog) { }

  venues: Venue[] = [];
  filteredVenues: Observable<Venue[]>;
  
  venueFormControl: FormControl = new FormControl('');

  @Input('venueId')
  venueId: number;
  
  ngOnChanges () {
    console.log('change detected')
    // Check if the data exists before using it
    if (this.venueId) {
      this.venueFormControl.patchValue(this.venueId);
    }
  }

  @Output() onVenueSelected = new EventEmitter<string>();

  ngOnInit(): void {

    this.venueService.getAll().subscribe(x => { 
      console.log(x)
      this.venues = x;
      this.filteredVenues = this.venueFormControl.valueChanges.pipe(
        startWith(''),
        map(venue => venue ? this._filterVenue(venue || '') : this.venues.slice()),
      );
      if (this.venueId)
      {
        console.log('setting venue')
        this.venueFormControl.patchValue(this.venueId);
      }
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
      this.venueFormControl.patchValue(result.id)
      this.onVenueSelected.emit(result.id);
    });
  }

  onSelectionChange(value: any)
  {
    console.log('onChange')
    console.log(value.option.value)
    this.onVenueSelected.emit(value.option.value);
  }


  displayVenue(venue: Venue): string {

    console.log('Venue: displayVenue' + venue);

    if (!this.venues) {
      return ''
    }
    else if (typeof venue === 'number' || venue instanceof Number) {
      return this.venues.filter(v => v.id === venue).length === 1 ? this.venues.find(v => v.id === venue).name : '';
    }

    return ''

  }

  
  private _filterVenue(value: any): Venue[] {
    console.log('_filterVenue ' + value)

    if (typeof value === 'string' || value instanceof String) {
      const filterValue = value.toLowerCase()
      return this.venues.filter(venue => venue.name.toLowerCase().includes(filterValue) || venue.id.toString() === value);
    }
    else if (typeof value === 'number') {
      return this.venues.filter(venue => venue.id === value);
    }
    else
   {
      return this.venues.slice();
    }

  }


}
