import { Component, Input, OnInit } from '@angular/core';
import { Project, ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-project-view',
  template: `
    
    <div class="tim-typo">
    <h1>
    {{project.projectType.name}}: {{project.description}} </h1>
    </div>
    
  `,
  styles: [
  ]
})
export class ProjectViewComponent implements OnInit {

  project: Project;
  @Input()
  projectId: number;
  constructor(private s: ProjectService) { }

  ngOnInit(): void {
    this.s.load(this.projectId).subscribe(project => {
      this.project = project
    })
  }

}
