import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { VenueListComponent } from '../../venue-list/venue-list.component';
import { ContactListComponent } from '../../contact-list/contact-list.component';
import { ContactDetailComponent } from '../../contact-detail/contact-detail.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { VenueDetailComponent } from 'app/venue-detail/venue-detail.component';
import { GigListComponent } from 'app/gig-list/gig-list.component';
import { GigDetailComponent } from 'app/gig-detail/gig-detail.component';
import { NewProjectComponent } from 'app/project/new-project.component';
import { WeddingDetailComponent } from 'app/wedding/wedding-detail/wedding-detail.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'contact-detail/:id', component: ContactDetailComponent },
    { path: 'contact-detail', component: ContactDetailComponent },
    { path: 'venue-detail/:id', component: VenueDetailComponent },
    { path: 'venue-detail', component: VenueDetailComponent },
    { path: 'gig-detail/:id', component: GigDetailComponent },
    { path: 'gig-detail', component: GigDetailComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'contact-list',   component: ContactListComponent },
    { path: 'gig-list',   component: GigListComponent },
    { path: 'new-project',   component: NewProjectComponent },
    { path: 'wedding-detail/:id',   component: WeddingDetailComponent },
    
    { path: 'venue-list',     component: VenueListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
