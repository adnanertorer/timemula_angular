import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainReportComponent } from './main-report.component';
import { MainReportRouterModule } from './main-report-router.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    NgApexchartsModule,
    MainReportRouterModule
  ],
  declarations: [MainReportComponent]
})
export class MainReportModule { }
