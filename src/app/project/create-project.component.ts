import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Project, ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-create-project',
  template: `
 

  <div class="row" *ngIf="isSaving" >
    <mat-spinner style="margin:0 auto;" mode="indeterminate" ></mat-spinner>
    </div>
<mat-stepper [linear]="true" *ngIf="!isSaving" #stepper>
  <mat-step label="Select a Type" [completed]="projectTypeSelected">

    <app-project-type>
    </app-project-type>

    <div>
      <button [disabled]="!projectTypeSelected" class="btn btn-info" mat-button matStepperNext>Next</button>
    </div>  
  </mat-step>
  
  <mat-step label="Description" [completed]="!control.invalid">
   
      <mat-form-field appearance="fill">
        <mat-label>Description</mat-label>
        <input matInput [formControl]="control" placeholder="Ex. Goldstein Wedding" required>
      </mat-form-field>
      <div>
        <button mat-button class="btn btn-info" matStepperPrevious>Back</button>
        <button mat-button [disabled]="control.invalid" class="btn btn-info" matStepperNext>Next</button>
      </div>
    
  </mat-step>
  <mat-step>
    <ng-template matStepLabel>Create</ng-template>
    <p>Create This Project ?</p>
      <div class="row">
        <div class="col-md-12">
          <b>Type</b> {{project.projectType.name}}
        </div>
        <div class="col-md-12">
          <b>Description</b> {{project.description}}
        </div>
      </div>
      <br>
    <div>
      <button mat-button class="btn btn-info" matStepperPrevious>Back</button>
      <button mat-button class="btn btn-info" [class.spinner]="isSaving" (click)="create()">Create</button>
    </div>
  </mat-step>
</mat-stepper>
  `,
  styles: [
  ]
})
export class CreateProjectComponent implements OnInit {

  @Input() projectId: number;
  @Output() saving = new EventEmitter<boolean>();
  @Output() saveComplete = new EventEmitter<boolean>();
  @Output() newProject = new EventEmitter<Project>();


  isAdd: boolean;
  isSaving: boolean;

  constructor(private s: ProjectService) {}
  
  projectTypeSelected: boolean = false;
  project: Project;
  
  control: FormControl;

  ngOnInit(): void {
    this.s.reset() 
    this.isAdd = !this.projectId
    this.control = new FormControl('', Validators.required);
    this.s.OS.S.project.obs.subscribe(x => {
      this.projectTypeSelected = x.projectType.id != null;
      this.project = x
      console.log('project')
      console.log(this.project)
    })

    this.control.valueChanges.pipe().subscribe((c) => {
      this.s.setDescription(c);
    });

    console.log('PROJECT YPE   event')
    console.log(this.projectTypeSelected)
  }

  create()
  {
    this.saving.emit(true);
    this.isSaving = true;
    this.s.saveProject().subscribe(x => {
      this.saveComplete.emit(true);
      this.newProject.emit(x);
      this.isSaving = false;
    })

  }

}
