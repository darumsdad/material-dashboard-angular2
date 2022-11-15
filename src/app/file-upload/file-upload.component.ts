import { Component, Input, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'app/services/file-upload.service';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileName: FormControl = new FormControl('', Validators.required);

  fileInfos: any[] = []

  constructor(private uploadService: FileUploadService) { }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  @Input()
  projectId: any

  ngOnInit(): void {
    //this.fileInfos = this.uploadService.getFiles();
  }

  upload(): void {
    this.progress = 0;

    this.currentFile = this.fileName.value;

    this.uploadService.upload(this.projectId, this.currentFile).subscribe({
      next: (event: any) => {
        console.log('data')
        console.log(event)
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          console.log('upload status')
        } else if (event instanceof HttpResponse) {

          console.log('upload complete')
          console.log(event.body[0])

          this.fileInfos.push(event.body[0]);
          console.log(this.fileInfos)
          this.currentFile = undefined;
          this.fileName.reset()
        }
      },
      error: (err: any) => {
        console.log(err);
        this.progress = 0;

        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Could not upload the file!';
        }

        this.currentFile = undefined;
      }
    });

    console.log('exiting')
    this.selectedFiles = undefined;
  }

}
