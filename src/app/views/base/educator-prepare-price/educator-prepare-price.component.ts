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

@Component({
  selector: 'app-educator-prepare-price',
  templateUrl: './educator-prepare-price.component.html',
  styleUrls: ['./educator-prepare-price.component.css']
})
export class EducatorPreparePriceComponent implements OnInit {

  modalData: EducatorCostModel;
  lessonList: VDoneLessonModel[] = [];
  doneLessonList: VDoneLessonModel[] = [];
  costList: VEducatorCost[] =[];

  displayedColumns: string[] = ['educatorName', 'classromName', 'currentDate', 'artPackageName', 'lessonName',
  'educatorId'];
  dataSource: MatTableDataSource<VDoneLessonModel>;

  costDisplayColums: string[] = ['name', 'cost', 'lessonName', 'cashBoxName', 'createdAt', 'description', 'id'];
  costDataSource: MatTableDataSource<VEducatorCost>;
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
          this.lessonList = data.dynamicClass as VDoneLessonModel[];
          if(this.lessonList.length > 0){
            this.educatorName = this.lessonList[0].educatorName;
            this.dataSource = new MatTableDataSource(this.lessonList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          this.educatorCostService.getByEducator(this.selectedEducatorId).subscribe((data)=>{
            if(data.success){
              this.costList = data.dynamicClass as VEducatorCost[];
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
        this.costList = data.dynamicClass as VEducatorCost[];
        this.costDataSource = new MatTableDataSource(this.costList);
        this.costDataSource.paginator = this.paginatorCosts;
        this.costDataSource.sort = this.sortCosts;
      }
    })
  }

  openDialog(): void {
    
    const dialogRef = this.dialog.open(EducatorLessonCostModalComponent, {
      width: '600px',
      data: {cost: this.modalData.cost, description: this.modalData.description, educatorId: this.modalData.educatorId, staffName: this.modalData.staffName,
        classroomName: this.modalData.classroomName, lessonName: this.modalData.lessonName, lessonId: this.modalData.lessonId, cashBoxId: 0,
        currentDate: this.modalData.currentDate, packageId: this.modalData.packageId, transactionType: this.modalData.transactionType}
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
    this.modalData.educatorId = parseInt(resource.educatorId);
    this.modalData.cost = 0;
    this.modalData.description = '';
    this.modalData.staffName = resource.educatorName;
    this.modalData.classroomName = resource.classromName;
    this.modalData.lessonName = resource.lessonName+'/'+resource.artPackageName;
    this.modalData.lessonId = resource.lessonId;
    this.modalData.packageId = resource.artPackageId;
    this.modalData.currentDate = resource.currentDate;
    this.openDialog();
  }

}
