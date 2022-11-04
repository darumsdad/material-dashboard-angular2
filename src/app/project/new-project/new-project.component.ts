import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-project',
  template: `
  <div class="main-content">
    <div class="container-fluid">
   
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <app-create-project (saving)="updateSaving($event)">
            </app-create-project>
           
          </div>
        </div>
   
  `,
  styles: [
  ]
})
export class NewProjectComponent implements OnInit {

  constructor() { }
  isSaving: boolean

  ngOnInit(): void {
  }

  updateSaving(value: boolean)  
  {
    console.log('saving =')
    console.log(value)
    this.isSaving = value;
  }

}
