import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pig, Location, PigReport } from '../pig';
import { ReportService } from '../report.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})

export class ReportFormComponent implements OnInit {

  mainForm : FormGroup
  constructor(private http:HttpClient, public rs: ReportService, private router: Router) {
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
      location_longitude : new FormControl('',[
        Validators.required
      ]),
      location_latitude : new FormControl('',[
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
    var pigInfo = new Pig(this.mainForm.get('pigInfo.pig_breed')?.value, this.mainForm.get('pigInfo.pid')?.value)
    var location = new Location(this.mainForm.get('location.location_name')?.value, this.mainForm.get('location.location_longitude')?.value, this.mainForm.get('location.location_latitude')?.value )
    var pReport = new PigReport(this.mainForm.get('repInfo.reporter_name')?.value, this.mainForm.get('repInfo.reporter_phone')?.value, pigInfo, location,this.mainForm.get('extra')?.value)
    this.rs.pigReport.push(pReport)
    this.http.put<PigReport>('https://272.selfip.net/apps/ei7OgQTW2K/collections/report/documents/reportList/',
    {"key":"reportList", "data":this.rs.pigReport}
    ).subscribe((data:PigReport)=>{
    })

    this.router.navigateByUrl('/')
  }
  ngOnInit(): void {
  }

}
