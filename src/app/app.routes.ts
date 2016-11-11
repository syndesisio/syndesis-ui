import {Routes, RouterModule} from '@angular/router';

export const ROUTES: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'admin', loadChildren: () => System.import('./+admin')},
    {path: 'connections', loadChildren: () => System.import('./+connections')},
    {path: 'dashboard', loadChildren: () => System.import('./+dashboard')},
    {path: 'testing', loadChildren: () => System.import('./+testing')},
    {path: 'home', loadChildren: () => System.import('./+home')},
    {path: 'integrations', loadChildren: () => System.import('./+integrations')},
    {path: 'templates', loadChildren: () => System.import('./+templates')},
    {path: 'user', loadChildren: () => System.import('./+user')},
    {path: '**', loadChildren: () => System.import('./no-content')},
];
