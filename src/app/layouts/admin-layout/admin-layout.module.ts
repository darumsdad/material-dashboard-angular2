import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';

import { TableListComponent } from '../../table-list/table-list.component';

import { TypographyComponent } from '../../typography/typography.component';

import { VenueDetailComponent } from '../../venue-detail/venue-detail.component';



import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';

import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule, MAT_DATE_FORMATS} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { VenueAddComponent } from '../../venue-add/venue-add.component';
import { AutocompleteComponent  } from '../../google-places-autocomplete/google-places-autocomplete.component';

import { EditorModule } from '@tinymce/tinymce-angular';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { WeddingDetailComponent } from '../../wedding/wedding-detail/wedding-detail.component';



import { VenueSelectComponent } from '../../venue/venue-select/venue-select.component';
import { EventDetailsComponent } from '../../event/event-details/event-details.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { StatusAndTasksDetailsComponent } from '../../project/status-and-tasks-details/status-and-tasks-details.component';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { EventMainComponent } from '../../event/event-main/event-main.component';

import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { EventStatusComponent } from '../../event/event-status/event-status.component';



 
@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    MatCardModule,
    NgxMaterialTimepickerModule,
    MatDividerModule,
    NgxIntlTelInputModule,
    NgxMatFileInputModule,
    MatTabsModule,
    MatTableModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    Ng2SearchPipeModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatIconModule,
    EditorModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    NgxMatMomentModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    FormsModule

    
    
  ],
  providers: [
    {
      provide: NGX_MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['x'],
        },
        display: {
          dateInput: 'LL hh:mm A',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',

        },
      },
    },
  ],
  declarations: [
    DashboardComponent,
    TableListComponent,
    VenueDetailComponent,
    TypographyComponent,
    MapsComponent,
    NotificationsComponent,
    VenueAddComponent,
    AutocompleteComponent,
    WeddingDetailComponent,
    VenueSelectComponent,
    EventDetailsComponent,
    StatusAndTasksDetailsComponent,
    FileUploadComponent,
    EventMainComponent,
    EventStatusComponent,
  ]
})

export class AdminLayoutModule {}
