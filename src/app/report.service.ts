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

  get() : any{
    return this.http.get('https://272.selfip.net/apps/ei7OgQTW2K/collections/report/documents/reportList/')

  }

  addReport(pr: PigReport) : any{
    this.pigReport.push(pr)
    return this.http.put<PigReport>('https://272.selfip.net/apps/ei7OgQTW2K/collections/report/documents/reportList/',
    {"key":"reportList", "data":this.pigReport}
    )
  }
  
  deleteReport(pr: PigReport) : any{
    this.pigReport = this.pigReport.filter(p=>p.addedOn!=pr.addedOn)
    console.log(this.pigReport)
    return this.http.put<PigReport>('https://272.selfip.net/apps/ei7OgQTW2K/collections/report/documents/reportList/',
    {"key":"reportList", "data":this.pigReport}
    )
  }

}
