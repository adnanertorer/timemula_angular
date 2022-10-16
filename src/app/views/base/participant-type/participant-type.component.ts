import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PariticipantTypeModel } from 'src/app/shared/model/pariticipant-type-model';
import { ParticipantTypeService } from 'src/app/shared/services/participant-type.service';
declare let alertify: any;

@Component({
  selector: 'app-participant-type',
  templateUrl: './participant-type.component.html',
  styleUrls: ['./participant-type.component.css']
})
export class ParticipantTypeComponent implements OnInit {

  participantType: PariticipantTypeModel;
  list: PariticipantTypeModel[] = [];
  form: UntypedFormGroup;
  pageOfItems: Array<any>;
  buttonText = 'Kaydet';

  constructor(private service: ParticipantTypeService) { }

  ngOnInit() {
    this.participantType = {
      createdAt: new Date(),
      createdBy: 0,
      id: 0,
      participantTypeName: ''
    };

    this.form = new UntypedFormGroup({
      'participantTypeName': new UntypedFormControl(this.participantType.participantTypeName, Validators.required)
    });

    this.getList();
  }


  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.participantType = resource;
    this.buttonText = 'Güncelle';
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  reset(): void {
    this.buttonText = 'Kaydet';
    this.ngOnInit();
  }

  add(): void {
    if (this.participantType.id == 0) {
      this.service.add(this.participantType).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.participantType).subscribe((data) => {
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

  getList(): void {
    this.service.getList().subscribe((data) => {
      this.list = data.dynamicClass as PariticipantTypeModel[];
      this.pageOfItems = this.list;
    })
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
