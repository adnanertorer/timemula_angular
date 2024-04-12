import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArtPackageModel } from 'src/app/shared/model/art-package-model';
import { CategoryModel } from 'src/app/shared/model/category-model';
import { ParticipantModel } from 'src/app/shared/model/participant-model';
import { ParticipationModel } from 'src/app/shared/model/participation-model';
import { SubCategoryModel } from 'src/app/shared/model/sub-category-model';
import { VArtPackageModel } from 'src/app/shared/model/v-art-package-model';
import { VLessons } from 'src/app/shared/model/v-lessons';
import { ArtPackageService } from 'src/app/shared/services/art-package.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import Constants from 'src/app/shared/tools/constants';
declare let alertify: any;

@Component({
  selector: 'app-create-lesson-package',
  templateUrl: './create-lesson-package.component.html',
  styleUrls: ['./create-lesson-package.component.css'],
})
export class CreateLessonPackageComponent implements OnInit {
  displayedColumns: string[] = [
    'categoryName',
    'subCategoryName',
    'lessonName',
    'artPackageName',
    'seanceCount',
    'duration',
    'unitPrice',
    'seancePrice',
    'discount',
    'participantTypeName',
    'participantName',
    'isActive',
    'description',
    'id',
  ];
  dataSource: MatTableDataSource<VArtPackageModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  artPackage: ArtPackageModel;
  artPackages: VArtPackageModel[] = [];
  subCategories: SubCategoryModel[] = [];
  categories: CategoryModel[] = [];
  participantTypes: ParticipationModel[] = [];
  participants: ParticipantModel[] = [];
  lessons: VLessons[] = [];
  pageOfItems: Array<any>;
  buttonText = Constants.Save;
  isGroup: boolean = false;

  constructor(
    private service: ArtPackageService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private lessonService: LessonService
  ) {}

  ngOnInit() {
    this.artPackage = {
      artPackageName: '',
      categoryId: 0,
      createdAt: new Date(),
      createdBy: 0,
      description: '',
      discount: 0,
      id: 0,
      isActive: true,
      seanceCount: 0,
      seancePrice: 0,
      unitPrice: 0,
      participantTypeId: 0,
      subCategoryId: 0,
      participantId: 0,
      maxCapacity: 0,
      lessonId: 0,
      duration: 0,
    };

    this.service.getListAll().subscribe((data) => {
      if (data.success) {
        this.artPackages = data.dynamicClass as any[];
        this.dataSource = new MatTableDataSource(this.artPackages);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
    this.getCategories();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getList() {
    this.service.getListAll().subscribe((data) => {
      if (data.success) {
        this.artPackages = data.dynamicClass as any[];
        this.dataSource = new MatTableDataSource(this.artPackages);
      }
    });
  }

  categoryOnChange(id) {
    this.getSubCategories(this.artPackage.categoryId);
  }

  subCategoryOnChange(id) {
    this.getLessons(this.artPackage.categoryId, this.artPackage.subCategoryId);
  }

  getSubCategories(id: number) {
    this.subCategoryService.getList(id).subscribe(
      (data) => {
        this.subCategories = data.dynamicClass as SubCategoryModel[];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getLessons(categoryId: number, subCategoryId: number) {
    this.lessonService
      .getByCategory(categoryId, subCategoryId)
      .subscribe((data) => {
        if (data.success) {
          this.lessons = data.dynamicClass as VLessons[];
        }
      });
  }

  getCategories() {
    this.categoryService.getList().subscribe(
      (data) => {
        this.categories = data.dynamicClass as CategoryModel[];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    const id = parseInt(resource);
    this.ngOnInit();
    this.service.getDetails(id).subscribe((data) => {
      if (data.success) {
        this.artPackage = data.dynamicClass as ArtPackageModel;
        this.subCategoryService.getList(this.artPackage.categoryId).subscribe(
          (data) => {
            this.subCategories = data.dynamicClass as SubCategoryModel[];
            this.artPackage.subCategoryId = this.artPackage.subCategoryId;
            this.lessonService
              .getByCategory(
                this.artPackage.categoryId,
                this.artPackage.subCategoryId
              )
              .subscribe((data) => {
                if (data.success) {
                  this.lessons = data.dynamicClass as VLessons[];
                  this.artPackage.lessonId = this.artPackage.lessonId;
                  this.buttonText = Constants.Update;
                  window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                  });
                }
              });
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  add(): void {
    this.artPackage.categoryId = parseInt(
      this.artPackage.categoryId.toString()
    );
    this.artPackage.subCategoryId = parseInt(
      this.artPackage.subCategoryId.toString()
    );
    this.artPackage.discount = parseFloat(this.artPackage.discount.toString());
    this.artPackage.participantId = parseInt(
      this.artPackage.participantId.toString()
    );
    this.artPackage.participantTypeId = parseInt(
      this.artPackage.participantTypeId.toString()
    );
    this.artPackage.seanceCount = parseInt(
      this.artPackage.seanceCount.toString()
    );
    this.artPackage.seancePrice = parseFloat(
      this.artPackage.seancePrice.toString()
    );
    this.artPackage.unitPrice = parseFloat(
      this.artPackage.unitPrice.toString()
    );
    this.artPackage.duration = parseFloat(this.artPackage.duration.toString());
    if (this.artPackage.id == 0) {
      this.service.add(this.artPackage).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        },
        (err) => {
          alertify.error(err, 2);
        }
      );
    } else {
      this.service.update(this.artPackage).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        },
        (err) => {
          alertify.error(err, 2);
        }
      );
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
