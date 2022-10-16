import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/shared/model/category-model';
import { CategoryService } from 'src/app/shared/services/category.service';
declare let alertify: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: CategoryModel;
  categories: CategoryModel[] = [];
  pageOfItems: Array<any>;
  buttonText = "Kaydet";

  constructor(private service: CategoryService) { }

  ngOnInit() {
    this.category = {
      categoryName: '',
      createdAt: new Date(),
      createdBy: 0,
      id: 0
    };

    this.getList();
  }

  getList() {
    this.service.getList().subscribe((data) => {
      this.categories = data.dynamicClass as CategoryModel[];
      this.pageOfItems = this.categories;
    })
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.category = resource;
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
    if (this.category.id == 0) {
      this.service.add(this.category).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.category).subscribe((data) => {
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
