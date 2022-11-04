import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'app/services/project.service';


@Component({
  selector: 'app-project-type',
  template: `

  
  <ng-template matStepLabel>Choose A Project Type</ng-template>
  <mat-form-field appearance="fill">
    <mat-select  [formControl]="control" required>
    
      <mat-select-trigger>
      
        <table>
        <td><i class="material-icons">{{control.value.icon}}</i></td>
        <td> {{control.value.name}}</td>
        </table>
      </mat-select-trigger>

      <mat-option *ngFor="let projectType of projectTypeValues" [value]="projectType">
        <ng-container [ngTemplateOutlet]="projectTypeTemplate" [ngTemplateOutletContext]="{projectType: projectType}">
        </ng-container>
    
      </mat-option>
    </mat-select>
  </mat-form-field>





<ng-template #projectTypeTemplate let-projectType="projectType">
<table>
  <td><i class="material-icons">{{projectType.icon}}</i></td>
  <td>  {{projectType.name}}</td>
</table>
</ng-template>



`
  ,
  styleUrls: ['./project-type.component.scss']
})
export class ProjectTypeComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private s: ProjectService) {

  }

  control: FormControl;
  projectTypeValues = this.s.projectTypes;


  ngOnInit(): void {
    this.control = new FormControl('', Validators.required);
    this.control.valueChanges.pipe().subscribe((c) => {
      this.s.setProjectType(c);
    });
  }

}
