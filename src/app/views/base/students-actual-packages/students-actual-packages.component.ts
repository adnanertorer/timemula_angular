import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/shared/model/customer';
import { VCustomerMainModel } from 'src/app/shared/model/v-customer-main-model';
import { CustomerLessonService } from 'src/app/shared/services/customer-lesson.service';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-students-actual-packages',
  templateUrl: './students-actual-packages.component.html',
  styleUrls: ['./students-actual-packages.component.css']
})
export class StudentsActualPackagesComponent implements OnInit {

  list:VCustomerMainModel[] = [];
  pageOfItems: Array<any>;
  buttonText = Save;
  name:string = "";
  surname:string = "";
  selectedCustomerId: number= 0;
  constructor(private service: CustomerLessonService,  private activatedRoute: ActivatedRoute,
     private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params["id"];
      this.selectedCustomerId = parseInt(id);
      this.customerService.getDetails(this.selectedCustomerId).subscribe((data)=>{
        if(data.success){
          let customer = data.dynamicClass as Customer;
          this.name = customer.name;
          this.surname = customer.surname;
        }
      })
      this.getList(parseInt(id));
    });
  }

  getList(customerId: number){
    this.service.getListByCustomer(customerId).subscribe((data)=>{
      if(data.success){
        this.list = data.dynamicClass as VCustomerMainModel[];
        this.pageOfItems = this.list;
      }
    })
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  openList(unicKey: string){
     this.router.navigate(['actual-hareketler/ogrenci-paket-icerigi.html/', this.selectedCustomerId, unicKey]);
  }

}
