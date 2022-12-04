import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors,FormControl, FormGroup, Validators } from '@angular/forms';
import { Pig, Location, PigReport } from '../pig';
import { ReportService } from '../report.service';
import { LocationService } from '../location.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})

export class ReportFormComponent implements OnInit {
  locList : Location[];
  mainForm : FormGroup
  showLoc: boolean
  addLoc : boolean
  constructor(private http:HttpClient, public rs: ReportService, private router: Router, public ls: LocationService) {
    this.locList = []
    this.showLoc = false
    this.addLoc = false
    var reporterControls = {
      reporter_name : new FormControl('',[
        Validators.required
      ]),
      reporter_phone : new FormControl('',[
        Validators.required,
        Validators.pattern('[- +()0-9]{10,12}')
      ]),
    }
    var pigControls = {
      pig_breed : new FormControl('',[
        Validators.required
      ]),
      pid : new FormControl('',[
        Validators.required,
        Validators.pattern('[- +()0-9]{3}')

      ])
    }
    var chLocation = {
      chooseLoc : new FormControl('')
    }
    var locControls = {
      location_name : new FormControl(''),
      location_longitude : new FormControl(''),
      location_latitude : new FormControl(''),
    }
    this.mainForm = new FormGroup({
      repInfo : new FormGroup(reporterControls),
      pigInfo : new FormGroup(pigControls),
      location : new FormGroup(locControls),
      chLoc : new FormGroup(chLocation),
      extra : new FormControl('')
    }, { validators: [this.locationValidator]})

  }

  locationValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const choose = control.get("chLoc.chooseLoc")?.value
    const name = control.get("location.location_name")?.value
    const long = control.get("location.location_longitude")?.value
    const lat = control.get("location.location_latitude")?.value

    if( choose != "" || (name!= "" && long!= "" && lat!=""))
      return null
    else 
      return  { form_error: true}


  }


  onSubmit(val: FormGroup): void{
    // this.mainForm.markAllAsTouched();

    if(this.showLoc){
      var location = (this.locList[this.locList.findIndex(x=>x.lname ===  (document.getElementById('locat')! as HTMLSelectElement).value)])
      this.ls.addLoc(location)
    }
    else{
      var location = new Location(this.mainForm.get('location.location_name')?.value, parseFloat(this.mainForm.get('location.location_longitude')?.value), parseFloat(this.mainForm.get('location.location_latitude')?.value) )
      this.ls.addLoc(location)
    }
    var pigInfo = new Pig(this.mainForm.get('pigInfo.pig_breed')?.value, this.mainForm.get('pigInfo.pid')?.value)
    var pReport = new PigReport(this.mainForm.get('repInfo.reporter_name')?.value, this.mainForm.get('repInfo.reporter_phone')?.value, pigInfo, location,this.mainForm.get('extra')?.value)
    this.rs.addReport(pReport).subscribe((data:PigReport)=>{
      
    })
    this.router.navigateByUrl('/')
  }


  ngOnInit(): void {
    this.ls.get().subscribe((data:any)=>{
      if(data.data !=""){
        this.locList = data.data
        this.locList = this.locList.filter((value, index, self) =>
          index === self.findIndex((t) => (
            t.lname === value.lname
          ))
        )
      }
    });
    (document.getElementById('add')! as HTMLInputElement).onclick =  ()=>{
      this.addLoc = true;
      this.showLoc = false;
    };
    (document.getElementById('existing') as HTMLInputElement).onclick =  ()=>{
      this.showLoc = true;
      this.addLoc = false;
    };
  }

}
