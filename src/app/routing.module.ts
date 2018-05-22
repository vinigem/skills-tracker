import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AssociateComponent } from './associate/associate.component';
import { SkillComponent } from './skill/skill.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'associate', component: AssociateComponent }, 
    { path: 'associate/:associateId', component: AssociateComponent }, 
    { path: 'associate/:associateId/:action', component: AssociateComponent }, 
    { path: 'skill', component: SkillComponent }  
];


@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    providers: [],
    exports: [ RouterModule ]
})
export class RoutingModule { }
