import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { ArtPackageModel } from 'src/app/shared/model/art-package-model';
import { CashboxModel } from 'src/app/shared/model/cashbox-model';
import { CategoryModel } from 'src/app/shared/model/category-model';
import { EducatorCostFilterModel } from 'src/app/shared/model/educator-cost-filter-model';
import { LessonModel } from 'src/app/shared/model/lesson-model';
import { StaffModel } from 'src/app/shared/model/staff-model';
import { SubCategoryModel } from 'src/app/shared/model/sub-category-model';
import { VEducatorCost } from 'src/app/shared/model/v-educator-cost';
import { ActualCustomerLessonService } from 'src/app/shared/services/actual-customer-lesson.service';
import { ArtPackageService } from 'src/app/shared/services/art-package.service';
import { CashboxService } from 'src/app/shared/services/cashbox.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { EducatorCostService } from 'src/app/shared/services/educator-cost.service';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { StaffService } from 'src/app/shared/services/staff.service';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';

@Component({
  selector: 'app-educator-price-list',
  templateUrl: './educator-price-list.component.html',
  styleUrls: ['./educator-price-list.component.css']
})
export class EducatorPriceListComponent implements OnInit {

  costList: VEducatorCost[] =[];
  filter: EducatorCostFilterModel;
  educators: StaffModel[] = [];
  cashBoxes: CashboxModel[] = [];
  packages: ArtPackageModel[] = [];
  lessons: LessonModel[] = [];
  categories: CategoryModel[] = [];
  subCategories: SubCategoryModel[] = [];
  costDisplayColums: string[] = ['name', 'cost', 'lessonName', 'cashBoxName', 'createdAt', 'description', 'id'];
  costDataSource: MatTableDataSource<VEducatorCost>;

  @ViewChild('paginatorCosts') paginator: MatPaginator;
  @ViewChild('costSort') sort: MatSort;

  totalCost: number = 0;

  @ViewChild('date')
  public Date: DatePickerComponent;
  @ViewChild('endDate')
  public EndDate: DatePickerComponent;

  selectedCategoryId: number = 0;
  selectedSubCategoryId: number = 0;
  

  public dateValue: Date = new Date();
  public endDateValue: Date = new Date();
  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public minDate: Date = new Date(this.fullYear, this.month , 1);
  public maxDate: Date = new Date(this.fullYear, this.month, 30);

  constructor(private service: ActualCustomerLessonService, private educatorCostService: EducatorCostService, 
    private staffService: StaffService, private cashBoxService: CashboxService, private packageService: ArtPackageService,
    private lessonService: LessonService, private categoryService: CategoryService, private subCategoryService: SubCategoryService) { }

  ngOnInit() {
    this.filter = {
      cashBoxId: 0,
      educatorId: 0,
      lessonId: 0,
      endDate: null,
      startDate: null,
      categoryId: 0,
      subCategoryId: 0,
      packageId: 0
    };

    this.educatorCostService.getList().subscribe((data)=>{
      if(data.success){
        this.costList = data.dynamicClass as VEducatorCost[];
        this.costList.forEach(element => {
          this.totalCost += element.cost;
        });
        this.costDataSource = new MatTableDataSource(this.costList);
        this.costDataSource.paginator = this.paginator;
        this.costDataSource.sort = this.sort;
      }
    });

    this.getEducators();
    this.getCashBoxes();
    this.getCategories();
  }

  getEducators(){
    this.staffService.getTeachers().subscribe((data)=>{
      if(data.success){
        this.educators = data.dynamicClass as StaffModel[];
      }
    })
  }

  getCashBoxes(){
    this.cashBoxService.getList().subscribe((data)=>{
      if(data.success){
        this.cashBoxes = data.dynamicClass as CashboxModel[];
      }
    })
  }

  getCategories(){
    this.categoryService.getList().subscribe((data)=>{
      if(data.success){
        this.categories = data.dynamicClass as CategoryModel[];
      }
    })
  }

  getPackages(id){
    this.packageService.getListByLesson(id).subscribe((data)=>{
      if(data.success){
        this.packages = data.dynamicClass as ArtPackageModel[];
      }
    })
  }

  lessonOnChange(id) {
    this.getPackages(parseInt(id));
  }

  categoryOnChange(id) {
    this.selectedCategoryId = parseInt(id);
    this.getSubCategories(this.selectedCategoryId);
  }

  subCategoryOnChange(id) {
    this.selectedSubCategoryId = parseInt(id);
    this.getLessons(this.selectedCategoryId, this.selectedSubCategoryId);
  }

  getSubCategories(categoryId: number){
    this.subCategoryService.getList(categoryId).subscribe((data)=>{
      if(data.success){
        this.subCategories = data.dynamicClass as SubCategoryModel[];
      }
    })
  }

  getLessons(categoryId: number, subCategoryId: number){
    this.lessonService.getByCategory(categoryId, subCategoryId).subscribe((data)=>{
      if(data.success){
        this.lessons = data.dynamicClass as LessonModel[];
      }
    })
  }

  onDateChange(){
    this.dateValue = this.Date.value;
  }
 
  onEndDateChange(){
    this.endDateValue = this.EndDate.value;
  }

  getWithFilter(){
    this.filter.cashBoxId = parseInt(this.filter.cashBoxId.toString());
    this.filter.educatorId = parseInt(this.filter.educatorId.toString());
    this.filter.lessonId = parseInt(this.filter.lessonId.toString());
    this.filter.packageId = parseInt(this.filter.packageId.toString());
    this.filter.startDate =this.dateValue;// new Date(this.dateValue.getFullYear(), this.dateValue.getMonth(), this.dateValue.getDate());
    this.filter.endDate = this.endDateValue; //new Date(this.endDateValue.getFullYear(), this.endDateValue.getMonth(), this.endDateValue.getDate());
    this.educatorCostService.getListByFilter(this.filter).subscribe((data)=>{
      if(data.success){
        this.totalCost = 0;
        this.costList = data.dynamicClass as VEducatorCost[];
        this.costList.forEach(element => {
          this.totalCost += element.cost;
        });
        this.costDataSource = new MatTableDataSource(this.costList);
        this.costDataSource.paginator = this.paginator;
        this.costDataSource.sort = this.sort;
      }
    });
  }

  applyFilterCosts(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.costDataSource.filter = filterValue.trim().toLowerCase();
    this.totalCost = 0;
    this.costDataSource.filteredData.forEach(element => {
      this.totalCost += element.cost;
    });
    console.log(this.totalCost);
    if (this.costDataSource.paginator) {
      this.costDataSource.paginator.firstPage();
    }
  }

}
