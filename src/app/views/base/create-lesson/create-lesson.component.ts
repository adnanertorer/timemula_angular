import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CategoryModel } from 'src/app/shared/model/category-model';
import { LessonModel } from 'src/app/shared/model/lesson-model';
import { SubCategoryModel } from 'src/app/shared/model/sub-category-model';
import { VLessons } from 'src/app/shared/model/v-lessons';
import { CategoryService } from 'src/app/shared/services/category.service';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { environment } from 'src/environments/environment';
declare let alertify: any;

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateLessonComponent implements OnInit {

  lesson: LessonModel;
  lessons: VLessons[] = [];
  pageOfItems: Array<any>;
  buttonText = "Kaydet";
  categories: CategoryModel[] = [];
  subCategories: SubCategoryModel[] = [];
  filesTemp:any;
  public message: String;
  public progress: number;
  fileToUpload: any = [];
  isFileExist:boolean;

  private readonly mainUrl = `${environment.mainUrl}`;
  private readonly apiUrl = `${environment.apiUrl}`;
  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private service: LessonService, private categoryService: CategoryService,
    private subCategoryService: SubCategoryService, private http: HttpClient) { }

    ngOnInit() {
      this.isFileExist = false;
      this.lesson = {
        categoryId: 0,
        createdAt: new Date(),
        id: 0,
        lessonName: '',
        subCategoryId: 0,
        createdBy: 0,
        lessonPhoto: ''
      };
      this.getList();
      this.getCategories();
    }

    validateFile(name: String) {
      var ext = name.substring(name.lastIndexOf('.') + 1);
      if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg') {
          return true;
      }
      else {
          return false;
      }
    }
  
    getList(){
      this.service.getList().subscribe((data)=>{
        if(data.success){
          this.lessons = data.dynamicClass as VLessons[];
          this.pageOfItems = this.lessons;
        }
      })
    }

    categoryOnChange(id) {
      this.getSubCategories(parseInt(id));
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
  
    onChangePage(pageOfItems: any[]): void {
      this.pageOfItems = pageOfItems;
    }

    getDetailFromTable(resource: any): void {
      this.categoryService.getList().subscribe((data)=>{
        if(data.success){
          this.categories = data.dynamicClass as CategoryModel[];
          this.subCategoryService.getList(resource.categoryId).subscribe((data)=>{
            if(data.success){
              this.subCategories = data.dynamicClass as SubCategoryModel[];
              this.lesson = resource;
              this.buttonText = "Güncelle";
                  window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
              });
            }
          })
        }
      })
    }

    reset(): void {
      this.buttonText = "Kaydet";
      this.ngOnInit();
    }
  
    public uploadFile = (files) => {
      if (files.length === 0) {
        return;
      }
      this.filesTemp = files;
      this.fileToUpload = <File>this.filesTemp[0];
      this.isFileExist = true;
      
      if(!this.validateFile(this.fileToUpload.name)){
        alert('Lütfen fotoğrafınızı jpg, jpeg ya da png formatında yükleyiniz.');
        this.isFileExist = false;
        return false;
      }
    }

    add(): void {
      this.lesson.categoryId = parseInt(this.lesson.categoryId.toString());
      this.lesson.subCategoryId = parseInt(this.lesson.subCategoryId.toString());
      if (this.lesson.id == 0) {
        const formData = new FormData();
        if(this.isFileExist){
          formData.append('lessonPhoto', this.fileToUpload.name);
          formData.append('file', this.fileToUpload, this.fileToUpload.name);
        }
        formData.append('categoryId', this.lesson.categoryId.toString());
        formData.append('lessonName', this.lesson.lessonName);
        formData.append('subCategoryId', this.lesson.subCategoryId.toString());
        formData.append('createdBy', '0');
        formData.append('createdAt', new Date().toISOString());
        this.http.post(`${this.apiUrl}/Lesson/Add`, formData, { reportProgress: true, observe: 'events'}).subscribe(event=>{
          if(event.type === HttpEventType.UploadProgress){
            this.progress = Math.round(100 * event.loaded/event.total);
          } else if(event.type === HttpEventType.Response){
            this.message = 'Yükleme tamamlandı';
            this.onUploadFinished.emit(event.body);
            alertify.success(this.message);
          }
        });
      } else {
        const formData = new FormData();
        formData.append('id', this.lesson.id.toString());
        if(this.isFileExist){
          formData.append('lessonPhoto', this.fileToUpload.name);
          formData.append('file', this.fileToUpload, this.fileToUpload.name);
        }
        formData.append('categoryId', this.lesson.categoryId.toString());
        formData.append('lessonName', this.lesson.lessonName);
        formData.append('subCategoryId', this.lesson.subCategoryId.toString());
        formData.append('createdBy', '0');
        formData.append('createdAt', new Date().toISOString());
        this.http.put(`${this.apiUrl}/Lesson/Update`, formData, { reportProgress: true, observe: 'events'}).subscribe(event=>{
          if(event.type === HttpEventType.UploadProgress){
            this.progress = Math.round(100 * event.loaded/event.total);
          } else if(event.type === HttpEventType.Response){
            this.message = 'Yükleme tamamlandı';
            this.onUploadFinished.emit(event.body);
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(this.message);
          }
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
