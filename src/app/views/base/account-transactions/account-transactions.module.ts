import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTransactionsComponent } from './account-transactions.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { AccountTransactionsRouterModule } from './account-transactions-router.module';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    AccountTransactionsRouterModule,
    NgbDatepickerModule,
    MatFormFieldModule,
    NgbModule,
    DatePickerModule
  ],
  declarations: [AccountTransactionsComponent]
})
export class AccountTransactionsModule { }
