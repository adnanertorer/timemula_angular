import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassroomModel } from '../../../shared/model/classroom-model';
import { ClassroomService } from '../../../shared/services/classroom.service';
import Constants from 'src/app/shared/tools/constants';
declare let alertify: any;

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

  classroom: ClassroomModel;
  classrooms: ClassroomModel[] = [];
  subServiceId: number;
  pageOfItems: Array<any>;
  buttonText = Constants.Save;
  constructor(private activatedRoute: ActivatedRoute, private service: ClassroomService) { }

  ngOnInit() {
    this.classroom = {
      classromName: '',
      createdBy: 0,
      id: 0,
      quta: 0
    };
    this.getList();
  } 

  getList() {
    this.service.getList().subscribe((data) => {
      this.classrooms = data.dynamicClass as ClassroomModel[];
      this.pageOfItems = this.classrooms;
    })
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.classroom = resource;
    this.buttonText = Constants.Update;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  add(): void {
    if (this.classroom.id == 0) {
      this.service.add(this.classroom).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.classroom).subscribe((data) => {
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
    const approve = confirm('Derslik silmek üzeresiniz, devam etmek istiyor musunuz?');
    if(approve){
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

}
