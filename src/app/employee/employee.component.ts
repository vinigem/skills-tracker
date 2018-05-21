import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { HttpService } from '../http.service';
import { AlertService } from '../alert/alert.service';

@Component({
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {

  localUrl: any = "http://placehold.it/180";
  associateSkills: Array<any>;
  employeeForm: FormGroup;

   constructor(private fb: FormBuilder, private httpService: HttpService, private alertService: AlertService) { }

  ngOnInit() {
     this.getSkills();
     this.initForm();
  }

  initForm() {
    this.employeeForm = this.fb.group({
      'name': [ null, Validators.required ],
      'associateId': [ null, Validators.required ],
      'email': [ null, [ Validators.required, Validators.email ] ],
      'mobile': [ null, Validators.required ],
      'pic': [ null ],
      'status': [ null, Validators.required ],
      'level': [ null, Validators.required ],
      'remarks': [ null ],
      'strength': [ null, Validators.required ],
      'weakness': [ null, Validators.required ]
    });
  }

  setStatus(statusCode: string) {
    this.employeeForm.patchValue({ status: statusCode });
  }

  setLevel(levelCode: string) {
    this.employeeForm.patchValue({ level: levelCode });
  }

  saveEmployee() {
    let associateSkills = new Array<any>();
    this.associateSkills.forEach((skill: any) => {
      if(skill.value > 0) {
        associateSkills.push({
          associateId: this.employeeForm.value.associateId,
          skillId: skill.skillId,
          value: skill.value
        });
      }
    });

    let employeeModel = this.employeeForm.value;
    employeeModel.associateSkills = associateSkills;

    this.httpService.addAssociate(employeeModel)
      .subscribe((status: string) => {
        if(status == 'Success') {
          this.alertService.addAlert('Employee added successfully..!!', 'success');
          this.reset();
          
        } else if(status == 'Exist') {
          this.alertService.addAlert('Employee already exists..!!', 'error');
        
        } else if(status == 'Error') {
          this.alertService.addAlert('Error while saving', 'error');
        }
    });
  }

  getSkills(): void {
    this.associateSkills = new Array<any>();
    this.httpService.getAllSkills().subscribe((skills: Array<any>) => {
      skills.forEach((skill: any) => {
        this.associateSkills.push({skillId: skill.skillId, skillName: skill.skillName, value: 0});
      });
    });
  }

  previewProfilePic(event: any) {
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.localUrl = event.target.result;
      this.employeeForm.patchValue({ pic: this.localUrl });
    }
    reader.readAsDataURL(event.target.files[0]);
  }


  isFieldValid(field: string) {
    return !this.employeeForm.get(field).valid && this.employeeForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field)
    };
  }

  reset() {
    this.initForm();
    this.localUrl = "http://placehold.it/180";
    this.associateSkills.forEach((skill: any) => {
       skill.value = 0;
    });  
  }

}
