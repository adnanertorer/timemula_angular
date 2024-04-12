import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { CashboxModel } from 'src/app/shared/model/cashbox-model';
import { DeptCollectionDialogData } from 'src/app/shared/model/dept-collection-dialog-data';
import { PaymentDialogData } from 'src/app/shared/model/payment-dialog-data';
import { PaymentFilterModel } from 'src/app/shared/model/payment-filter-model';
import { PaymentModel } from 'src/app/shared/model/payment-model';
import { VCurrentBalanceModel } from 'src/app/shared/model/v-current-balance-model';
import { VDeptCollectionModel } from 'src/app/shared/model/v-dept-collection-model';
import { VPaymentModel } from 'src/app/shared/model/v-payment-model';
import { AccountingTransactionService } from 'src/app/shared/services/accounting-transaction.service';
import { CashboxService } from 'src/app/shared/services/cashbox.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { GeneralPaymentSubComponent } from '../general-payment-sub/general-payment-sub.component';
import { PaymentSubComponent } from '../payment-sub/payment-sub.component';
import Constants from 'src/app/shared/tools/constants';
declare let alertify: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  
  filter: PaymentFilterModel;
  transactionList: VCurrentBalanceModel[] = [];

  @ViewChild('date')
  public Date: DatePickerComponent;
  @ViewChild('endDate')
  public EndDate: DatePickerComponent;

  public dateValue: Date = new Date();
  public endDateValue: Date = new Date();
  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public minDate: Date = new Date(this.fullYear, this.month , 1);
  public maxDate: Date = new Date(this.fullYear, this.month, 30);
  
  generalPayment: PaymentModel = {
    paymentAmount: 0,
    createdAt: new Date,
    createdBy: 0,
    id: 0,
    cashBoxId: 0,
    description: '',
    supplierId: 0,
    changedAt: null,
    changedBy: null
  };

  payment: PaymentModel = {
   // accountingTransactionId: 0,
    paymentAmount: 0,
    createdAt: new Date,
    createdBy: 0,
    id: 0,
    cashBoxId: 0,
    description: '',
    supplierId: 0,
    changedAt: null,
    changedBy: null
  };
  paymentList: VPaymentModel[] = [];
  cashBoxList: CashboxModel[] = [];
  cashBoxListFilter: CashboxModel[] = [];
  buttonText = Constants.Save;
  pageOfItems: Array<any>;
  pageOfItemTransactions: Array<any>;
  isCollection: boolean = false;
  strcurrentAccount: string = '';
  strDept: number = 0;
  totalPayment: number = 0;
  modalData: PaymentDialogData;

  displayColums: string[] = ['companyName', 'cashBoxName', 'paymentAmount', 'createdAt', 'description', 'id'];
  dataSource: MatTableDataSource<VPaymentModel>;

  @ViewChild('paginatorPayment') paginator: MatPaginator;
  @ViewChild('paymentSort') sort: MatSort;


  constructor(private accontingService: AccountingTransactionService, 
    private service: PaymentService, private cashBoxService: CashboxService,
     public dialog: MatDialog) { }

  ngOnInit() {
    this.filter = {
      cashBoxId: 0,
      endDate: null,
      startDate: null
    };

    this.modalData = {
      cashBoxList: [],
      currentAccount: '',
      paymentModel: this.payment,
      strDept: 0
    }
    this.getAccounts();
    this.getList();
    this.getCashBoxForFilter();
  }
  openDialog(): void {
    this.modalData = {
      cashBoxList: this.cashBoxList,
      currentAccount: this.strcurrentAccount,
      paymentModel: this.payment,
      strDept: this.strDept
    }
    const dialogRef = this.dialog.open(PaymentSubComponent, {
      width: '600px',
      data: {cashBoxList: this.cashBoxList, currentAccount: this.strcurrentAccount, paymentModel: this.payment, strDept: this.strDept}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onDateChange(){
    this.dateValue = this.Date.value;
  }
 
  onEndDateChange(){
    this.endDateValue = this.EndDate.value;
  }

  applyFilterCosts(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.totalPayment = 0;
    this.dataSource.filteredData.forEach(element => {
      this.totalPayment += element.paymentAmount;
    });
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openGeneralDialog(): void {
    this.payment.supplierId = 3;
    this.strcurrentAccount = "Genel Tedarikçi";
    this.modalData = {
      cashBoxList: this.cashBoxList,
      currentAccount: this.strcurrentAccount,
      paymentModel: this.payment,
      strDept: this.strDept
    }
    const dialogRef = this.dialog.open(GeneralPaymentSubComponent, {
      width: '600px',
      data: {cashBoxList: this.cashBoxList, currentAccount: this.strcurrentAccount, paymentModel: this.payment, strDept: this.strDept}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getCashBoxForFilter(){
    this.cashBoxService.getList().subscribe((data)=>{
      if(data.success){
        this.cashBoxListFilter = data.dynamicClass as CashboxModel[];
      }
    })
  }

  onChangeTransactionPage(pageOfItems: any[]): void {
    this.pageOfItemTransactions = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.payment = resource;
    this.buttonText = Constants.Update;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
   
  }
  getCollection(resource: any): void{
    this.payment.supplierId = resource.customerId;
    this.strcurrentAccount = resource.currentAccount;
    this.strDept = resource.currentBalance;
    this.isCollection = true;
    this.openDialog();
  }

  getDetailTransaction(resource: any): void {

  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  add(): void {
    if (this.payment.id == 0) {
      this.service.add(this.payment).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.payment).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    }
  }

  getList(): void {
    this.service.getList().subscribe((data) => {
      this.paymentList = data.dynamicClass as VPaymentModel[];
      this.paymentList.forEach(element => {
        this.totalPayment = element.paymentAmount + this.totalPayment;
      });

      this.dataSource = new MatTableDataSource(this.paymentList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

  getWithFilter(){
    this.filter.startDate = this.dateValue;
    this.filter.endDate = this.endDateValue;
    this.service.getListByFilter(this.filter).subscribe((data) => {
      this.paymentList = data.dynamicClass as VPaymentModel[];
      this.paymentList.forEach(element => {
        this.totalPayment = element.paymentAmount + this.totalPayment;
      });

      this.dataSource = new MatTableDataSource(this.paymentList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

  getAccounts(){
    this.accontingService.getMyDepts().subscribe((data)=>{
      if(data.success){
        this.transactionList = data.dynamicClass as VCurrentBalanceModel[];
      }
    })
  }

  getCashBoxes(){
    this.cashBoxService.getList().subscribe((data)=>{
      if(data.success){
        this.cashBoxList = data.dynamicClass as CashboxModel[];
      }
    })
  }

  remove(id: number): void {
    this.service.remove(id).subscribe((data) => {
      if (data.success) {
        this.ngOnInit();
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2);
      } else {
        alert(data.clientMessage);
      }
    });
  }

}
