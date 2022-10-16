import { Component, OnInit } from '@angular/core';
import { CashboxModel } from 'src/app/shared/model/cashbox-model';
import { DeptCollectionModel } from 'src/app/shared/model/dept-collection-model';
import { AccountingTransactionService } from 'src/app/shared/services/accounting-transaction.service';
import { CashboxService } from 'src/app/shared/services/cashbox.service';
import { DeptCollectionService } from 'src/app/shared/services/dept-collection.service';
declare let alertify: any;
import {MatDialog} from '@angular/material/dialog';
import { CollectionSubComponent } from '../collection-sub/collection-sub.component';
import { DeptCollectionDialogData } from 'src/app/shared/model/dept-collection-dialog-data';
import { VCurrentBalanceModel } from 'src/app/shared/model/v-current-balance-model';
import { VDeptCollectionModel } from 'src/app/shared/model/v-dept-collection-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dept-collection',
  templateUrl: './dept-collection.component.html',
  styleUrls: ['./dept-collection.component.css']
})
export class DeptCollectionComponent implements OnInit {

  transactionList: VCurrentBalanceModel[] = [];

  deptCollection: DeptCollectionModel = {
   // accountingTransactionId: 0,
    collectionAmount: 0,
    createdAt: new Date,
    createdBy: 0,
    id: 0,
    cashBoxId: 0,
    description: '',
    customerId: 0
  };
  deptCollectionList: VDeptCollectionModel[] = [];
  cashBoxList: CashboxModel[] = [];
  buttonText = "Kaydet";
  pageOfItems: Array<any>;
  pageOfItemTransactions: Array<any>;
  isCollection: boolean = false;
  strcurrentAccount: string = '';
  strDept: number = 0;
  totalCollection: number = 0;
  modalData: DeptCollectionDialogData;

  constructor(private accontingService: AccountingTransactionService, 
    private service: DeptCollectionService, private cashBoxService: CashboxService,
     public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.modalData = {
      cashBoxList: [],
      currentAccount: '',
      deptCollection: this.deptCollection,
      strDept: 0
    }
    this.getAccounts();
    this.getList();
  }
  openDialog(): void {
    this.modalData = {
      cashBoxList: this.cashBoxList,
      currentAccount: this.strcurrentAccount,
      deptCollection: this.deptCollection,
      strDept: this.strDept
    }
    const dialogRef = this.dialog.open(CollectionSubComponent, {
      width: '600px',
      data: {cashBoxList: this.cashBoxList, currentAccount: this.strcurrentAccount, deptCollection: this.deptCollection, strDept: this.strDept}
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
    this.deptCollection = resource;
    this.buttonText = "Güncelle";
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
   
  }
  getInstallment(resource: any): void{
    this.router.navigate(['finansal-islemler/odeme-planlama.html/', resource.customerId]);
  }

  getCollection(resource: any): void{
    this.deptCollection.customerId = resource.customerId;
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
    if (this.deptCollection.id == 0) {
      this.service.add(this.deptCollection).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.deptCollection).subscribe((data) => {
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
      this.deptCollectionList = data.dynamicClass as VDeptCollectionModel[];
      this.deptCollectionList.forEach(element => {
        this.totalCollection = element.collectionAmount + this.totalCollection;
      });
      this.pageOfItems = this.deptCollectionList;
    })
  }

  getAccounts(){
    this.accontingService.getCutomerDepts().subscribe((data)=>{
      if(data.success){
        this.transactionList = data.dynamicClass as VCurrentBalanceModel[];
      }
    })
  }

  openInstallmentDetailList(id: number){
    console.log(id);
    this.router.navigate(['cari-hesaplar/musteri-taksit-listesi.html/', id]);
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
