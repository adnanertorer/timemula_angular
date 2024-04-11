import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ArtPackageModel } from 'src/app/shared/model/art-package-model';
import { CategoryModel } from 'src/app/shared/model/category-model';
import { ClassroomModel } from 'src/app/shared/model/classroom-model';
import { PackageClassroomModel } from 'src/app/shared/model/package-classroom-model';
import { SubCategoryModel } from 'src/app/shared/model/sub-category-model';
import { VClassroomPackageModel } from 'src/app/shared/model/v-classroom-package-model';
import { VLessons } from 'src/app/shared/model/v-lessons';
import { CategoryService } from 'src/app/shared/services/category.service';
import { PackageClassroomService } from 'src/app/shared/services/classroom-package.service';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { participantEnum } from 'src/environments/environment';
declare let alertify: any;

export interface ClassroomLessonTemp{
  maxCapacity: number;
  minCapacity: number;
  categoryId: number;
  subCategoryId: number;
  lessonId: number;
  id: number;
}

export interface CreateClassroomForLesson{
  classroom: ClassroomModel;
  lesson: ClassroomLessonTemp;
}


@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.component.html',
  styleUrls: ['./create-classroom.component.css']
})
export class CreateClassroomComponent implements OnInit {

  list: VClassroomPackageModel[] = [];
  categories: CategoryModel[] = [];
  subCategories: SubCategoryModel[] = [];
  artPackages: ArtPackageModel[] = [];
  classrooms: ClassroomModel[] = [];
  classroom: ClassroomModel;
  selectedCategoryId: number = 0;
  selectedSubCategoryId: number = 0;
  pageOfItems: Array<any>;
  buttonText = Save;

  createClassroomForLesson: CreateClassroomForLesson;

  closedGroup: number =  participantEnum.closedGroup;
  lessons: VLessons[] = [];
  
  constructor(private service: PackageClassroomService, 
    private categoryService: CategoryService, private subCategoryService: SubCategoryService,
    private classroomService: ClassroomService, private lessonService: LessonService) { }

  ngOnInit() {
    this.createClassroomForLesson = {
      classroom: {
        id: 0,
        classromName: "",
        createdBy: 0,
        quta: 0
      },
      lesson: {
        maxCapacity: 0,
        minCapacity: 0,
        categoryId: 0,
        subCategoryId: 0,
        lessonId: 0,
        id: 0
      }
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
    this.createClassroomForLesson = resource;
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
    this.createClassroomForLesson.classroom.id = parseInt(this.createClassroomForLesson.classroom.id.toString());
    this.createClassroomForLesson.lesson.lessonId = parseInt(this.createClassroomForLesson.lesson.lessonId.toString());
    this.createClassroomForLesson.lesson.maxCapacity = parseInt(this.createClassroomForLesson.lesson.maxCapacity.toString());
    this.createClassroomForLesson.lesson.minCapacity = parseInt(this.createClassroomForLesson.lesson.minCapacity.toString());
    this.service.addSetup(this.createClassroomForLesson).subscribe((data) => {
      if (data.success) {
        this.ngOnInit();
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2);
      }
    }, (err) => {
      alertify.error(err, 2);
    });
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
