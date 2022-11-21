import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';

import { TableListComponent } from '../../table-list/table-list.component';


import { TypographyComponent } from '../../typography/typography.component';

import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';

import { VenueDetailComponent } from 'app/venue-detail/venue-detail.component';



import { WeddingDetailComponent } from 'app/wedding/wedding-detail/wedding-detail.component';
import { EventMainComponent } from 'app/event/event-main/event-main.component';
import { EventListComponent } from 'app/event/event-list/event-list.component';

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
    
    
    
    { path: 'venue-detail/:id', component: VenueDetailComponent },
    { path: 'detail/:id', component: EventMainComponent },
    { path: 'detail', component: EventMainComponent },
    { path: 'venue-detail', component: VenueDetailComponent },
    
    { path: 'table-list',     component: TableListComponent },
    
    
    
    { path: 'wedding-detail/:id',   component: WeddingDetailComponent },
    { path: 'event/:id',   component: EventMainComponent },
    { path: 'events',   component: EventListComponent },
    
    
    { path: 'typography',     component: TypographyComponent },
    
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    
];
