import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import * as L from 'leaflet';
import * as $ from "jquery";
import { DataTablesModule } from 'angular-datatables';


import { AppComponent } from './app.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportRoutingModule } from './report-routing.module';
import { DisplayMapComponent } from './display-map/display-map.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportFormComponent,
    ReportListComponent,
    DisplayMapComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    ReportRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
