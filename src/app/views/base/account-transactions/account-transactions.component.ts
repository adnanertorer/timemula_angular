import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { Customer } from 'src/app/shared/model/customer';
import { FilterAccountingModel } from 'src/app/shared/model/filter-accounting-model';
import { SupplierModel } from 'src/app/shared/model/supplier-model';
import { VAccountTrancation } from 'src/app/shared/model/v-account-trancation';
import { AccountingTransactionService } from 'src/app/shared/services/accounting-transaction.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { PersonTypeEnum } from 'src/environments/environment';

export interface tempCustomer{
  id: number;
  name: string;
}
@Component({
  selector: 'app-account-transactions',
  templateUrl: './account-transactions.component.html',
  styleUrls: ['./account-transactions.component.css']
})
export class AccountTransactionsComponent implements OnInit {

  list: VAccountTrancation[] = [];
  tempDataList: tempCustomer[] = [];
  tempData: tempCustomer;
  filter: FilterAccountingModel;
  customers: Customer[] = [];
  supliers: SupplierModel[] = [];



  displayedColumns: string[] = ['currentAccount', 'transactionTypeName', 'createdAt',
  'debt', 'claim', 'balance'];
  dataSource: MatTableDataSource<VAccountTrancation>;
  @ViewChild('accountPaginator') paginator: MatPaginator;
  @ViewChild('accountSort') sort: MatSort;

  @ViewChild('date')
  public Date: DatePickerComponent;
  @ViewChild('dateFinish')
  public DateFinish: DatePickerComponent;
  public dateValue?: Date = null;
  public dateValueFinish?: Date = null;
  totalDebt: number = 0;
  totalClaim: number = 0;
  totalNet: number = 0;

  constructor(private service: AccountingTransactionService, private customerService: CustomerService, private supplierService: SupplierService,
    private router: Router) { }

  ngOnInit() {
    this.filter = {
      customerId: 0,
      customerType: 0,
      transactionTypeId: 0,
      finishTime: null,
      startTime: null
    };
    this.service.getList().subscribe((data)=>{
      if(data.success){
        this.list = data.dynamicClass as VAccountTrancation[];
        this.list.forEach(element => {
          this.totalDebt += element.debt;
          this.totalClaim += element.claim;
        });
        this.totalNet = this.totalDebt- this.totalClaim;
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  
  onDateStartChange(){
    this.dateValue = this.Date.value;
    this.filter.startTime = new Date(this.dateValue.getFullYear(), this.dateValue.getMonth(), this.dateValue.getDate(),23, 59, 59);
  }

  onDateFinishChange(){
    this.dateValueFinish = this.DateFinish.value;
    this.filter.finishTime = new Date(this.dateValueFinish.getFullYear(), this.dateValueFinish.getMonth(), this.dateValueFinish.getDate(),23, 59, 59);
  }

  getCustomers(){
    this.customerService.getList().subscribe((data)=>{
      if(data.success){
        this.customers = data.dynamicClass as Customer[];
        this.tempDataList = [];
        this.customers.forEach(element => {
          const tempData = {
            id: element.id,
            name: element.name+' '+element.surname
          };
          this.tempDataList.push(tempData);
        });
      }
    })
  }

  onChangeCustomerType(value){
    console.log(value);
    if(value == PersonTypeEnum.Customer){
      this.getCustomers();
    } else if(value == PersonTypeEnum.Supplier){
      this.getSuppliers();
    }
  }

  getSuppliers(){
    this.supplierService.getList().subscribe((data)=>{
      if(data.success){
        this.supliers = data.dynamicClass as SupplierModel[];
        this.tempDataList = [];
        this.supliers.forEach(element => {
          const tempData = {
            id: element.id,
            name: element.companyName
          };
          this.tempDataList.push(tempData);
        });
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.totalClaim = 0;
    this.totalDebt = 0;
    this.totalNet = 0;
    this.dataSource.filteredData.forEach(element => {
      this.totalDebt += element.debt;
      this.totalClaim += element.claim;
    });
    this.totalNet = this.totalDebt- this.totalClaim;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  sendFilter(){
    this.filter.customerId = parseInt(this.filter.customerId.toString());
    this.filter.customerType = parseInt(this.filter.customerType.toString());
    this.filter.transactionTypeId = parseInt(this.filter.transactionTypeId.toString());
    this.totalClaim = 0;
    this.totalDebt = 0;
    this.totalNet = 0;
    this.service.getByFilter(this.filter).subscribe((data)=>{
      if(data.success){
        this.list = data.dynamicClass as VAccountTrancation[];
        this.list.forEach(element => {
          this.totalDebt += element.debt;
          this.totalClaim += element.claim;
        });
        this.totalNet = this.totalDebt- this.totalClaim;
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  getList(){
    this.service.getList().subscribe((data)=>{
      if(data.success){
        this.list = data.dynamicClass as VAccountTrancation[];
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  openList(unicKey: string, customerId: number){
    this.router.navigate(['musteri-hizmetleri/paketler-detay.html/', customerId.toString(), unicKey]);
  }

}
