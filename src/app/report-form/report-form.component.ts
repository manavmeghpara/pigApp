import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(private http:HttpClient, public rs: ReportService, private router: Router, public ls: LocationService) {
    this.locList = []
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
      location_name : new FormControl(''),
      location_longitude : new FormControl(''),
      location_latitude : new FormControl(''),
    }
    this.mainForm = new FormGroup({
      repInfo : new FormGroup(reporterControls),
      pigInfo : new FormGroup(pigControls),
      location : new FormGroup(locControls),
      extra : new FormControl('')
    })

  }
  onSubmit(val: FormGroup): void{
    if((document.getElementById('locat')! as HTMLSelectElement).selectedIndex != 0){
      var location = (this.locList[this.locList.findIndex(x=>x.lname ===  (document.getElementById('locat')! as HTMLSelectElement).value)])
    }
    else{
      var location = new Location(this.mainForm.get('location.location_name')?.value, parseInt(this.mainForm.get('location.location_longitude')?.value), parseInt(this.mainForm.get('location.location_latitude')?.value) )
      this.ls.addLoc(location)
    }
    var pigInfo = new Pig(this.mainForm.get('pigInfo.pig_breed')?.value, this.mainForm.get('pigInfo.pid')?.value)
    var pReport = new PigReport(this.mainForm.get('repInfo.reporter_name')?.value, this.mainForm.get('repInfo.reporter_phone')?.value, pigInfo, location,this.mainForm.get('extra')?.value)
    this.rs.pigReport.push(pReport)
    this.http.put<PigReport>('https://272.selfip.net/apps/ei7OgQTW2K/collections/report/documents/reportList/',
    {"key":"reportList", "data":this.rs.pigReport}
    ).subscribe((data:PigReport)=>{
    })

    this.router.navigateByUrl('/')
  }
  ngOnInit(): void {
    this.locList = this.ls.get();
    (document.getElementById('locat')! as HTMLSelectElement).addEventListener('change', ()=>{
      (document.getElementById('loc-name')! as HTMLInputElement).disabled = true;
      (document.getElementById('loc-long')! as HTMLInputElement).disabled = true;
      (document.getElementById('loc-lat')! as HTMLInputElement).disabled = true

    });

    (document.getElementById('loc-name')! as HTMLSelectElement).addEventListener('change', ()=>{
      (document.getElementById('locat')! as HTMLInputElement).disabled = true;

    })
  }

}
