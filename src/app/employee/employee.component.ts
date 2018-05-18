import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {

  localUrl: any = "http://placehold.it/180";

  constructor() { }

  ngOnInit() {
  }

  previewProfilePic(event: any) {
    let reader = new FileReader();
    reader.onload = (event: any) => {
    this.localUrl = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

}
