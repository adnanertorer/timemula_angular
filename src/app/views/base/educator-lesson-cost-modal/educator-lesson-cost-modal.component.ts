import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CashboxModel } from 'src/app/shared/model/cashbox-model';
import { EducatorCostModel } from 'src/app/shared/model/educator-cost-model';
import { LessonEducatorModel } from 'src/app/shared/model/lesson-educator-model';
import { CashboxService } from 'src/app/shared/services/cashbox.service';
import { EducatorCostService } from 'src/app/shared/services/educator-cost.service';
import { LessonEducatorService } from 'src/app/shared/services/lesson-educator.service';
declare let alertify: any;

@Component({
  selector: 'app-educator-lesson-cost-modal',
  templateUrl: './educator-lesson-cost-modal.component.html',
  styleUrls: ['./educator-lesson-cost-modal.component.css']
})
export class EducatorLessonCostModalComponent implements OnInit {

  isManuelCost: boolean = false;
  educatorCost: EducatorCostModel;
  standardPrice: boolean = false;
  cashboxModelList: CashboxModel[] = [];
  selectedApproveNumber: number = 0;
  constructor(private service: EducatorCostService, public dialogRef: MatDialogRef<EducatorLessonCostModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EducatorCostModel, private lessonEducatorService: LessonEducatorService,
    private cashBoxService: CashboxService) { }

  ngOnInit() {
    this.educatorCost = {
      cost: this.data.cost,
      createdAt: new Date(),
      description: this.data.description,
      id: this.data.id,
      educatorId: this.data.educatorId,
      createdBy: 0,
      staffName: this.data.staffName,
      classroomName: this.data.classroomName,
      lessonName: this.data.lessonName,
      lessonId: this.data.lessonId,
      cashBoxId: 0,
      currentDate: this.data.currentDate,
      packageId: this.data.packageId,
      transactionType: 0
    };
    console.log(this.educatorCost);
    this.getCashBoxes();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  approveChanged(value){
    this.selectedApproveNumber = parseInt(value);
    this.educatorCost.transactionType = this.selectedApproveNumber;
    if(this.selectedApproveNumber == 1){
      this.isManuelCost = false;
      this.standardPrice = true;
      
      this.getLessons();
    } else if(this.selectedApproveNumber == 2){
      this.isManuelCost = true;
      this.standardPrice = false;
      this.educatorCost.description = '';
      this.educatorCost.cost = 0;
    }else{
      this.isManuelCost = false;
      this.standardPrice = false;
      this.educatorCost.cost  = 0;
      this.educatorCost.description = '';
    }
  }

  getCashBoxes(){
    this.cashBoxService.getList().subscribe((data)=>{
      if(data.success){
        this.cashboxModelList = data.dynamicClass as CashboxModel[];
      }
    })
  }

  getLessons(){
    this.lessonEducatorService.getLessonList(this.data.lessonId).subscribe((data)=>{
      if(data.success){
        const lessonEducators = data.dynamicClass as LessonEducatorModel[];
        const priceModel = lessonEducators.filter(i=>i.staffId == this.educatorCost.educatorId);
        this.educatorCost.cost = priceModel[0].seansPrice;
        this.educatorCost.description = 'Standart hakediş miktarı yansıtıldı.';
      }
    })
  }

  add(){
    const selectedApprove = (<HTMLInputElement>document.getElementById('costSettings')).value;
    if(selectedApprove === "0"){
      alert('Lütfen bir uygulama seçin.');
    }else{
      if(this.educatorCost.cashBoxId != 0){
        this.educatorCost.cashBoxId = parseInt(this.educatorCost.cashBoxId.toString());
      }
      this.educatorCost.currentDate = new Date(this.educatorCost.currentDate);
      this.service.add(this.educatorCost).subscribe((data)=>{
        if(data.success){
          this.onNoClick();
        }else{
          alertify.error('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      })
    }
  }


}
