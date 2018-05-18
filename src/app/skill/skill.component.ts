import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service';
import { AlertService } from '../alert/alert.service';

@Component({
  templateUrl: './skill.component.html'
})
export class SkillComponent implements OnInit {

  skills: Array<any>;
  filteredSkills: Array<any>;
  skill: any = {skillName: null};
  invalid: boolean;
    
  constructor(private httpService: HttpService, private alertService: AlertService) { }

  ngOnInit() {
    this.getSkills();
  }

  add(): void {
    if(this.skill.skillName && this.skill.skillName.length > 0) {
      this.httpService.addSkill(this.skill).subscribe((status: string) => {
        if(status == 'Success') {
          this.alertService.addAlert('Skill added successfully..!!', 'success');
          this.getSkills();
          this.skill.skillName = null;
        } else if(status == 'Exist') {
          this.alertService.addAlert('Skill already exists..!!', 'error');
        }
      });
    } else {
      this.invalid = true;
    }
  }

  update(skill: any): void {
    if(skill.skillName && skill.skillName.length > 0) {
      this.httpService.updateSkill(skill).subscribe((status: string) => {
        if(status == 'Success') {
          this.alertService.addAlert('Skill updated successfully..!!', 'success');
          this.getSkills();
        } else if(status == 'Exist') {
          this.alertService.addAlert('Skill already exists..!!', 'error');
        }
      });
    } else {
      this.invalid = true;
    }
  }

  delete(skillId: number): void {
    this.httpService.deleteSkill(skillId).subscribe((status: string) => {
      if(status == 'Success') {
        this.alertService.addAlert('Skill deleted successfully..!!', 'success');
        this.getSkills();
      } else {
        this.alertService.addAlert('Error deleting Skill..!!', 'error');  
      }
    });
  }

  getSkills(): void {
    this.skills = new Array<any>();
    this.httpService.getAllSkills().subscribe((skills: Array<any>) => {
      this.skills = skills;
      this.filteredSkills = skills;
    });
  }

  filterSkills(search: string) : void {
    this.filteredSkills = new Array<any>();
    this.filteredSkills = this.skills.filter(skill => {
      return skill.skillName.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }

}
