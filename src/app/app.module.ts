import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];


import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CoreModule } from './shared/core.module';
import { AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
import { ModalModule } from './_content/modal/modal.module';

import { AppRoutingModule } from './app.routing';
import { MyMaterialModule } from './material.module';
import { ScheduleAllModule } from '@syncfusion/ej2-angular-schedule';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ConfirmationDialogService } from './shared/tools/confirmation-dialog/confirmation-dialog.service';
import { DefaultLayoutComponent } from './containers/default-layout';
import { CustomerService } from './shared/services/customer.service';
import { AgendaService, DayService, MonthAgendaService, MonthService, TimelineMonthService,
  TimelineViewsService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollectionSubComponent } from './views/base/collection-sub/collection-sub.component';
import { PaymentSubComponent } from './views/base/payment-sub/payment-sub.component';
import { EducatorLessonCostModalComponent } from './views/base/educator-lesson-cost-modal/educator-lesson-cost-modal.component';
import { GeneralPaymentSubComponent } from './views/base/general-payment-sub/general-payment-sub.component';
import { CustomerLessonsTempService } from './shared/services/customer-lessons-temp.service';
import { InstallmentCollectionComponent } from './views/base/installment-collection/installment-collection.component';




@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    CollectionSubComponent,
    PaymentSubComponent,
    EducatorLessonCostModalComponent,
    GeneralPaymentSubComponent,
    InstallmentCollectionComponent
    //ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    NgbModalModule,
    FlatpickrModule,
    HttpClientModule,
    ScheduleAllModule,
    RouterModule,
    CoreModule,
    AppRoutingModule,
    MyMaterialModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    ModalModule,
    DatePickerModule,
    IconSetModule.forRoot(),
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [
    IconSetService,
    FlatpickrDefaults,
    ConfirmationDialogService,
    CustomerService,
    CustomerLessonsTempService,
    DayService, WeekService, WorkWeekService, MonthService,
     AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
