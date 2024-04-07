import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassroomModel } from 'src/app/shared/model/classroom-model';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
declare let alertify: any;

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.component.html',
  styleUrls: ['./create-classroom.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateClassroomComponent implements OnInit {

  classroom: ClassroomModel;
  classrooms: ClassroomModel[] = [];
  subServiceId: number;
  pageOfItems: Array<any>;
  buttonText = "Kaydet";
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
    this.buttonText = "Güncelle";
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  reset(): void {
    this.buttonText = "Kaydet";
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
