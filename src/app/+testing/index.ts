import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../common/directives';

import { Logger } from '../common/service/log';
import { ForgeIndex } from './forgeIndex.component';
import { ForgeCommands } from './forgeCommands.component';
import { ForgeCommand } from './forgeCommand.component';
import { KubernetesView } from './kubernetes.component';
import { Teams } from './teams.component';
import { Team } from './team.component';
import { Project } from './project.component';
import { Repository } from './repository.component';
import { Branch } from './branch.component';

Logger.get('+Forge').debug('`Forge` bundle loaded asynchronously');
// async components must be named routes for WebpackAsyncRoute
export const routes = [
    {
        path: '',
        component: ForgeIndex,
        children: [
            { path: 'teams', component: Teams },
            { path: 'teams/:teamId', component: Team },
            { path: 'teams/:teamId/:projectId', 
              component: Project, 
              children: [
                { path: 'commands', component: ForgeCommands },
                { path: 'commands/:commandId', component: ForgeCommand },
                { path: 'repository', component: Repository },
                { path: 'repository/:branchId',
                  children: [
                    { path: '**', component: Branch }
                  ]
                },
                { path: '**', redirectTo: 'repository'},
              ]
            },
            { path: 'teamCommands', component: Teams },
            { path: 'teamCommands/:teamId', component: ForgeCommands },
            { path: 'teamCommands/:teamId/:commandId', component: ForgeCommand },
            { path: 'commands', component: ForgeCommands },
            { path: 'commands/:commandId', component: ForgeCommand },
            { path: 'kubernetes', component: KubernetesView }
        ]
    },
    { path: '**', redirectTo: 'teams'}
];

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        ForgeIndex,
        Team,
        Teams,
        Project,
        Repository,
        Branch,
        ForgeCommands,
        ForgeCommand,
        KubernetesView
    ],
    imports: [
        CommonModule,
        FormsModule,
				ReactiveFormsModule,
        DirectivesModule,
        RouterModule.forChild(routes),
    ]
})
export default class ForgeModule {
    static routes = routes;
}
