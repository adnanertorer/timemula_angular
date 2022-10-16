import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainReportComponent } from './main-report.component';
import { MainReportRouterModule } from './main-report-router.module';

@NgModule({
  imports: [
    CommonModule,
    MainReportRouterModule
  ],
  declarations: [MainReportComponent]
})
export class MainReportModule { }
