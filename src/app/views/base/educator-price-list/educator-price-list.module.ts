import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducatorPriceListComponent } from './educator-price-list.component';
import { FormsModule } from '@angular/forms';
import { MyMaterialModule } from 'src/app/material.module';
import { EducatorPriceListRouterModule } from './educator-price-list-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    EducatorPriceListRouterModule
  ],
  declarations: [EducatorPriceListComponent]
})
export class EducatorPriceListModule { }
