import { Component, Input, OnInit } from '@angular/core';
import { PigReport } from '../pig';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  @Input()
  repList!: PigReport[];


  constructor() {
  }

  ngOnInit(): void {
  }

  showMore(pigRep: PigReport){
    document.getElementById("rname")!.innerHTML=pigRep.repName,
    document.getElementById("rphone")!.innerHTML=pigRep.repPhone.toString()
    document.getElementById("pbreed")!.innerHTML=pigRep.pigInfo.pigBreed
    document.getElementById("pid")!.innerHTML=pigRep.pigInfo.pid
    document.getElementById("lname")!.innerHTML=pigRep.location.lname
    document.getElementById("llong")!.innerHTML=pigRep.location.longitude
    document.getElementById("llat")!.innerHTML=pigRep.location.latitide
    document.getElementById("time")!.innerHTML= (new Date(pigRep.addedOn)).toString()
    document.getElementById("notes")!.innerHTML=pigRep.extraNotes

  }

}
