import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wedding-detail',
  templateUrl: './wedding-detail.component.html',
  template: `
  
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
