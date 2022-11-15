import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ContactDetailComponent } from '../../contact-detail/contact-detail.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { ContactListComponent } from '../../contact-list/contact-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { VenueListComponent } from '../../venue-list/venue-list.component';
import { VenueDetailComponent } from '../../venue-detail/venue-detail.component';
import { GigListComponent } from '../../gig-list/gig-list.component';

import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
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
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { CreateProjectComponent } from '../../project/create-project.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { ProjectTypeComponent } from 'app/project/project-type/project-type.component';
import { ProjectViewComponent } from '../../project/project-view.component';
import { NewProjectComponent } from '../../project/new-project.component';
import { WeddingDetailComponent } from '../../wedding/wedding-detail/wedding-detail.component';
import { EventContactListComponent } from '../../event-contact/event-contact-list.component';
import { EventContactListItemComponent } from '../../event-contact/event-contact-list-item.component';
import { EventContactCreateComponent } from '../../event-contact/event-contact-create/event-contact-create.component';
import { VenueSelectComponent } from '../../venue/venue-select/venue-select.component';
import { EventDetailsComponent } from '../../event/event-details/event-details.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { StatusAndTasksDetailsComponent } from '../../project/status-and-tasks-details/status-and-tasks-details.component';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';




 
@NgModule({
  imports: [
    NgxMaterialTimepickerModule,
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
    MatCheckboxModule

    
    
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
    UserProfileComponent,
    ContactDetailComponent,
    ContactListComponent,
    TableListComponent,
    VenueListComponent,
    VenueDetailComponent,
    GigListComponent,
    
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    VenueAddComponent,
    AutocompleteComponent,
    
    CreateProjectComponent,
    ProjectTypeComponent,
    ProjectViewComponent,
    NewProjectComponent,
    WeddingDetailComponent,
    EventContactListComponent,
    EventContactListItemComponent,
    EventContactCreateComponent,
    VenueSelectComponent,
    EventDetailsComponent,
    StatusAndTasksDetailsComponent,
    FileUploadComponent

  ]
})

export class AdminLayoutModule {}
