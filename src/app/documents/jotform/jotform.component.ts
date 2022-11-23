import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EventMainService } from 'app/services/event-main.service';

@Component({
  selector: 'app-jotform',
  templateUrl: './jotform.component.html',
  styleUrls: ['./jotform.component.scss']
})
export class JotformComponent implements OnInit {

  constructor(public s: EventMainService, private _snackBar: MatSnackBar) { }

  displayedColumns: string[] = ['name', 'id', 'applied','actions'];
  dataSource = new MatTableDataSource<any>();

  @Input()
  eventId: any

  ngOnInit(): void {

    this.reload();

  }

  private reload() {
    this.s.get(this.eventId).subscribe({
      next: (e) => {
        console.log(e.data.submissions);
        this.dataSource.data = e.data.submissions;
      },
      error: (e) => { }
    });
  }

  applySubmission(id: any)
  {
      this.s.submission(this.eventId,id).subscribe(
        {
          next: (e) => {
            this.reload();
            this._snackBar.openFromComponent(SubmissionStatusComponent, {
              duration: 3000,
              data: {
                status : 'OK'
              }
              
            });
          },
          error: (e) => {
            console.log(e);
            this.reload();
            this._snackBar.openFromComponent(SubmissionStatusComponent, {
              duration: 3000,
              data: {
                
                status : e.error
              }
              
            });
          }
        }
      )
  }

}

@Component({
  selector: 'submission-status',
  templateUrl: 'submission-status.html',
  styles: [],
})
export class SubmissionStatusComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public status: any) {}
}
