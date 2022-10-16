import { Component, OnInit } from '@angular/core';
import { SupplierModel } from 'src/app/shared/model/supplier-model';
import { SupplierService } from 'src/app/shared/services/supplier.service';
declare let alertify: any;

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  buttonText = "Kaydet";
  supplier: SupplierModel;
  supplierList: SupplierModel[] = [];
  pageOfItems: Array<any>;
  constructor(private service: SupplierService) { }

  ngOnInit() {
    this.supplier = {
      address: "",
      authorized: "",
      companyName: "",
      createdAt: new Date(),
      createdBy: 0,
      id: 0,
      isActive: true,
      phone: ""
    }
    this.getList();
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.supplier = resource;
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
    if (this.supplier.id == 0) {
      this.service.add(this.supplier).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.supplier).subscribe((data) => {
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
      this.supplierList = data.dynamicClass as SupplierModel[];
      this.pageOfItems = this.supplierList;
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
