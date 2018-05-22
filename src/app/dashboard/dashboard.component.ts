import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  associates: Array<any>;

  constructor(private httpService: HttpService, private alertService: AlertService) { }

  ngOnInit() {
    this.getAssociates();
  }

  getAssociates() {
    this.associates = new Array<any>();
    this.httpService.getAllAssociates().subscribe((associates: Array<any>) => {
      this.associates  = associates;
    });
  }

}
