import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeptCollectionComponent } from './dept-collection.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { DeptCollectionRouterModule } from './dept-collection-router.module';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    DatePickerModule,
    DeptCollectionRouterModule
  ],
  declarations: [DeptCollectionComponent]
})
export class DeptCollectionModule { }
