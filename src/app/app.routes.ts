import {Routes, RouterModule} from '@angular/router';

import {Admin} from './admin';
import {Home} from './home';
import {Dashboard} from './dashboard';
import {Integrations} from './integrations';
import {NoContent} from './no-content';
import {Templates} from './templates';
import {User} from './user';

import {DataResolver} from './app.resolver';


export const ROUTES: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'admin', component: Admin},
    {path: 'connections', loadChildren: () => System.import('./+connections')},
    {path: 'dashboard', component: Dashboard},
    {path: 'forge', loadChildren: () => System.import('./+forge')},
    {path: 'home', component: Home},
    {path: 'integrations', component: Integrations},
    {path: 'templates', component: Templates},
    {path: 'user', component: User},
    {path: '**', component: NoContent},
];
