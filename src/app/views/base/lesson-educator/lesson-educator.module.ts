import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonEducatorComponent } from './lesson-educator.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { LessonEducatorRouterModule } from './lesson-educator-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    LessonEducatorRouterModule
  ],
  declarations: [LessonEducatorComponent]
})
export class LessonEducatorModule { }
