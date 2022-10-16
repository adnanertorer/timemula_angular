import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/shared/model/customer';
import { VActualCustomerLessonModel } from 'src/app/shared/model/v-actual-customer-lesson-model';
import { ActualCustomerLessonService } from 'src/app/shared/services/actual-customer-lesson.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { environment } from 'src/environments/environment';

declare let alertify: any;

@Component({
  selector: 'app-student-actual-lessons',
  templateUrl: './student-actual-lessons.component.html',
  styleUrls: ['./student-actual-lessons.component.css']
})
export class StudentActualLessonsComponent implements OnInit {

  list: VActualCustomerLessonModel[] = [];
  pageOfItems: Array<any>;
  name:string = "";
  surname:string = "";
  selectedCustomerId: number = 0;
  selectedUnicKey: string = '';
  isPrice: boolean = false;
  price: number = 0;
  priceDescription: string;
  private readonly mainUrl = `${environment.mainUrl}`;

  constructor(private service: ActualCustomerLessonService,  private activatedRoute: ActivatedRoute,
    private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.selectedCustomerId = params["customerId"];
      this.selectedUnicKey = params["unicKey"];
      this.customerService.getDetails(this.selectedCustomerId).subscribe((data)=>{
        if(data.success){
          let customer = data.dynamicClass as Customer;
          this.name = customer.name;
          this.surname = customer.surname;
        }
      })
      this.getList(this.selectedCustomerId, this.selectedUnicKey);
    });
  }

  getList(customerId: number, unicStrId: string){
      this.service.getListByPackage(customerId, unicStrId).subscribe((data)=>{
        if(data.success){
          this.list = data.dynamicClass as VActualCustomerLessonModel[];
          this.pageOfItems = this.list;
        }
      });
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }  

  openPackageMove(id: number){
    this.router.navigate(['musteri-hizmetleri/ders-kaydir.html/',id]);
 }

  openList(){
    this.router.navigate(['actual-hareketler/ogrenci-paket-takvimi.html/', this.selectedCustomerId, this.selectedUnicKey]);
  }

  setPrice(){
    this.isPrice = !this.isPrice;
  }

  setApprove(id: number){
    this.service.setApprove(id).subscribe((data)=>{
      if(data.success){
        this.ngOnInit();
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2);
      }else{
        alertify.set('notifier', 'position', 'top-right');
        alertify.error(data.clientMessage, 2);
      }
    });
  }
}
