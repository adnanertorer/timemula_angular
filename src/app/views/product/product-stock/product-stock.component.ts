import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/shared/model/customer';
import { ProductModel } from 'src/app/shared/model/product-model';
import { SupplierModel } from 'src/app/shared/model/supplier-model';
import { VWarehouseModel } from 'src/app/shared/model/v-warehouse-model';
import { WarehouseModel } from 'src/app/shared/model/warehouse-model';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { WarehouseService } from 'src/app/shared/services/warehouse.service';
declare let alertify: any;

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.css']
})
export class ProductStockComponent implements OnInit {
  buttonText = Save;
  warehosue: WarehouseModel;
  stockList: VWarehouseModel[] = [];
  products: ProductModel[] = [];
  product: ProductModel = null;
  customers: Customer[] =[];
  suppliers: SupplierModel[] = [];
  pageOfItems: Array<any>;
  isCustomer: boolean = false;
  isSupplier: boolean = false;
  unitPrice: number = 0;
  finalPrice: number = 0;

  displayedColumns: string[] = ['name', 'unitPrice', 'amount',
  'discount', 'cost', 'createdAt', 'createdByName', 'transactionType', 'id'];

  dataSource: MatTableDataSource<VWarehouseModel>;
  @ViewChild('productPaginator') paginator: MatPaginator;
  @ViewChild('productSort') sort: MatSort;

  constructor(private productService: ProductService, private warehouseService: WarehouseService, private customerService: CustomerService,
    private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.warehosue = {
      amount: 0,
      cost: 0,
      createdAt: new Date(),
      createdBy: 0,
      id: 0,
      prType: 0,
      productId: 0,
      currentAccount: 0,
      discount: 0,
      unitPrice: 0
    }
    this.getProductList();
    this.getList();
  }
  productOnChange(source) {
    this.productService.getDetails(parseInt(source)).subscribe((data)=>{
      if(data.success){
        this.product = data.dynamicClass as ProductModel;
        this.unitPrice = this.product.price;
      }
    })
  }

  onAmountChange(amountValue: string): void {  
    const amount = parseInt(amountValue);
    this.warehosue.amount = amount;
    this.warehosue.cost = this.warehosue.amount * this.unitPrice;
    const discountValue = this.warehosue.discount * this.warehosue.cost /100;
    this.warehosue.cost = this.warehosue.cost - discountValue;
   // this.finalPrice = this.warehosue.cost;
  }

  onDiscountChange(discountValue: string): void {  
    if(!Number.isNaN(parseInt(discountValue))){
      this.warehosue.cost = this.warehosue.amount * this.unitPrice;
      const discount = parseInt(discountValue) * this.warehosue.cost / 100;
      this.warehosue.cost = this.warehosue.cost - discount;
    }else{
      this.warehosue.cost = this.warehosue.amount * this.unitPrice;
    }
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  typeOnChange(id) {
   if(parseInt(id) == 4){
     this.isCustomer = false;
     this.isSupplier = true;
     this.warehosue.currentAccount = 0;
     this.getSupplierList();
   }
   if(parseInt(id) == 2){
      this.isCustomer = true;
      this.isSupplier = false;
      this.warehosue.currentAccount = 0;
      this.getCustomerList();
   }
  }

  getProductList(){
    this.productService.getList().subscribe((data) => {
      this.products = data.dynamicClass as ProductModel[];
    })
  }

  getCustomerList(){
    this.customerService.getList().subscribe((data) => {
      this.customers = data.dynamicClass as Customer[];
    })
  }

  getSupplierList(){
    this.supplierService.getList().subscribe((data) => {
      this.suppliers = data.dynamicClass as SupplierModel[];
    })
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.warehosue = resource;
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
    if (this.warehosue.id == 0) {
      this.warehouseService.add(this.warehosue).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.warehouseService.update(this.warehosue).subscribe((data) => {
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
    this.warehouseService.getList().subscribe((data) => {
      this.stockList = data.dynamicClass as VWarehouseModel[];
      this.dataSource = new MatTableDataSource(this.stockList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  remove(id: number): void {
    this.warehouseService.remove(id).subscribe((data) => {
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
