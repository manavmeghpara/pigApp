import { Injectable } from '@angular/core';
import { Pig, Location, PigReport } from './pig';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ReportService{
  pigReport : PigReport[]
  constructor(private http: HttpClient) {
    this.pigReport = []

    this.http.get('https://272.selfip.net/apps/ei7OgQTW2K/collections/report/documents/reportList/')
    .subscribe((data:any)=>{
      if(data.data !=""){
        this.pigReport = data.data

        console.log(data)
      }
    })

  }

  get(){
    return this.pigReport
  }

  addReport(pr: PigReport){
    this.pigReport.push(pr)
    this.http.put<PigReport>('https://272.selfip.net/apps/ei7OgQTW2K/collections/report/documents/reportList/',
    {"key":"reportList", "data":this.pigReport}
    ).subscribe((data:PigReport)=>{
    })
  }
  
  deleteReport(pr: PigReport){
    this.pigReport = this.pigReport.filter(p=>p.addedOn!==pr.addedOn)
    console.log(this.pigReport)
    this.http.put<PigReport>('https://272.selfip.net/apps/ei7OgQTW2K/collections/report/documents/reportList/',
    {"key":"reportList", "data":this.pigReport}
    ).subscribe((data:PigReport)=>{
    })
  }

}
