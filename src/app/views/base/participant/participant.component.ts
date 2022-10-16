import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ParticipantModel } from 'src/app/shared/model/participant-model';
import { ParticipantService } from 'src/app/shared/services/participant.service';
declare let alertify: any;

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {

  participant: ParticipantModel;
  list: ParticipantModel[] = [];
  form: UntypedFormGroup;
  pageOfItems: Array<any>;
  buttonText = 'Kaydet';

  constructor(private service: ParticipantService) { }

  ngOnInit() {
    this.participant = {
      createdAt: new Date(),
      createdBy: 0,
      id: 0,
      isActive: true,
      participantName: ''
    };

    this.form = new UntypedFormGroup({
      'participantName': new UntypedFormControl(this.participant.participantName, Validators.required)
    });

    this.getList();
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.participant = resource;
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
    if (this.participant.id == 0) {
      this.service.add(this.participant).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.participant).subscribe((data) => {
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
      this.list = data.dynamicClass as ParticipantModel[];
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
