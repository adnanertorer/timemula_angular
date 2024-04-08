import { Component, OnInit } from '@angular/core';
import { ArtPackageModel } from 'src/app/shared/model/art-package-model';
import { CategoryModel } from 'src/app/shared/model/category-model';
import { ClassroomModel } from 'src/app/shared/model/classroom-model';
import { PackageClassroomModel } from 'src/app/shared/model/package-classroom-model';
import { SubCategoryModel } from 'src/app/shared/model/sub-category-model';
import { VClassroomPackageModel } from 'src/app/shared/model/v-classroom-package-model';
import { VLessons } from 'src/app/shared/model/v-lessons';
import { ArtPackageService } from 'src/app/shared/services/art-package.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { PackageClassroomService } from 'src/app/shared/services/classroom-package.service';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import {  participantEnum } from 'src/environments/environment';
declare let alertify: any;

@Component({
  selector: 'app-package-classroom',
  templateUrl: './package-classroom.component.html',
  styleUrls: ['./package-classroom.component.css']
})
export class PackageClassroomComponent implements OnInit {

  packageClassroom: PackageClassroomModel;
  list: VClassroomPackageModel[] = [];
  categories: CategoryModel[] = [];
  subCategories: SubCategoryModel[] = [];
  artPackages: ArtPackageModel[] = [];
  classrooms: ClassroomModel[] = [];
  selectedCategoryId: number = 0;
  selectedSubCategoryId: number = 0;
  pageOfItems: Array<any>;
  buttonText = "Kaydet";
  closedGroup: number =  participantEnum.closedGroup;
  lessons: VLessons[] = [];
  
  constructor(private service: PackageClassroomService, private servicePackage: ArtPackageService,
    private categoryService: CategoryService, private subCategoryService: SubCategoryService,
    private classroomService: ClassroomService, private lessonService: LessonService) { }

  ngOnInit() {
    this.packageClassroom = {
      classroomId: 0,
      createdAt: new Date(),
      createdBy: 0,
      id: 0,
      maxCapacity: 0,
      minCapacity: 0,
      priority: 0,
      categoryId: 0,
      subCategoryId: 0,
      lessonId: 0
    };

    this.getList();
    this.getClassrooms();
    this.getCategories();
  }

  getList(){
    this.service.getList().subscribe((data)=>{
      if(data.success){
        this.list = data.dynamicClass as VClassroomPackageModel[];
      }
    })
  }

  categoryOnChange(id) {
    this.selectedCategoryId = parseInt(id);
    this.getSubCategories(this.selectedCategoryId);
  }

  subCategoryOnChange(id) {
    this.selectedSubCategoryId = parseInt(id);
    this.getLessons(this.selectedCategoryId, this.selectedSubCategoryId);
  }

  getClassrooms(){
    this.classroomService.getList().subscribe((data)=>{
      if(data.success){
        this.classrooms = data.dynamicClass as ClassroomModel[];
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
        this.lessons = data.dynamicClass as VLessons[];
      }
    })
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.packageClassroom = resource;
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
    this.packageClassroom.classroomId = parseInt(this.packageClassroom.classroomId.toString());
    this.packageClassroom.lessonId = parseInt(this.packageClassroom.lessonId.toString());
    this.packageClassroom.maxCapacity = parseInt(this.packageClassroom.maxCapacity.toString());
    this.packageClassroom.minCapacity = parseInt(this.packageClassroom.minCapacity.toString());
    this.packageClassroom.priority = parseInt(this.packageClassroom.priority.toString());
    if (this.packageClassroom.id == 0) {
      this.service.add(this.packageClassroom).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.packageClassroom).subscribe((data) => {
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
