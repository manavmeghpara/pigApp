import { Component, Input, OnInit } from '@angular/core';
import { PigReport, Status } from '../pig';
import { ReportService } from '../report.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  repList: PigReport[];

  constructor(public rs: ReportService, private router: Router, private http:HttpClient) {
    this.repList = []
  }

  toForm(){
    this.router.navigateByUrl('/form')

  }
  ngOnInit(): void {
    this.repList = this.rs.get()
  }

  changeStatus(pigRep: PigReport){
    document.getElementById('conChange')!.addEventListener('click', ()=>{
      var password = (document.getElementById('cpassword')! as HTMLInputElement).value
      if (Md5.hashStr(password) === "84892b91ef3bf9d216bbc6e88d74a77c"){
        document.getElementById('chStatus')!.style.display = "block";
        document.getElementById('confirmStatus')!.addEventListener('click', ()=>{
      
          this.rs.pigReport = this.rs.pigReport.filter(p=>(p.addedOn!==pigRep.addedOn))
          if((document.getElementById('ready')! as HTMLInputElement).checked)
            pigRep.status = Status.Ready
          else 
            pigRep.status = Status.Retrieved
          this.rs.pigReport.push(pigRep)
          this.http.put<PigReport>('https://272.selfip.net/apps/ei7OgQTW2K/collections/report/documents/reportList/',
          {"key":"reportList", "data":this.rs.pigReport}
          ).subscribe((data:PigReport)=>{
          })
          window.location.reload()
        })
      }
      else 
        document.getElementById('cwrong')!.style.display="block"
    })
  }

  delReport(pigRep: PigReport){

    document.getElementById('confirmDel')!.addEventListener('click', ()=>{
      var password = (document.getElementById('password')! as HTMLInputElement).value
      if (Md5.hashStr(password) === "84892b91ef3bf9d216bbc6e88d74a77c"){
        this.rs.deleteReport(pigRep);
        (document.getElementById('closeModal')! as HTMLButtonElement).click()
        window.location.reload()
      }
      else 
        document.getElementById('wrong')!.style.display="block"
    })
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
