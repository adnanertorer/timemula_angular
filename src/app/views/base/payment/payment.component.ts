import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CashboxModel } from 'src/app/shared/model/cashbox-model';
import { DeptCollectionDialogData } from 'src/app/shared/model/dept-collection-dialog-data';
import { PaymentDialogData } from 'src/app/shared/model/payment-dialog-data';
import { PaymentModel } from 'src/app/shared/model/payment-model';
import { VCurrentBalanceModel } from 'src/app/shared/model/v-current-balance-model';
import { VDeptCollectionModel } from 'src/app/shared/model/v-dept-collection-model';
import { VPaymentModel } from 'src/app/shared/model/v-payment-model';
import { AccountingTransactionService } from 'src/app/shared/services/accounting-transaction.service';
import { CashboxService } from 'src/app/shared/services/cashbox.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { GeneralPaymentSubComponent } from '../general-payment-sub/general-payment-sub.component';
import { PaymentSubComponent } from '../payment-sub/payment-sub.component';
declare let alertify: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  transactionList: VCurrentBalanceModel[] = [];
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
  buttonText = "Kaydet";
  pageOfItems: Array<any>;
  pageOfItemTransactions: Array<any>;
  isCollection: boolean = false;
  strcurrentAccount: string = '';
  strDept: number = 0;
  totalPayment: number = 0;
  modalData: PaymentDialogData;

  constructor(private accontingService: AccountingTransactionService, 
    private service: PaymentService, private cashBoxService: CashboxService, public dialog: MatDialog) { }

  ngOnInit() {
   /* this.deptCollection = {
      accountingTransactionId: 0,
      collectionAmount: 0,
      createdAt: new Date,
      createdBy: 0,
      id: 0,
      cashBoxId: 0
    }*/
    this.modalData = {
      cashBoxList: [],
      currentAccount: '',
      paymentModel: this.payment,
      strDept: 0
    }
    this.getAccounts();
    this.getList();
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

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  onChangeTransactionPage(pageOfItems: any[]): void {
    this.pageOfItemTransactions = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.payment = resource;
    this.buttonText = "Güncelle";
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
    this.buttonText = "Kaydet";
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
      this.pageOfItems = this.paymentList;
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
