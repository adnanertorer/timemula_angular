import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRouterModule } from './customer-router.module';
import { MyMaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomerRouterModule,
    ReactiveFormsModule,
    MyMaterialModule
  ],
  declarations: [CustomerComponent]
})
export class CustomerModule { }
