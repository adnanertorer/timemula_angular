import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashboxTransactionComponent } from './cashbox-transaction.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { CashBoxTransactionRouterModule } from './cashbox-transaction-router.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    NgbDatepickerModule,
    DatePickerModule,
    CashBoxTransactionRouterModule
  ],
  declarations: [CashboxTransactionComponent]
})
export class CashboxTransactionModule { }
