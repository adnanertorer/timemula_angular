import { Component, OnInit } from '@angular/core';
import { ActualCustomerLessonModel } from 'src/app/shared/model/actual-customer-lesson-model';
import { MyInteger } from 'src/app/shared/model/my-integer';
import { VActualCustomerLessonMainModel } from 'src/app/shared/model/v-actual-customer-lesson-main-model';
import { VActualCustomerLessonModel } from 'src/app/shared/model/v-actual-customer-lesson-model';
import { VActualLessonSummaryModel } from 'src/app/shared/model/v-actual-lesson-summary-model';
import { VCustomer } from 'src/app/shared/model/v-customer';
import { VDeptCollectionModel } from 'src/app/shared/model/v-dept-collection-model';
import { VPackageCountModel } from 'src/app/shared/model/v-package-count-model';
import { VPaymentModel } from 'src/app/shared/model/v-payment-model';
import { ActualCustomerLessonService } from 'src/app/shared/services/actual-customer-lesson.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { DeptCollectionService } from 'src/app/shared/services/dept-collection.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
declare  var ApexCharts:  any;

@Component({
  selector: 'app-main-report',
  templateUrl: './main-report.component.html',
  styleUrls: ['./main-report.component.css']
})
export class MainReportComponent implements OnInit {

  totalDeptCollect: number = 0;
  totalPayments: number = 0;
  totalCustomer: number = 0;
  totalSaledPackage: number = 0;
  myInteger: MyInteger;
  last3Days: MyInteger;
  saledPackageCount: VPackageCountModel[] = [];
  currentLessonSummaries: VActualCustomerLessonModel[] = [];
  packageData: any;
  constructor(private deptCollectService: DeptCollectionService, private paymentService: PaymentService,
    private customerService: CustomerService, private actualMainService: ActualCustomerLessonService) { }

  ngOnInit() {
    this.myInteger={
      result: 0
    };
    this.last3Days = {
      result: 0
    };
    this.getTotalDeptCollect();
    this.getTotalPayment();
    this.getTotalCustomer();
    this.getTotalSaledPackage();
    this.getTodayStudents();
    this.getPackageCount();
    this.getCurrentLessonsSummaries();
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

  getPackageCount(){
    this.actualMainService.getSaledPackageCount().subscribe((data)=>{
      if(data.success){
        this.saledPackageCount = data.dynamicClass as VPackageCountModel[];
        const countPackage: number[] = [];
        const packageName: string[] = [];
        
        this.saledPackageCount.forEach(element => {
          countPackage.push(element.subCategoryCount);
          packageName.push(element.subCategoryName);
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
}
