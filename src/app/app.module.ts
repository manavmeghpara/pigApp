import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { ReportListComponent } from './report-list/report-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportFormComponent,
    ReportListComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
