import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStockComponent } from './product-stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { ProductStockRouterModule } from './product-stock-router.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MyMaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    ProductStockRouterModule,
    ReactiveFormsModule,
    MyMaterialModule
  ],
  declarations: [ProductStockComponent]
})
export class ProductStockModule { }
