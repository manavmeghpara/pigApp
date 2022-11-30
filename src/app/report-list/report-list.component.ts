import { Component, Input, OnInit } from '@angular/core';
import { PigReport } from '../pig';
import { ReportService } from '../report.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  repList: PigReport[];


  constructor(public rs: ReportService, private router: Router) {
    this.repList = []
  }

  toForm(){
    this.router.navigateByUrl('/form')

  }
  ngOnInit(): void {
    this.repList = this.rs.get()
  }

  delReport(pigRep: PigReport){
    this.rs.deleteReport(pigRep)
  }

  showMore(pigRep: PigReport){
    document.getElementById("rname")!.innerHTML=pigRep.repName,
    document.getElementById("rphone")!.innerHTML=pigRep.repPhone.toString()
    document.getElementById("pbreed")!.innerHTML=pigRep.pigInfo.pigBreed
    document.getElementById("pid")!.innerHTML=pigRep.pigInfo.pid
    document.getElementById("lname")!.innerHTML=pigRep.location.lname
    document.getElementById("llong")!.innerHTML=pigRep.location.longitude
    document.getElementById("llat")!.innerHTML=pigRep.location.latitide
    document.getElementById("status")!.innerHTML = pigRep.status
    document.getElementById("time")!.innerHTML= (new Date(pigRep.addedOn)).toString()
    document.getElementById("notes")!.innerHTML=pigRep.extraNotes

  }

}
