import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {

  mainForm : FormGroup;

  constructor() {
    var reporterControls = {
      reporter_name : new FormControl('',[
        Validators.required
      ]),
      reporter_phone : new FormControl('',[
        Validators.required,
        Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')
      ]),
    }
    var pigControls = {
      pig_breed : new FormControl('',[
        Validators.required
      ]),
      pid : new FormControl('',[
        Validators.required
      ])
    }
    var locControls = {
      location_name : new FormControl('',[
        Validators.required
      ]),
      location_longitute : new FormControl('',[
        Validators.required
      ]),
      location_latitute : new FormControl('',[
        Validators.required
      ]),
    }
    this.mainForm = new FormGroup({
      repInfo : new FormGroup(reporterControls),
      pigInfo : new FormGroup(pigControls),
      location : new FormGroup(locControls),
      extra : new FormControl('')
    })

  }
  onSubmit(val: FormGroup): void{
    console.log(val)
  }
  ngOnInit(): void {
  }

}
