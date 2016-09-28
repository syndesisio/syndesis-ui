import {Routes, RouterModule} from '@angular/router';

import {Admin} from './admin';
import {Home} from './home';
import {Dashboard} from './dashboard';
import {NoContent} from './no-content';

import {DataResolver} from './app.resolver';


export const ROUTES: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path: 'admin', component: Admin},
    {path: 'dashboard', component: Dashboard},
    {path: 'connections', loadChildren: () => System.import('./+connections')},
    {path: 'forge', loadChildren: () => System.import('./+forge')},
    {path: '**', component: NoContent},
];
