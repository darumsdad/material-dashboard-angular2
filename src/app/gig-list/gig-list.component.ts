import { Component, OnInit } from '@angular/core';
import { GigService } from '../services/gig.service';
import { Gig } from '../models/gig';

@Component({
  selector: 'app-gig-list',
  templateUrl: './gig-list.component.html',
  styleUrls: ['./gig-list.component.scss']
})
export class GigListComponent implements OnInit {

  gigs: Gig[];

  constructor(private gigService: GigService) { }

  ngOnInit(): void {
    //this.retrieve();
  }

  retrieve() {
    this.gigService.getAll()
      .subscribe({
        next: (data) => {
          this.gigs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


}
