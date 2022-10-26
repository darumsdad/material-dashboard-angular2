import { Component, OnInit } from '@angular/core';
import { VenueService } from '../services/venue.service';
import { Venue } from '../models/venue';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss']
})
export class VenueListComponent implements OnInit {

  venues: Venue[];

  constructor(private venueService: VenueService) { }

  ngOnInit(): void {
    this.retrieve();
  }

  retrieve() {
    this.venueService.getAll()
      .subscribe({
        next: (data) => {
          this.venues = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
