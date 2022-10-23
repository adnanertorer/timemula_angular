import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { CashboxFilterModel } from 'src/app/shared/model/cashbox-filter-model';
import { CashboxModel } from 'src/app/shared/model/cashbox-model';
import { CashboxTransactionTypeModel } from 'src/app/shared/model/cashbox-transaction-type-model';
import { VCashboxTransactionModel } from 'src/app/shared/model/v-cashbox-transaction-model';
import { CashBoxTransactionService } from 'src/app/shared/services/cash-box-transaction.service';
import { CashboxService } from 'src/app/shared/services/cashbox.service';

@Component({
  selector: 'app-cashbox-transaction',
  templateUrl: './cashbox-transaction.component.html',
  styleUrls: ['./cashbox-transaction.component.css']
})
export class CashboxTransactionComponent implements OnInit {

  list: VCashboxTransactionModel[] = [];
  pageOfItems: Array<any>;
  totalExpense: number = 0;
  totalIncome: number = 0;
  net: number = 0;
  filter: CashboxFilterModel;
  transactionTypes: CashboxTransactionTypeModel[] = [];
  cashBoxes: CashboxModel[] = [];
  //transactionTypes: 

  @ViewChild('date')
  public Date: DatePickerComponent;
  @ViewChild('endDate')
  public EndDate: DatePickerComponent;
  
  public dateValue: Date = new Date();
  public endDateValue: Date = new Date();
  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public minDate: Date = new Date(this.fullYear, this.month , 7);
  public maxDate: Date = new Date(this.fullYear, this.month, 27);

  startDateModel: NgbDateStruct;
  
  constructor(private service: CashBoxTransactionService, private cashBoxService: CashboxService) { }

  ngOnInit() {
    this.filter = {
      cashBoxId: 0,
      transactionTypeId: 0,
      finishDate: null,
      startDate: null
    };
    this.getTransactionTypes();
    this.getCashBoxes();
    this.getList();
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  onDateChange(){
    this.dateValue = this.Date.value;
  }

  onEndDateChange(){
    this.endDateValue = this.EndDate.value;
  }

  getWithFilter(){
    this.totalExpense = 0;
    this.totalIncome = 0;
    this.filter.startDate = new Date(this.dateValue.getFullYear(), this.dateValue.getMonth(), this.dateValue.getDate());
    this.filter.finishDate = new Date(this.endDateValue.getFullYear(), this.endDateValue.getMonth(), this.endDateValue.getDate());
    this.filter.cashBoxId = parseInt(this.filter.cashBoxId.toString());
    this.filter.transactionTypeId = parseInt(this.filter.transactionTypeId.toString());
    this.service.getByFilter(this.filter).subscribe((data)=>{
      if(data.success){
        this.list = data.dynamicClass as VCashboxTransactionModel[];
        this.list.forEach(element => { 
          if(element.transactionTypeId == 1){
            this.totalIncome = this.totalIncome+element.cost;
          }else{
            this.totalExpense = this.totalExpense+element.cost;
          }
        });
        this.net = this.totalIncome - this.totalExpense;
        this.pageOfItems = this.list;
      }
    })
  }

  getTransactionTypes(){
    this.service.getTransactionTypes().subscribe((data)=>{
      if(data.success){
        this.transactionTypes = data.dynamicClass as CashboxTransactionTypeModel[];
      }
    })
  }

  getCashBoxes(){
    this.cashBoxService.getList().subscribe((data)=>{
      if(data.success){
        this.cashBoxes = data.dynamicClass as CashboxModel[];
      }
    })
  }
  getByFilter(){
    this.service.getByFilter(this.filter).subscribe((data)=>{
      if(data.success){
        this.list = data.dynamicClass as VCashboxTransactionModel[];
        this.list.forEach(element => {
          if(element.transactionTypeId == 1){
            this.totalIncome = this.totalIncome+element.cost;
          }else{
            this.totalExpense = this.totalExpense+element.cost;
          }
        });
        this.net = this.totalIncome - this.totalExpense;
        this.pageOfItems = this.list;
      }
    });
  }

  getList(){
    this.service.getList().subscribe((data)=>{
      if(data.success){
        this.list = data.dynamicClass as VCashboxTransactionModel[];
        this.list.forEach(element => {
          if(element.transactionTypeId == 1){
            this.totalIncome = this.totalIncome+element.cost;
          }else{
            this.totalExpense = this.totalExpense+element.cost;
          }
        });
        this.net = this.totalIncome - this.totalExpense;
        this.pageOfItems = this.list;
      }
    });
  }

}
