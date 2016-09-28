import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {Logger} from '../log.service';
import {ForgeIndex} from './forgeIndex.component';
import {ForgeView} from './forge.component';
import {KubernetesView} from './kubernetes.component';

Logger.get('+Forge').debug('`Forge` bundle loaded asynchronously');
// async components must be named routes for WebpackAsyncRoute
export const routes = [
    { path: '', 
      component: ForgeIndex, 
      children: [
        { path: 'commands', component: ForgeView },
        { path: 'kubernetes', component: KubernetesView }
      ]
    },
    { path: '**', redirectTo: 'commands' }
];

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        ForgeIndex,
        ForgeView,
        KubernetesView
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export default class ForgeModule {
    static routes = routes;
}
