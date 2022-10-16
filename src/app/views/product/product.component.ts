import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductModel } from 'src/app/shared/model/product-model';
import { ProductService } from 'src/app/shared/services/product.service';
import { environment } from 'src/environments/environment';
declare let alertify: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  buttonText = "Kaydet";
  product: ProductModel;
  productList: ProductModel[] = [];
  pageOfItems: Array<any>;
  public message: String;
  public progress: number;
  filesTemp: any;
  private readonly apiUrl = `${environment.apiUrl}`;
  private readonly mainUrl = `${environment.mainUrl}`;
  @Output() public onUploadFinished = new EventEmitter();

  displayedColumns: string[] = ['name', 'price', 'createdAt',
  'isActive', 'productPhoto', 'description', 'id'];

  dataSource: MatTableDataSource<ProductModel>;
  @ViewChild('productPaginator') paginator: MatPaginator;
  @ViewChild('productSort') sort: MatSort;

  constructor(private service: ProductService, private http: HttpClient) { }

  ngOnInit(): void {
    this.product = {
      createdAt: new Date(),
      createdBy: 0,
      description: '',
      id: 0,
      isActive: true,
      name: '',
      price: 0,
      productPhoto: ''
    };
    this.getList();
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.product = resource;
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
    if (this.product.id == 0) {
      this.service.add(this.product).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.product).subscribe((data) => {
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
      this.productList = data.dynamicClass as ProductModel[];
      this.dataSource = new MatTableDataSource(this.productList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg') {
        return true;
    }
    else {
        return false;
    }
  }

  public uploadFile = (files) => {
    if (files.lenght === 0) {
      return;
    }
    this.filesTemp = files;
    let fileToUpload = <File>this.filesTemp[0];

    if(!this.validateFile(fileToUpload.name)){
      alert('Lütfen fotoğrafınızı jpg, jpeg ya da png formatında yükleyiniz.');
      return false;
    }

    const formData = new FormData();
    formData.append('productPhoto', fileToUpload.name);
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('isActive', this.product.isActive ? 'true' : 'false');
    formData.append('name', this.product.name);
    formData.append('price', this.product.price.toString());
    formData.append('description', this.product.description);
    formData.append('createdBy', '0');
    formData.append('createdAt', new Date().toISOString());
    this.http.post(`${this.apiUrl}/Product/Add`, formData, { reportProgress: true, observe: 'events'}).subscribe(event=>{
      if(event.type === HttpEventType.UploadProgress){
        this.progress = Math.round(100 * event.loaded/event.total);
      } else if(event.type === HttpEventType.Response){
        this.message = 'Yükleme tamamlandı';
        this.onUploadFinished.emit(event.body);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

}
