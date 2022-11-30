import { Component, OnInit, Input } from '@angular/core';
import { PigReport } from '../pig';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit {

  @Input()
  moreRep!:PigReport;
  constructor() { }

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
