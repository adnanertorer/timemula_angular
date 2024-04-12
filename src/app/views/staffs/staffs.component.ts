import { Component, OnInit } from '@angular/core';
import { VStaffsModel } from 'src/app/shared/model/v-staffs-model';
import { Branch } from '../../shared/model/branch';
import { Qrud } from '../../shared/model/qrud';
import { SalaryType } from '../../shared/model/salary-type';
import { StaffModel } from '../../shared/model/staff-model';
import { StaffType } from '../../shared/model/staff-type';
import { BranchService } from '../../shared/services/branch.service';
import { SalaryTypeService } from '../../shared/services/salary-type.service';
import { StaffTypeService } from '../../shared/services/staff-type.service';
import { StaffService } from '../../shared/services/staff.service';
import Constants from 'src/app/shared/tools/constants';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss'],
})
export class StaffsComponent implements OnInit, Qrud {
  staff: StaffModel;
  staffList: VStaffsModel[] = [];
  staffTypes: StaffType[] = [];
  salaryTypes: SalaryType[] = [];
  pageOfItems: Array<any>;
  buttonText = Constants.Save;
  branches: Branch[] = [];

  constructor(
    private service: StaffService,
    private staffTypeService: StaffTypeService,
    private salaryTypeService: SalaryTypeService,
    private branchService: BranchService
  ) {}

  getList(): void {
    this.service.getList().subscribe((data) => {
      this.staffList = data.dynamicClass as VStaffsModel[];
      this.pageOfItems = this.staffList;
    });
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getBranches() {
    this.branchService.getList().subscribe((data) => {
      if (data.success) {
        this.branches = data.dynamicClass as Branch[];
      }
    });
  }

  getDetailFromTable(resource: any): void {
    //this.staff = resource;
    const id = resource.id;
    this.service.getDetails(id).subscribe((data) => {
      if (data.success) {
        this.staff = data.dynamicClass as StaffModel;
        this.buttonText = Constants.Update;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    });
  }

  add(): void {
    if (this.staff.id == 0) {
      this.staff.identityNumber = this.staff.identityNumber.toString();
      this.service.add(this.staff).subscribe(
        (data) => {
          if (data.success) {
            alert(data.clientMessage);
            this.ngOnInit();
          } else {
            alert(data.clientMessage);
          }
        },
        (err) => {
          alert(err);
        }
      );
    } else {
      this.staff.identityNumber = this.staff.identityNumber.toString();
      this.service.update(this.staff).subscribe((data) => {
        if (data.success) {
          alert(data.clientMessage);
          this.ngOnInit();
        } else {
          alert(data.clientMessage);
        }
      });
    }
  }

  remove(id: number): void {
    this.service.remove(id).subscribe((data) => {
      if (data.success) {
        alert(data.clientMessage);
        this.ngOnInit();
      } else {
        alert(data.clientMessage);
      }
    });
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  ngOnInit() {
    this.staff = {
      address: '',
      callenderOrder: 0,
      createdBy: 0,
      email: '',
      workFinishDateTime: null,
      workStarDateTime: new Date(),
      gsm: '',
      id: 0,
      identityNumber: '',
      name: '',
      salaryTypeId: 0,
      staffTypeId: 0,
      surname: '',
      birthDate: null,
      branchId: 0,
      isTeacher: false,
      salaryAmount: 0,
    };
    this.getList();
    this.getStaffTypes();
    this.getSalaryTypes();
    this.getBranches();
  }

  parseDate(dateString: string) {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

  getStaffTypes() {
    this.staffTypeService.getList().subscribe((data) => {
      if (data.success) {
        this.staffTypes = data.dynamicClass as StaffType[];
      }
    });
  }

  getSalaryTypes() {
    this.salaryTypeService.getList().subscribe((data) => {
      if (data.success) {
        this.salaryTypes = data.dynamicClass as SalaryType[];
      }
    });
  }
}
