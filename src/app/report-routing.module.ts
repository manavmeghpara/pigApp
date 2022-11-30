import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportFormComponent } from './report-form/report-form.component';


const  appRoutes:Routes = [
  { path: '', component: ReportListComponent },
  { path: 'form', component: ReportFormComponent },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class ReportRoutingModule { }
