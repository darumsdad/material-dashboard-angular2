import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';


export interface Task {
  description: string;
  date: string;
  status: number;
  note: string
}

const ELEMENT_DATA: Task[] = [
  {  description: 'Send Contract', date: 'Tue Nov 15 2022 00:00:00 GMT-0500 (Eastern Standard Time)', status: 1, note: '' },
  {   description: 'Helium', date: 'Tue Nov 15 2022 00:00:00 GMT-0500 (Eastern Standard Time)', status: 2 , note: ''},
  {   description: 'Lithium', date: 'Tue Nov 15 2022 00:00:00 GMT-0500 (Eastern Standard Time)', status: 2 , note: ''},
  {   description: 'Beryllium', date: 'Tue Nov 15 2022 00:00:00 GMT-0500 (Eastern Standard Time)', status: 3 , note: ''},
   
];


@Component({
  selector: 'app-status-and-tasks-details',
  templateUrl: './status-and-tasks-details.component.html',
  styleUrls: ['./status-and-tasks-details.component.scss']
})
export class StatusAndTasksDetailsComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private _formBuilder: FormBuilder) { }

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['description', 'date', 'status', 'note','action'];
  VOForm: FormGroup;

  statuses: any[] = [
    {
      id: 1,
      name: 'Hold'
    },
    {
      id: 2,
      name: 'Lead'
    },
    {
      id: 3,
      name: 'Proposal'
    }
  ]

  taskStatuses: any[] = [
    {
      id: 1,
      name: 'Not Started / Not Yet Sent'
    },
    {
      id: 2,
      name: 'In Progress / Awaiting Reply'
    },
    {
      id: 3,
      name: 'Complete / Received'
    }
  ]

  ngOnInit(): void {

    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([])
    });

    this.VOForm = this.fb.group({
      VORows: this.fb.array(ELEMENT_DATA.map(val => this.fb.group({
      
        description: new FormControl(val.description),
        date: new FormControl(new Date(val.date).toISOString()),
        status: new FormControl(val.status),
        note: new FormControl(val.note),
        action: new FormControl('existingRecord'),
        isEditable: new FormControl(true),
        isNewRow: new FormControl(false),
      })
      )) //end of fb array
    }); // end of form group cretation

    this.dataSource = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);

  }

  // this function will enabled the select field for editd
  EditSVO(VOFormElement, i) {

    // VOFormElement.get('VORows').at(i).get('name').disabled(false)
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
    // this.isEditableNew = true;

  }

  // On click of correct button in table (after click on edit) this method will call
  SaveVO(VOFormElement, i) {
    // alert('SaveVO')
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    console.log(VOFormElement.get('VORows').at(i).value)
  }

  // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
  CancelSVO(VOFormElement, i) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
  }

  DeleteSVO(VOFormElement, i) {

    VOFormElement.get('VORows').removeAt(i);
    console.log(VOFormElement.get('VORows'));
    this.dataSource = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);
    

  }

  AddNewRow(text: any) {
    // this.getBasicDetails();
    const control = this.VOForm.get('VORows') as FormArray;
    control.insert(0,this.initiateVOForm(text));
    this.dataSource = new MatTableDataSource(control.controls)
    
  }

  initiateVOForm(text: any): FormGroup {

    var ms = new Date().getTime() + (86400000 * 2);
    var due = new Date(ms);
    return this.fb.group({

                description: new FormControl((text) ? text : ''),
                date: new FormControl((text) ? due.toISOString() : new Date().toISOString()),
                status: new FormControl(1),
                action: new FormControl('newRecord'),
                note: new FormControl(''),
                isEditable: new FormControl((text) ? true: false),
                isNewRow: new FormControl(true),
    });
  }


}
