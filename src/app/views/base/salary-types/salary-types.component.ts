import { Component, OnInit } from '@angular/core';
import { SalaryType } from '../../../shared/model/salary-type';
import { SalaryTypeService } from '../../../shared/services/salary-type.service';
declare let alertify: any;

@Component({
  selector: 'app-salary-types',
  templateUrl: './salary-types.component.html',
  styleUrls: ['./salary-types.component.scss']
})
export class SalaryTypesComponent implements OnInit {

  salaryType: SalaryType;
  salaryTypes: SalaryType[] = [];
  pageOfItems: Array<any>;
  buttonText = Save;
  constructor(private service: SalaryTypeService) { }

  ngOnInit() {
    this.salaryType = {
      created_by: 0,
      id: 0,
      salaryTypeName: ""
    };
    this.getList();
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.salaryType = resource;
    this.buttonText = Update;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  reset(): void {
    this.buttonText = Save;
    this.ngOnInit();
  }

  add(): void {
    if (this.salaryType.id == 0) {
      this.service.add(this.salaryType).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.salaryType).subscribe((data) => {
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
      console.log(data);
      this.salaryTypes = data.dynamicClass as SalaryType[];
      this.pageOfItems = this.salaryTypes;
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
