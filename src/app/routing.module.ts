import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEmployeeComponent } from './employee/add-employee.component';
import { UpdateEmployeeComponent } from './employee/update-employee.component';
import { AddSkillComponent } from './skill/add-skill.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'add-employee', component: AddEmployeeComponent }, 
    { path: 'update-employee', component: UpdateEmployeeComponent },
    { path: 'add-skills', component: AddSkillComponent }  
];


@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    providers: [],
    exports: [ RouterModule ]
})
export class RoutingModule { }
