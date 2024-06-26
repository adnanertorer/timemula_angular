import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageClassroomComponent } from './package-classroom.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { PackageClassroomRouterModule } from './package-classroom-router.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        JwPaginationModule,
        MyMaterialModule,
        PackageClassroomRouterModule
    ],
    exports: [
        PackageClassroomComponent
    ],
    declarations: [PackageClassroomComponent]
})
export class PackageClassroomModule { }
