import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wedding-detail',
  template: `
  <div class="main-content">
    <div class="container-fluid">
      <app-event-contact-list [projectId]=projectId>
      </app-event-contact-list>
      <app-event-details [projectId]=projectId>
      </app-event-details>
      
    </div>
  </div>
  `,
  styles: [
  ]
})
export class WeddingDetailComponent implements OnInit {
  projectId: number;

  constructor(  
    private route: ActivatedRoute,
    private router: Router,
    )
     { }

  ngOnInit(): void {
   this.projectId = this.route.snapshot.params['id'];
  }

}
