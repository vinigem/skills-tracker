import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from '../http.service';
import { AlertService } from '../alert/alert.service';

@Component({
  templateUrl: './associate.component.html'
})
export class AssociateComponent implements OnInit, OnDestroy {

  localUrl: any = "http://placehold.it/180";
  associateSkills: Array<any>;
  associateForm: FormGroup;
  edit: boolean;
  viewOnly: boolean;
  sub: any;

  constructor(private fb: FormBuilder, private httpService: HttpService,
    private alertService: AlertService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loadSkills();
    this.initForm();
    this.sub = this.route.params.subscribe(params => {
      let associateId = +params['associateId']; // (+) converts string 'id' to a number
      this.viewOnly = params['action'] != null;
      this.edit = params['associateId'] != null && !this.viewOnly;

      if(associateId != null) {
        this.loadAssociate(associateId);
        this.loadAssociateSkills(associateId);
      }
    });
  }

  initForm() {
    this.associateForm = this.fb.group({
      'id': [ null ],
      'name': [ null, Validators.required ],
      'associateId': [ null, Validators.required ],
      'email': [ null, [ Validators.required, Validators.email ] ],
      'mobile': [ null, Validators.required ],
      'gender': [ null, Validators.required ],
      'pic': [ null ],
      'status': [ null, Validators.required ],
      'level': [ null, Validators.required ],
      'remarks': [ null ],
      'strength': [ null, Validators.required ],
      'weakness': [ null, Validators.required ]
    });
  }

  setStatus(statusCode: string) {
    this.associateForm.patchValue({ status: statusCode });
  }

  setLevel(levelCode: string) {
    this.associateForm.patchValue({ level: levelCode });
  }

  saveAssociate() {
    let associateSkills = new Array<any>();
    this.associateSkills.forEach((skill: any) => {
      if(skill.value > 0 || skill.id != null) {
        associateSkills.push({
          id: skill.id,
          associateId: this.associateForm.value.associateId,
          skillId: skill.skillId,
          value: skill.value
        });
      }
    });

    let associateModel = this.associateForm.value;
    associateModel.associateSkills = associateSkills;

    this.httpService.addAssociate(associateModel)
      .subscribe((status: string) => {
        if(status == 'Success') {
          this.alertService.addAlert('Associate added successfully..!!', 'success');
          this.router.navigate(['dashboard']);
          
        } else if(status == 'Exist') {
          this.alertService.addAlert('Associate already exists..!!', 'error');
        
        } else if(status == 'Error') {
          this.alertService.addAlert('Error while saving', 'error');
        }
    });
  }

  previewProfilePic(event: any) {
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.localUrl = event.target.result;
      this.associateForm.patchValue({ pic: this.localUrl });
    }
    reader.readAsDataURL(event.target.files[0]);
  }


  isFieldValid(field: string) {
    return !this.associateForm.get(field).valid && this.associateForm.get(field).touched;
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

  loadSkills(): void {
    this.associateSkills = new Array<any>();
    this.httpService.getAllSkills().subscribe((skills: Array<any>) => {
      skills.forEach((skill: any) => {
        this.associateSkills.push({id: null, skillId: skill.skillId, skillName: skill.skillName, value: 0});
      });
    });
  }

  loadAssociate(associateId: any) {
    this.httpService.getAssociate(associateId).subscribe((associate: any) => {
      this.associateForm.setValue({
        'id': associate.id,
        'name': associate.name,
        'associateId': associate.associateId,
        'email': associate.email,
        'mobile': associate.mobile,
        'gender': associate.gender,
        'pic': associate.pic,
        'status': associate.status,
        'level': associate.level,
        'remarks': associate.remarks,
        'strength': associate.strength,
        'weakness': associate.weakness
      });

      if(associate.pic != null) {
        this.localUrl = associate.pic;        
      }
    });  
  }

  loadAssociateSkills(associateId) {
    this.httpService.getAssociateSkills(associateId).subscribe((associateSkills: Array<any>) => {
      associateSkills.forEach((skill: any) => {
        this.associateSkills.forEach((associateSkill: any) => {
          if(skill.skillId == associateSkill.skillId) {
            associateSkill.value = skill.value;
            associateSkill.id = skill.id;  
          }  
        });
      });
    });  
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
