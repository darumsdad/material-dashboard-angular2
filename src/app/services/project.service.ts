import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GigType } from '../models/gig-type';
import { environment } from 'environments/environment';
import { ProjectType } from 'app/models/project-type';
import { KeyObsValueReset, ObsValueReset, OStore } from '@fireflysemantics/slice';

export interface Project {
  projectType: ProjectType
  description: string
}

interface ProjectStore extends KeyObsValueReset {
  project: ObsValueReset;
  saving: ObsValueReset;


}

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  
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
      }
    },
    saving: {
      value: false
    }


  });

  constructor(private http: HttpClient) {
    this.projectTypes = [{
      id: 1,
      name: 'Wedding',
      icon: 'person'
    },
    {
      id: 2,
      name: 'Other',
      icon: 'person'
    }]

    this.OS.S.project.obs.subscribe(x => {
      console.log(x)
    })

  }

  saveProject() {
    console.log('saving')
    this.OS.put(this.OS.S.saving, true);
    let project = this.OS.snapshot(this.OS.S.project)
    console.log(project);
    this.http.post(this.baseUrl, {
      id: null,
      description: project.description,
      typeId: project.projectType.id
    }).subscribe( savedProject => {
      this.OS.put(this.OS.S.project, savedProject);
      console.log('done saving')
      this.OS.put(this.OS.S.saving, false);
    })
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

  listenForSaving(): Observable<boolean> {
    return this.OS.S.saving.obs;
  }


}
