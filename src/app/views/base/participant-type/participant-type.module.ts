import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantTypeComponent } from './participant-type.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { ParticipantTypeRouterModule } from './participant-type-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    ParticipantTypeRouterModule
  ],
  declarations: [ParticipantTypeComponent]
})
export class ParticipantTypeModule { }
