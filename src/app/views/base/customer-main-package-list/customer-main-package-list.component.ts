import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/shared/model/customer';
import { VCustomerLessonModel } from 'src/app/shared/model/v-customer-lesson-model';
import { ActualCustomerLessonService } from 'src/app/shared/services/actual-customer-lesson.service';
import { CustomerLessonService } from 'src/app/shared/services/customer-lesson.service';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customer-main-package-list',
  templateUrl: './customer-main-package-list.component.html',
  styleUrls: ['./customer-main-package-list.component.css']
})
export class CustomerMainPackageListComponent implements OnInit {

  list: VCustomerLessonModel[] = [];
  pageOfItems: Array<any>;
  name:string = "";
  surname:string = "";

  constructor(private service: CustomerLessonService,  private activatedRoute: ActivatedRoute,
    private customerService: CustomerService, private router: Router, private actualService: ActualCustomerLessonService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const customerId = params["customerId"];
      const unicKey = params["unicKey"];
      this.customerService.getDetails( parseInt(customerId)).subscribe((data)=>{
        if(data.success){
          let customer = data.dynamicClass as Customer;
          this.name = customer.name;
          this.surname = customer.surname;
        }
      })
      this.getList(parseInt(customerId), unicKey);
    });
  }

  getList(customerId: number, unicStrId: string){
      this.actualService.getListByPackage(customerId, unicStrId).subscribe((data)=>{
        if(data.success){
          this.list = data.dynamicClass as VCustomerLessonModel[];
          this.pageOfItems = this.list;
        }
      });
  }

  lessonCancel(){
    const lastLesson = this.list[this.list.length-1];
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }  

  openPackageMove(id: number){
    this.router.navigate(['musteri-hizmetleri/ders-kaydir.html/',id]);
  }

  cancelLesson(id:number){
    this.actualService.cancelLesson(id).subscribe((data)=>{
      if(data.success){
        alert('Ders iptal edildi');
        this.ngOnInit();
      }
    })
  }

  //LifeArtsDb
}
