import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'app/services/project.service';

@Component({
  selector: 'app-new-project',
  template: `
  <div class="main-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 col-md-12">
          <app-create-project (saving)="updateSaving($event)" (newProject)="newProject($event)">
          </app-create-project>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class NewProjectComponent implements OnInit {

  constructor( 
    private route: ActivatedRoute,
  private router: Router) { }
  
  isSaving: boolean

  ngOnInit(): void {
  }

  updateSaving(value: boolean)  
  {
    console.log('saving =')
    console.log(value)
    this.isSaving = value;
  }

  newProject(value: Project)  
  {

    if (!value.id)
    return;

    {
      console.log('saveComplete')
      console.log(value)
      if (value.projectType.id === 1)
      {
        this.router.navigate(["wedding-detail", value.id ]);
      }
    }
   
    
  }

}
