import { Component, OnInit } from '@angular/core';
import { LessonEducatorModel } from 'src/app/shared/model/lesson-educator-model';
import { LessonModel } from 'src/app/shared/model/lesson-model';
import { StaffModel } from 'src/app/shared/model/staff-model';
import { LessonEducatorService } from 'src/app/shared/services/lesson-educator.service';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { StaffService } from 'src/app/shared/services/staff.service';
import { SalaryTypeEnum } from 'src/environments/environment';
declare let alertify: any;


@Component({
  selector: 'app-create-lesson-educator',
  templateUrl: './create-lesson-educator.component.html',
  styleUrls: ['./create-lesson-educator.component.css']
})
export class CreateLessonEducatorComponent implements OnInit {

  model: LessonEducatorModel;
  modelList: LessonEducatorModel[] = [];
  lessonList: LessonModel[];
  staffList: StaffModel[] = [];
  pageOfItems: Array<any>;
  buttonText = Save;
  isSeancePrice: boolean = false;
  
  constructor(private service: LessonEducatorService, private lessonService: LessonService, private staffService: StaffService) { }

  ngOnInit() {
    this.model = {
      createdAt: new Date(),
      id: 0,
      isActive: true,
      seansPrice: 0,
      staffId: 0,
      createdBy: 0,
      lessonId: 0
    };
    this.isSeancePrice = false;
    this.getList();
    this.getLessons();
    this.getEducators();
  }

  getList(){
    this.service.getList().subscribe((data)=>{
      if(data.success){
        this.modelList = data.dynamicClass as any[];
        this.pageOfItems = this.modelList;
      }
    })
  }

  getLessons(){
    this.lessonService.getList().subscribe((data)=>{
      if(data.success){
        this.lessonList = data.dynamicClass as LessonModel[];
      }
    })
  }

  getEducators(){
    this.staffService.getTeachers().subscribe((data)=>{
      if(data.success){
        this.staffList = data.dynamicClass as StaffModel[];
      }
    })
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.model = resource;
    this.buttonText = Update;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getChangedStaff(id: any): void {
    this.staffService.getDetails(parseInt(id)).subscribe((data) => {
      if (data.success) {
        const staff = data.dynamicClass as StaffModel;
        this.model.staffId = staff.id;
        if(staff.salaryTypeId == SalaryTypeEnum.Seance){
          this.isSeancePrice = true;
        }
      }
    });
  }

  reset(): void {
    this.buttonText = Save;
    this.ngOnInit();
  }

  add(): void {
    this.model.lessonId = parseInt(this.model.lessonId.toString());
    this.model.staffId = parseInt(this.model.staffId.toString());
    this.model.seansPrice = parseFloat(this.model.seansPrice.toString());
    if (this.model.id == 0) {
      this.service.add(this.model).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.model).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    }
  }

  remove(id: number): void {
    this.service.remove(id).subscribe((data) => {
      if (data.success) {
        this.ngOnInit();
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2);
      } else {
        alert(data.clientMessage);
      }
    });
  }

}
