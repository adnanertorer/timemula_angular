import { Component, OnInit } from '@angular/core';
import { VCashboxTransactionModel } from 'src/app/shared/model/v-cashbox-transaction-model';
import { CashBoxTransactionService } from 'src/app/shared/services/cash-box-transaction.service';

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
  constructor(private service: CashBoxTransactionService) { }

  ngOnInit() {
    this.getList();
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
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
