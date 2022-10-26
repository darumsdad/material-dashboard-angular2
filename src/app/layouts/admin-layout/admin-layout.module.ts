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
import { GigDetailComponent } from '../../gig-detail/gig-detail.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    Ng2SearchPipeModule,
    MatAutocompleteModule
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
    GigDetailComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
  ]
})

export class AdminLayoutModule {}
