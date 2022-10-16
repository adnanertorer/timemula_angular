import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerMainPackageListComponent } from './customer-main-package-list.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { CustomerMainPackageRouterModule } from './customer-main-package-list-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    CustomerMainPackageRouterModule
  ],
  declarations: [CustomerMainPackageListComponent]
})
export class CustomerMainPackageListModule { }
