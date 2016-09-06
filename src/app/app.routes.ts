import {Routes, RouterModule} from '@angular/router';

import {About} from './about';
import {Home} from './home';
import {Dashboard} from './dashboard';
import {NoContent} from './no-content';

import {DataResolver} from './app.resolver';


export const ROUTES: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    {path: 'about', component: About},
    {path: 'dashboard', component: Dashboard},
    {path: 'detail', loadChildren: () => System.import('./+detail')},
    {path: '**', component: NoContent},
];
