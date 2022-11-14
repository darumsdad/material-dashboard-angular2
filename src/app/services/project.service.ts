import { Injectable, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GigType } from '../models/gig-type';
import { environment } from 'environments/environment';
import { ProjectType } from 'app/models/project-type';
import { KeyObsValueReset, ObsValueReset, OStore } from '@fireflysemantics/slice';
import { ProjectTypeService } from './project-type.service';

export interface Project {
  id: number
  projectType: ProjectType
  description: string
}

interface ProjectStore extends KeyObsValueReset {
  project: ObsValueReset;
}

@Injectable({
  providedIn: 'root'
})

export class ProjectService    {
  
  description: string;
  baseUrl = environment.baseUrl + '/projects';

  public projectTypes: ProjectType[];

  OS: OStore<ProjectStore> = new OStore({

    project: {
      value: {
        projectType: {
          name: ''
        },
        description: null
      },
      reset: {
        projectType: {
          name: ''
        },
        description: null
      }
    },
  
  });

  constructor(private http: HttpClient, private projectTypeService: ProjectTypeService) {
  }

  loadTypes(): Observable<ProjectType[]> {
    return this.projectTypeService.getAll();   
  }

  saveProject() : Observable<Project> {
    console.log('saving')

    let project = this.OS.snapshot(this.OS.S.project)
    console.log(project);
    return this.http.post<Project>(this.baseUrl, {
      id: null,
      description: project.description,
      typeId: project.projectType.id
    })
  }

  reset()
  {
    this.OS.reset();
  }

  setProjectType(t: ProjectType) {
    console.log('PUTTING')
    let _project = this.OS.snapshot(this.OS.S.project);
    _project.projectType = t;
    this.OS.put(this.OS.S.project, _project);
  }

  setDescription(description: string) {
    let _project = this.OS.snapshot(this.OS.S.project);
    _project.description = description;
    this.OS.put(this.OS.S.project, _project);
  }

  load(projectId: number): Observable<Project> {

    this.http.get<Project>(`${this.baseUrl}/${projectId}`).subscribe(_project => {
      console.log('put' );
      console.log(_project)
      this.OS.put(this.OS.S.project, _project);
    })
    return this.OS.S.project.obs;
  }

}
