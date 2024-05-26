import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EducatorCostModel } from 'src/app/shared/model/educator-cost-model';
import { VDoneLessonModel } from 'src/app/shared/model/v-done-lesson-model';
import { VEducatorCost } from 'src/app/shared/model/v-educator-cost';
import { VEducatorCostProgram } from 'src/app/shared/model/v-educator-cost-program';
import { ActualCustomerLessonService } from 'src/app/shared/services/actual-customer-lesson.service';
import { EducatorCostService } from 'src/app/shared/services/educator-cost.service';
import { EducatorLessonCostModalComponent } from '../educator-lesson-cost-modal/educator-lesson-cost-modal.component';
import { CustomerLesson } from 'src/app/shared/model/customer-lesson';
import { CustomerLessonModel } from 'src/app/shared/model/customer-lesson-model';

@Component({
  selector: 'app-educator-prepare-price',
  templateUrl: './educator-prepare-price.component.html',
  styleUrls: ['./educator-prepare-price.component.css']
})
export class EducatorPreparePriceComponent implements OnInit {

  modalData: EducatorCostModel;
  lessonList: CustomerLessonModel[] = [];
  doneLessonList: CustomerLessonModel[] = [];
  costList: EducatorCostModel[] =[];

  displayedColumns: string[] = ['educatorName', 'classromName', 'startDate', 'artPackageName', 'lessonName',
  'educatorId'];
  dataSource: MatTableDataSource<CustomerLessonModel>;

  costDisplayColums: string[] = ['name', 'cost', 'lessonName', 'cashBoxName', 'createdAt', 'description', 'id'];
  costDataSource: MatTableDataSource<EducatorCostModel>;
  educatorName: string = '';
  selectedEducatorId: number = 0;

  @ViewChild('programPaginator') paginator: MatPaginator;
  @ViewChild('programSort') sort: MatSort;

  @ViewChild('paginatorCosts') paginatorCosts: MatPaginator;
  @ViewChild('costSort') sortCosts: MatSort;

  totalCost: number = 0;

  constructor(private service: ActualCustomerLessonService, private activateRoute: ActivatedRoute, private educatorCostService: EducatorCostService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.modalData = {
      cost: 0,
      createdAt: new Date(),
      description: '',
      id: 0,
      educatorId: 0,
      createdBy: 0,
      cashBoxId: 0,
      currentDate: new Date(),
      lessonId: 0,
      packageId: 0,
      transactionType: 0,
      classroomName: '',
      lessonName: '',
      staffName: ''
    }
    this.activateRoute.params.subscribe(params => {
      this.selectedEducatorId = parseInt(params["id"]);
      this.service.getDoneLessonsByEducator(this.selectedEducatorId).subscribe((data)=>{
        if(data.success){
          this.lessonList = data.dynamicClass as CustomerLessonModel[];
          if(this.lessonList.length > 0){
            this.educatorName = this.lessonList[0].staff.name+' '+this.lessonList[0].staff.surname;
            this.dataSource = new MatTableDataSource(this.lessonList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          this.educatorCostService.getByEducator(this.selectedEducatorId).subscribe((data)=>{
            if(data.success){
              this.costList = data.dynamicClass as EducatorCostModel[];
              this.costList.forEach(element => {
                this.totalCost += element.cost;
              });
              this.costDataSource = new MatTableDataSource(this.costList);
              this.costDataSource.paginator = this.paginatorCosts;
              this.costDataSource.sort = this.sortCosts;
            }
          });
        }
      })
    });
  }

  getCostList(){
    this.educatorCostService.getByEducator(this.selectedEducatorId).subscribe((data)=>{
      if(data.success){
        this.costList = data.dynamicClass as EducatorCostModel[];
        this.costDataSource = new MatTableDataSource(this.costList);
        this.costDataSource.paginator = this.paginatorCosts;
        this.costDataSource.sort = this.sortCosts;
      }
    })
  }

  openDialog(): void {
    console.log(this.modalData);
    const dialogRef = this.dialog.open(EducatorLessonCostModalComponent, {
      width: '600px',
      data: {cost: this.modalData.cost, description: this.modalData.description, educatorId: this.modalData.educatorId, staffName: this.modalData.staffName,
        classroomName: this.modalData.classroomName, lessonName: this.modalData.lessonName, lessonId: this.modalData.lessonId, cashBoxId: 0,
        currentDate: this.modalData.currentDate, packageId: this.modalData.packageId, transactionType: this.modalData.transactionType, id: this.modalData.id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterCosts(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.costDataSource.filter = filterValue.trim().toLowerCase();
    this.totalCost = 0;
    this.costDataSource.filteredData.forEach(element => {
      this.totalCost += element.cost;
    });
    if (this.costDataSource.paginator) {
      this.costDataSource.paginator.firstPage();
    }
  }

  getCost(resource: any): void{
    console.log(resource);
    this.modalData.educatorId = parseInt(resource.educatorId);
    this.modalData.cost = 0;
    this.modalData.description = '';
    this.modalData.staffName = resource.staff.name+' '+resource.staff.surname;
    this.modalData.classroomName = resource.classroom.classromName;
    this.modalData.lessonName = resource.lesson.lessonName+'/'+resource.artPackage.artPackageName;
    this.modalData.lessonId = resource.lessonId;
    this.modalData.packageId = resource.artPackageId;
    this.modalData.currentDate = resource.startDate;
    this.modalData.id = resource.id;
    this.openDialog();
  }

}
