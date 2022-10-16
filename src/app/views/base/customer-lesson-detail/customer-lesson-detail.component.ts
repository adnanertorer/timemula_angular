import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iif } from 'rxjs';
import { Customer } from 'src/app/shared/model/customer';
import { VCustomerLessonsTempMain } from 'src/app/shared/model/v-customer-lessons-temp-main';
import { VCustomerMainModel } from 'src/app/shared/model/v-customer-main-model';
import { CustomerLessonService } from 'src/app/shared/services/customer-lesson.service';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customer-lesson-detail',
  templateUrl: './customer-lesson-detail.component.html',
  styleUrls: ['./customer-lesson-detail.component.css']
})
export class CustomerLessonDetailComponent implements OnInit {

  list:VCustomerMainModel[] = [];
  tempList:VCustomerLessonsTempMain[] = [];
  pageOfItems: Array<any>;
  buttonText = "Kaydet";
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
      this.getTempList();
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

  tempToActual(unicKey: string){
    this.service.tempToActual(this.selectedCustomerId, unicKey).subscribe((data)=>{
      if(data.success){
        this.ngOnInit();
      }
    })
  }

  getTempList(){
    this.service.getTempList().subscribe((data)=>{
      if(data.success){
        this.tempList = data.dynamicClass as VCustomerLessonsTempMain[];
      }
    })
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  openList(unicKey: string){
     this.router.navigate(['musteri-hizmetleri/paketler-detay.html/', this.selectedCustomerId, unicKey]);
  }

  openForChangePackage(unicKey: string){
    this.router.navigate(['musteri-hizmetleri/paketler-degisiklik.html/', unicKey, this.selectedCustomerId]);
 }


}
