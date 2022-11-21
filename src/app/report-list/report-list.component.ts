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
  displayStyle = "none";
  
  openPopup(event:any) {
    console.log(event);
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

}
