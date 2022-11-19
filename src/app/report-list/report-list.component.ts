import { Component, Input, OnInit } from '@angular/core';
import { PigReport } from '../pig';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  @Input()
  pigRep!: PigReport;
  constructor() { }

  ngOnInit(): void {
  }

}
