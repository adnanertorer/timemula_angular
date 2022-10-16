import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsActualPackagesComponent } from './students-actual-packages.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { StudentsActualPackagesRouterModule } from './student-actual-packages-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    StudentsActualPackagesRouterModule
  ],
  declarations: [StudentsActualPackagesComponent]
})
export class StudentsActualPackagesModule { }
