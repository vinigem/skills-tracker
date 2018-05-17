import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RoutingModule } from './routing.module';

import { CommonInterceptor } from './interceptors/common.interceptor';

import { AppComponent } from './app.component';

import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';

import { OverlayService } from './overlay/overlay.service';
import { OverlayComponent } from './overlay/overlay.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEmployeeComponent } from './employee/add-employee.component';
import { UpdateEmployeeComponent } from './employee/update-employee.component';
import { AddSkillComponent } from './skill/add-skill.component';

@NgModule({
  declarations: [
    AppComponent, AlertComponent, OverlayComponent, DashboardComponent, AddEmployeeComponent,
    UpdateEmployeeComponent, AddSkillComponent
  ],
  imports: [
    BrowserModule, RoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true },
        AlertService, OverlayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
