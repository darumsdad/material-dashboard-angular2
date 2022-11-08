import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wedding-detail',
  template: `
  <div class="main-content">
    <div class="container-fluid">
      <app-event-contact-list [eventId]=eventId>
      </app-event-contact-list>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class WeddingDetailComponent implements OnInit {
  eventId: number;

  constructor(  
    private route: ActivatedRoute,
    private router: Router,
    )
     { }

  ngOnInit(): void {
   this.eventId = this.route.snapshot.params['id'];
  }

}
