import { Component, OnInit, ViewChild } from '@angular/core';
import { MyInteger } from 'src/app/shared/model/my-integer';
import { VActualCustomerLessonMainModel } from 'src/app/shared/model/v-actual-customer-lesson-main-model';
import { VActualCustomerLessonModel } from 'src/app/shared/model/v-actual-customer-lesson-model';
import { VCustomer } from 'src/app/shared/model/v-customer';
import { VDeptCollectionModel } from 'src/app/shared/model/v-dept-collection-model';
import { VPackageCountModel } from 'src/app/shared/model/v-package-count-model';
import { VPaymentModel } from 'src/app/shared/model/v-payment-model';
import { ActualCustomerLessonService } from 'src/app/shared/services/actual-customer-lesson.service';
import { CashboxService } from 'src/app/shared/services/cashbox.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { DeptCollectionService } from 'src/app/shared/services/dept-collection.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import {CashBoxGeneralReportModel} from "../../../shared/model/cash-box-general-report-model";
import { ActualCustomerLessonResourceModel } from 'src/app/shared/model/actual-customer-lesson-resource-model';
import { AccountsStatusModel } from 'src/app/shared/model/accounts-status-model';
import { AccountingTransactionService } from 'src/app/shared/services/accounting-transaction.service';
import { CustomerLessonTotalModel } from 'src/app/shared/model/customer-lesson-total-model';
import { CustomerLessonService } from 'src/app/shared/services/customer-lesson.service';
import { EarningEducatorModel } from 'src/app/shared/model/earning-educator-model';
import { EducatorCostService } from 'src/app/shared/services/educator-cost.service';
import { VEarningPackageModel } from 'src/app/shared/model/v-earning-package-model';
import { ArtPackageService } from 'src/app/shared/services/art-package.service';
import { TotalCustomerPackageModel } from 'src/app/shared/model/total-customer-package-model';
import { Customer } from 'src/app/shared/model/customer';
import { VMeetingRequestModel } from 'src/app/shared/model/v-meeting-request-model';
import { MeetingRequestService } from 'src/app/shared/services/meeting-request.service';
import { GroupedLessonModel } from 'src/app/shared/model/grouped-lesson-model';
import { MainLessonAndDates } from 'src/app/shared/model/main-lesson-and-dates';
import { EventRenderedArgs, EventSettingsModel, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { LessonAndDatesModel } from 'src/app/shared/model/lesson-and-dates-model';
declare  var ApexCharts:  any;

export interface GroupedLessonGraphModel{
  name: string;
  data: SubDataModel[];
}

export interface SubDataModel{
  x: string;
  y: Date[];
}


@Component({
  selector: 'app-main-report',
  templateUrl: './main-report.component.html',
  styleUrls: ['./main-report.component.css']
})
export class MainReportComponent implements OnInit {

  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public eventSettings: EventSettingsModel;
  public selectedDate: Date = new Date();

  totalDeptCollect: number = 0;
  totalPayments: number = 0;
  totalCustomer: number = 0;
  totalSaledPackage: number = 0;
  myInteger: MyInteger;
  last3Days: MyInteger;
  saledPackageCount: VPackageCountModel[] = [];
  currentLessonSummaries: VActualCustomerLessonModel[] = [];
  packageData: any;
  cashboxData: any;
  earningPackageData: any;
  totalCustomerPackageData: any;
  lessonsInWeekData: any;
  cashBoxReportModel: CashBoxGeneralReportModel[] = [];
  cashBoxNames: string[] = [];
  actualCustomerLessons: ActualCustomerLessonResourceModel[] = [];
  accountsStatus: AccountsStatusModel;
  customerLessonTotalList: CustomerLessonTotalModel[] = [];
  earningEducator: EarningEducatorModel;
  earningPackageList: VEarningPackageModel[] = [];
  totalCustomerPackageList: TotalCustomerPackageModel[] = [];
  birthdateInWeekCustomers: Customer[] = [];
  vmeetingInWeekList: VMeetingRequestModel[] = [];
  weekLessons: MainLessonAndDates[] = [];
  weekLessonsDataList: GroupedLessonGraphModel[] = [];


  constructor(private deptCollectService: DeptCollectionService, private paymentService: PaymentService,
    private customerService: CustomerService, private actualMainService: ActualCustomerLessonService,
    private cashboxReportService: CashboxService, private accountingService: AccountingTransactionService,
    private customerLessonService: CustomerLessonService, private educatorCostService: EducatorCostService,
    private artPackageService: ArtPackageService, private meetingService: MeetingRequestService) { }

  ngOnInit() {
    this.earningEducator = {
      educatorId: 0,
      educatorName: '',
      cost: 0,
    };
    this.myInteger={
      result: 0
    };
    this.last3Days = {
      result: 0
    };
    this.accountsStatus = {
      totalCompanyDept: 0,
      totalCustomerDept: 0
    }
    this.getTotalDeptCollect();
    this.getTotalPayment();
    this.getTotalCustomer();
    this.getTotalSaledPackage();
    this.getTodayStudents();
    this.getPackageCount();
    this.getCurrentLessonsSummaries();
    this.getCashBoxGeneralReport();
    this.getActiveLessons();
    this.getAccountStatus();
    this.getCustomerLessonTotal();
    this.getEarningEducator();
    this.getEarningPackages();
    this.getTotalCustomerPackages();
    this.getMeetingInWeek();
    this.getLessonsInWeek();
  }

  oneventRendered(args: EventRenderedArgs): void {
    let categoryColor: string = args.data.categoryColor as string;
    if (!args.element || !categoryColor) {
        return;
    }
    if (this.scheduleObj.currentView === 'Agenda') {
        (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
        args.element.style.backgroundColor = categoryColor;
    }
}

  getTotalDeptCollect(){
    this.deptCollectService.getList().subscribe((data)=>{
      if(data.success){
        this.totalDeptCollect = 0;
        const collects = data.dynamicClass as VDeptCollectionModel[];
        collects.forEach(element => {
          this.totalDeptCollect+=element.collectionAmount;
        });
      }
    })
  }

  getTotalPayment(){
    this.paymentService.getList().subscribe((data)=>{
      if(data.success){
        this.totalPayments = 0;
        const payments = data.dynamicClass as VPaymentModel[];
        payments.forEach(element => {
          this.totalPayments += element.paymentAmount;
        });
      }
    })
  }

  getTotalCustomer(){
     this.customerService.getList().subscribe((data)=>{
      if(data.success){
        this.totalCustomer = 0;
        const customers = data.dynamicClass as VCustomer[];
        this.totalCustomer = customers.length;
      }
     })
  }

  getCurrentLessonsSummaries(){
    this.actualMainService.getCurrentLessonSummary().subscribe((data)=>{
      if(data.success){
        this.currentLessonSummaries = data.dynamicClass as VActualCustomerLessonModel[];
      }
    })
  }

  getTotalSaledPackage(){
    this.actualMainService.getLessonMains().subscribe((data)=>{
      if(data.success){
        this.totalSaledPackage = 0;
        const saledPackages = data.dynamicClass as VActualCustomerLessonMainModel[];
        this.totalSaledPackage = saledPackages.length;
      }
    })
  }

  getTodayStudents(){
    this.actualMainService.getTotalStudentInToday().subscribe((data)=>{
      if(data.success){
        this.myInteger = data.dynamicClass as MyInteger;
      }
    })
  }

  getLast3Days(){
    this.actualMainService.daysBeforeEnd().subscribe((data)=>{
      if(data.success){
        this.last3Days = data.dynamicClass as MyInteger;
      }
    })
  }

  getCashBoxGeneralReport(){
    this.cashboxReportService.generalReport().subscribe((data)=>{
      if(data.success){
          this.cashBoxReportModel = data.dynamicClass as CashBoxGeneralReportModel[];
      }
    })
  }

  getPackageCount(){
    this.actualMainService.getSaledPackageCount().subscribe((data)=>{
      if(data.success){
        this.saledPackageCount = data.dynamicClass as VPackageCountModel[];
        const countPackage: number[] = [];
        const packageName: string[] = [];

        this.saledPackageCount.forEach(element => {
          countPackage.push(element.subCategoryCount);
          packageName.push(element.subCategoryName+' '+element.artPackageName);
        });
        this.packageData = {
          series: countPackage,
          title: {
            floating: false,
            text: 'Paket Satış Oranı',
            align: 'left',
            style: {
              fontSize: '16px'
            }
          },
          labels: packageName,
          dataLabels: {
            enabled: true
          },
          chart: {
            width: '100%',
            height: 1200,
            type: 'pie',
            toolbar: {
              show: true,
              offsetX: 0,
              offsetY: 0,
              tools: {
                download: true,
              },
              autoSelected: 'zoom'
            },
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                enabled: true,
                delay: 150
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350
              }
            }
          },
          responsive: [{
            breakpoint: 750,
            options: {
              chart: {
                width: 650
              },
            }
          }]
        };
        document.querySelector("#packages").innerHTML = "";
        var team = new ApexCharts(document.querySelector("#packages"), this.packageData);
        team.render();
      }
    });
  }

  getActiveLessons(){
    this.actualMainService.getActiveLessons().subscribe((data)=>{
      if(data.success){
        this.actualCustomerLessons = data.dynamicClass as ActualCustomerLessonResourceModel[];
      }
    });
  }

  getAccountStatus(){
    this.accountingService.getAccountStatus().subscribe((data)=>{
      if(data.success){
        this.accountsStatus = data.dynamicClass as AccountsStatusModel;
      }
    });
  }

  getCustomerLessonTotal(){
    this.customerLessonService.getCustomerLessonTotal().subscribe((data)=>{
      if(data.success){
        this.customerLessonTotalList = data.dynamicClass as CustomerLessonTotalModel[];
        this.customerLessonTotalList = this.customerLessonTotalList.filter((item)=>item.total == 1);
      }
    });
  }

  getEarningEducator() {
    this.educatorCostService.getEarning().subscribe((data)=>{
      if(data.success){
        this.earningEducator = data.dynamicClass as EarningEducatorModel;
      }
    });
  }

  getBirthdayInWeek(){
    this.customerService.getBirthdayInWeek().subscribe((data)=>{
      if(data.success){
        this.birthdateInWeekCustomers = data.dynamicClass as Customer[];
      }
    });
  }

  getTotalCustomerPackages(){
    this.customerLessonService.getTotalCustomerPackages().subscribe((data)=>{
      if(data.success){
        this.totalCustomerPackageList = data.dynamicClass as TotalCustomerPackageModel[];
        const totalPackage: number[] = [];
        const customerNames: string[] = [];

        this.totalCustomerPackageList.forEach(element => {
          totalPackage.push(element.total);
          customerNames.push(element.name+' '+element.surname);
        });
        this.totalCustomerPackageData = {
          series: totalPackage,
          title: {
            floating: false,
            text: 'En çok paket alan müşteriler',
            align: 'left',
            style: {
              fontSize: '16px'
            }
          },
          labels: customerNames,
          dataLabels: {
            enabled: true
          },
          chart: {
            width: '100%',
            height: 1200,
            type: 'pie',
            toolbar: {
              show: true,
              offsetX: 0,
              offsetY: 0,
              tools: {
                download: true,
              },
              autoSelected: 'zoom'
            },
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                enabled: true,
                delay: 150
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350
              }
            }
          },
          responsive: [{
            breakpoint: 750,
            options: {
              chart: {
                width: 650
              },
            }
          }]
        };
        document.querySelector("#totalCustomerPackages").innerHTML = "";
        var team = new ApexCharts(document.querySelector("#totalCustomerPackages"), this.totalCustomerPackageData);
        team.render();
      }
    });
  }

  getEarningPackages() {
    this.artPackageService.getEarningPackage().subscribe((data)=>{
      if(data.success){
        this.earningPackageList = data.dynamicClass as VEarningPackageModel[];
        const costPackage: number[] = [];
        const packageName: string[] = [];

        this.earningPackageList.forEach(element => {
          costPackage.push(element.debt);
          packageName.push(element.subCategoryName+' '+element.artPackageName);
        });
        this.earningPackageData = {
          series: costPackage,
          title: {
            floating: false,
            text: 'Paket Kazandırma Oranı',
            align: 'left',
            style: {
              fontSize: '16px'
            }
          },
          labels: packageName,
          dataLabels: {
            enabled: true
          },
          chart: {
            width: '100%',
            height: 1200,
            type: 'pie',
            toolbar: {
              show: true,
              offsetX: 0,
              offsetY: 0,
              tools: {
                download: true,
              },
              autoSelected: 'zoom'
            },
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                enabled: true,
                delay: 150
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350
              }
            }
          },
          responsive: [{
            breakpoint: 750,
            options: {
              chart: {
                width: 650
              },
            }
          }]
        };
        document.querySelector("#earningPackages").innerHTML = "";
        var team = new ApexCharts(document.querySelector("#earningPackages"), this.earningPackageData);
        team.render();
      }
    });
  }

  getMeetingInWeek(){
    this.meetingService.getMeetingInWeek().subscribe((data) => {
      if(data.success){
        this.vmeetingInWeekList = data.dynamicClass as VMeetingRequestModel[];
      }
    });
  }

  getLessonsInWeek(){
    this.actualMainService.getLessonsInWeek().subscribe((data)=>{
      if(data.success){
        this.weekLessons = data.dynamicClass as MainLessonAndDates[];
        let counter = 0;
        let subModelList: LessonAndDatesModel[] = [];
        this.weekLessons.forEach(element => {
          subModelList.push(element.lessonAndDates);
        });
        subModelList.forEach(element => {
          counter++;
          element.id = counter.toString();
          element.categoryColor = 'Orange';
          element.startDate = element.lessonDates[0];
          element.finishedDate = element.lessonDates[1];
        });
        console.log(subModelList);
        this.eventSettings = {
          dataSource: subModelList,
          fields: {
            id: 'id',
            subject: { name: 'name' },
            startTime: { name: 'startDate' },
            endTime: { name: 'finishedDate' },
          },
          allowAdding: false,
          allowDeleting: false,
          allowEditing: false,
        }
      }
    });
  }
}
