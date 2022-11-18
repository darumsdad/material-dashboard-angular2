import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProjectType } from 'app/models/project-type';

@Component({
  selector: 'app-event-type',
  templateUrl: './event-type.component.html',
  styleUrls: ['./event-type.component.scss']
})
export class EventTypeComponent implements OnInit {

  constructor() { }

  @Input()
  control: FormControl;

  projectTypeValues: ProjectType[] = [
    {
      id: 1,
      name: 'Wedding',
      icon: 'person'
    },
    {
      id: 2,
      name: 'Mitzvah',
      icon: 'person'
    },
    {
      id: 3,
      name: 'Other',
      icon: 'person'
    }
  ]

  ngOnInit(): void {
  }

}
