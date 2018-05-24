import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  associates: Array<any>;
  filteredAssociates: Array<any>;
  skillsCount: Array<any>;
  dashboardData = {
    registeredAssociates: '', femaleAssociates: '', maleAssociates: '',
    l1Associates: '', l2Associates: '', l3Associates: '', fresherAssociates: 0,
    ratedAssociates: 0, ratedFemaleAssociates: 0, ratedMaleAssociates: 0 
  };
 

  constructor(private httpService: HttpService, private alertService: AlertService) { }

  ngOnInit() {
    this.loadAssociates();
    this.loadAllSkillCount();
  }

  deleteAssociate(associateId: any) {
    this.httpService.deleteAssociate(associateId).subscribe((status: string) => {
      if(status == 'Success') {
        this.alertService.addAlert('Associate deleted successfully..!!', 'success');
        this.loadAssociates();
      } else {
        this.alertService.addAlert('Error deleting associate..!!', 'error');  
      }
    })
  }

  filter(name: string, id: string, email: string, mobile: string, strength: string) {
    this.filteredAssociates = new Array<any>();
    
    if(name.trim().length == 0 && id.trim().length == 0 && email.trim().length == 0
      && mobile.trim().length == 0  && strength.trim().length == 0) {
      this.associates.forEach(associate => {
        this.filteredAssociates.push(associate);  
      });
    
    } else {
      this.filteredAssociates = this.associates.filter(associate => {
        return associate.name.toLowerCase().indexOf(name.trim().toLowerCase()) !== -1
          && associate.associateId.toString().toLowerCase().indexOf(id.trim().toLowerCase()) !== -1
          && associate.email.toLowerCase().indexOf(email.trim().toLowerCase()) !== -1
          && associate.mobile.toString().toLowerCase().indexOf(mobile.trim().toLowerCase()) !== -1
          && associate.strength.toLowerCase().indexOf(strength.trim().toLowerCase()) !== -1;
      });
    }
  }

  loadAssociates() {
    this.associates = new Array<any>();
    this.httpService.getAllAssociates().subscribe((associates: Array<any>) => {
      this.associates  = associates;
      this.filteredAssociates = associates;
      this.prepareDashboard();
    });
  }

  loadAllSkillCount() {
    this.skillsCount = new Array<any>();
    let total = 0;
    this.httpService.getAllSkillsCount().subscribe((skillsCount: any) => {
      
      for(let key in skillsCount) {
        this.skillsCount.push({ 'name': key, 'count': skillsCount[key] });
        total += skillsCount[key];
      }

      this.skillsCount.sort((a, b) => b.count - a.count); // sort in descending order
      
      // to show only 10 skill blocks, 10th will be combiation of rest of skills count
      if(this.skillsCount.length > 10) {
        let otherSkillsCount = 0;
        
        this.skillsCount.slice(9).forEach(skillCount => {
          otherSkillsCount += skillCount.count;
        });

        this.skillsCount = this.skillsCount.slice(0, 9);
        this.skillsCount.push({ 'name': 'Others', 'count': otherSkillsCount });
      }
      
      this.skillsCount.forEach(skillCount => {
        skillCount.count = (skillCount.count / total) * 100;  
      })
    
    });  
  }

  prepareDashboard() {
    let totalAssociates: any = this.associates.length;
    let maleAssociates: number = 0;
    let femaleAssociates: number = 0;
    let l1Associates: number = 0;
    let l2Associates: number = 0;
    let l3Associates: number = 0;
    let ratedAssociates = 0;
    
    this.associates.forEach(associate => {
      if(associate.gender == 'M') {
        maleAssociates++;
      } else {
        femaleAssociates++;
      }

      if(associate.level == 'L1') {
        l1Associates++;
      } else if(associate.level == 'L2') {
        l2Associates++;
      } else if(associate.level == 'L3') {
        l3Associates++;
      }

      

    });

    this.dashboardData.registeredAssociates = totalAssociates;
    this.dashboardData.fresherAssociates = l1Associates;
    this.dashboardData.femaleAssociates = ((femaleAssociates / totalAssociates) * 100).toFixed(2);
    this.dashboardData.maleAssociates = ((maleAssociates / totalAssociates) * 100).toFixed(2);
    this.dashboardData.l1Associates = ((l1Associates / totalAssociates) * 100).toFixed(2);
    this.dashboardData.l2Associates = ((l2Associates / totalAssociates) * 100).toFixed(2);
    this.dashboardData.l3Associates = ((l3Associates / totalAssociates) * 100).toFixed(2);
  }

  getRandomColor() {
    const h = this.randomInt(0, 360);
    const s = this.randomInt(42, 98);
    const l = this.randomInt(40, 90);
    return `hsl(${h},${s}%,${l}%)`;
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
