import { Component, Input, OnInit } from '@angular/core';
import { EventService } from 'app/services/event.service';
import { Event } from 'app/models/event'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styles: [
  ]
})
export class EventDetailsComponent implements OnInit {

  @Input()
  projectId: number
  event: Event = new Event;

  serializedDate = new FormControl();
  serializedStartTime = new FormControl('');
  serializedEndTime = new FormControl('');
  
  constructor(public s: EventService) { }

  newVenueIdValue(venueId: any)
  {
    console.log('newVenueIdValue')
    console.log(venueId)
    this.s.setVenueId(venueId)
  }

  onDateChange(p: any)
  {
    console.log(p);
    this.s.setDate(p.value)
  }

  onStartTimeChanged(p: any)
  {
    console.log(p);
    this.s.setStartTime(p)
  }

  onEndTimeChanged(p: any)
  {
    console.log(p);
    this.s.setEndTime(p)
  }

  onSave(event: any)
  {
    this.s.save()
  }

  ngOnInit(): void {
    this.event.venueId = null;
    this.s.setProjectId(this.projectId)
    this.s.load((e) => this.onLoaded(e));
  }

  onLoaded(e: Event)
  {
    console.log('onLoaded')
    console.log(e)
    this.event = e;
    if (e.date)
      this.serializedDate.patchValue(new Date(e.date).toISOString())
    this.serializedStartTime.patchValue(e.startTime)
    this.serializedEndTime.patchValue(e.endTime)
  }

}
