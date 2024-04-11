import { Component, OnInit, ViewChild } from '@angular/core';
import { ArtPackageModel } from 'src/app/shared/model/art-package-model';
import { CategoryModel } from 'src/app/shared/model/category-model';
import { ClassroomModel } from 'src/app/shared/model/classroom-model';
import { CriteriaFilterModel } from 'src/app/shared/model/criteria-filter-model';
import { Customer } from 'src/app/shared/model/customer';
import { StaffModel } from 'src/app/shared/model/staff-model';
import { SubCategoryModel } from 'src/app/shared/model/sub-category-model';
import { VLessons } from 'src/app/shared/model/v-lessons';
import { ArtPackageService } from 'src/app/shared/services/art-package.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { CustomerLessonService } from 'src/app/shared/services/customer-lesson.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { StaffService } from 'src/app/shared/services/staff.service';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { daysEnum, participantEnum, PersonTypeEnum, TransactionTypeEnum } from 'src/environments/environment';
import { NgbDate, NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';
import { FilterResponseModel } from 'src/app/shared/model/filter-response-model';
import { UntypedFormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccountingTransactionService } from 'src/app/shared/services/accounting-transaction.service';
import { DayAndHoursModel } from 'src/app/shared/model/day-and-hours-model';
import { SellPackageCriteriaModel } from 'src/app/shared/model/sell-package-criteria-model';
import { CustomerLessonsTempService } from 'src/app/shared/services/customer-lessons-temp.service';
import { CustomerLessonsTemp } from 'src/app/shared/model/customer-lessons-temp';
import { AccountTransactionTempModel } from 'src/app/shared/model/account-transaction-temp-model';
import { CustomerLessonTempResourceModel } from 'src/app/shared/model/customer-lesson-temp-resource-model';
import { CustomerDayModel } from 'src/app/shared/model/customer-day-model';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { EducatorDaysHoursService } from 'src/app/shared/services/educator-days-hours.service';
import { EducatorDaysHoursModel } from 'src/app/shared/model/educator-days-hours-model';
declare let alertify: any;

export interface dayOf{
  dayIndex: number;
}

export interface GroupedListModel{
  resultIndex: number;
  classroom: string;
  title: string;
  classroomId: number;
  status: boolean;
}

WebGLContextEvent
@Component({
  selector: 'app-customer-package',
  templateUrl: './customer-package.component.html',
  styleUrls: ['./customer-package.component.css']
})
export class CustomerPackageComponent implements OnInit {

  @ViewChild('date')
  public Date: DatePickerComponent;
  public dateValue: Date = new Date();
  
  dayAndHours: DayAndHoursModel;
  selectedDays: DayAndHoursModel[] = [];
  criteriaModel: SellPackageCriteriaModel;
  customerLessonTempResource:CustomerLessonTempResourceModel;

  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public minDate: Date = new Date(this.fullYear, this.month , 7);
  public maxDate: Date = new Date(this.fullYear, this.month, 27);

  startDateModel: NgbDateStruct;

  time: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  timeLast: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  hourStep = 1;
  minuteStep = 15;
  secondStep = 30;

  //customerLesson: CustomerLesson;
  customerLesson: CustomerLessonsTemp;
  dayOfI: dayOf;
  criteria: CriteriaFilterModel;
  //customerLessons: CustomerLesson[];
  customerLessons: CustomerLessonsTemp[];
  customers: Customer[] = [];
  classrooms: ClassroomModel[] = [];
  lessons: VLessons[] = [];
  artPackages: ArtPackageModel[] = [];
  selectedPackage: ArtPackageModel;
  staffs: StaffModel[] = [];
  categories: CategoryModel[] = [];
  subCategories: SubCategoryModel[] = [];
  filterResponses: FilterResponseModel[] = [];
  filterDetailResponses: FilterResponseModel[] = [];
  pageOfItems: Array<any>;
  buttonText = Save;
  selectedCategoryId: number = 0;
  selectedSubCategoryId: number = 0;
  closedGroup: number =  participantEnum.closedGroup;
  personCount: number = 0;
  //selectedDays: dayOf[] = []; 
  dayList: daysEnum;
  groupedList: GroupedListModel[] = [];
  showDetail: boolean = false;
  selectedCustomerId: number = 0;
  //accountingTransaction: AccountingTransactionModel;
  accountingTransaction: AccountTransactionTempModel;
  selectedUnicKey: string = '';
  manuelPrice: boolean = false;
  authorized_price: number = 0;
  customerDayModel: CustomerDayModel;
  educatorDayHours: EducatorDaysHoursModel[] = [];
 

  public weekDays: daysEnum[] = [daysEnum.Pazartesi, daysEnum.Sali, daysEnum.Carsamba, daysEnum.Persembe, daysEnum.Cuma, daysEnum.Cumartesi, daysEnum.Pazar];
  public dayLabels = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

  public customerCtrl: UntypedFormControl = new UntypedFormControl();
  public customerFilterCtrl: UntypedFormControl = new UntypedFormControl();
  public filteredCustomers: ReplaySubject<Customer[]> = new ReplaySubject(1);

  
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  
  protected _onDestroy = new Subject();


  constructor(private service: CustomerLessonService, private classroomService: ClassroomService,
    private packageService: ArtPackageService, private customerService: CustomerService,
    private staffService: StaffService, private categoryService: CategoryService,
    private subCategoryService: SubCategoryService, private lessonService: LessonService,
    private router: Router, private accountingService: AccountingTransactionService,
    private tempService: CustomerLessonsTempService, private educatorDayHourService: EducatorDaysHoursService
    ) {
     }

  ngOnInit() {
    this.customerLesson = {
      artPackageId: 0,
      classroomId: 0,
      createdAt: new Date(),
      createdBy: 0,
      educatorId: 0,
      finishDate: new Date(),
      id: 0,
      isDone: false,
      startDate: new Date(),
      categoryId: 0,
      subCategoryId: 0,
      lessonId: 0,
      unicStrId: '',
      unicKey: ''
    };

    this.selectedPackage = {
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
    };
    this.accountingTransaction = {
      balance: 0,
      claim: 0,
      createdAt: new Date(),
      createdBy: 0,
      debt: 0,
      id: 0,
      relatingId: '',
      transactionType: 0,
      unicKey: '',
      personType: 0
    };

    this.dayOfI = {
      dayIndex: 0
    };

    this.criteria = {
      days: [],
      lessonId: 0,
      packageId: 0,
      packetHour: '',
      startDate: null,
      finishDate: null
    };

    this.criteriaModel = {
      dayAndHourList: [],
      lessonId: 0,
      packageId: 0,
      startTime: new Date(),
      educatorId: 0,
      customerId: 0
    };

    this.customerLessonTempResource = {
      customerLessonsTemps: [],
      days: []
    };
    this.customerDayModel = {
      basicInfoId: 0,
      customerId: 0,
      daysArray: '',
      id: 0,
      uniqKey: ''
    };
    
    this.getCustomers();
    this.getClassrooms();
    this.getCategories();
  }

  onDateChange(){
    this.dateValue = this.Date.value;
    console.log(this.dateValue);
  }

  onStartDateSelection(date: NgbDate){
    this.criteria.startDate = date.day.toLocaleString()+'/'+
    date.month.toLocaleString()+'/'+date.year.toLocaleString().replace('.','');
  }

  onStartTimeSelection(time: NgbTime){
    const timeStr = time.hour.toLocaleString()+':'+time.minute.toLocaleString();
    this.criteria.startDate = this.criteria.startDate+' '+timeStr;
  }

  getEducatorDayHours(id: number){
    this.educatorDayHourService.getByEducator(id).subscribe((data)=>{
      if(data.success){
        this.educatorDayHours = data.dynamicClass as EducatorDaysHoursModel[];
      }
    })
  }

  sendCriteria(){
    this.selectedDays.forEach(element => {
      const startDateTime = (<HTMLInputElement>document.getElementById(element.day+'-firstTime')).value;
      const finisDateTime = (<HTMLInputElement>document.getElementById(element.day+'-finishTime')).value;
      element.dayFinishTime = finisDateTime;
      element.dayStartTime = startDateTime;
    });
    this.criteriaModel.dayAndHourList = this.selectedDays;
    this.criteriaModel.lessonId = this.customerLesson.lessonId;
    this.criteriaModel.packageId = this.customerLesson.artPackageId;
    this.criteriaModel.educatorId = this.customerLesson.educatorId;
    this.criteriaModel.startTime = new Date(this.dateValue.getFullYear(), this.dateValue.getMonth(), this.dateValue.getDate(),this.time.hour, this.time.minute, 0, 0);
    //this.criteriaModel.finishDate = new Date(this.dateValue.getFullYear(), this.dateValue.getMonth(), this.dateValue.getDate(),this.timeLast.hour, this.time.minute, 0, 0);
    /*this.criteria.startDate = new Date(this.startDateModel.year.toString()+'-'+this.startDateModel.month.toString()+"-"+this.startDateModel.day.toString()+
  ' '+this.time.hour.toLocaleString()+':'+this.time.minute.toLocaleString());*/
  /*this.criteria.finishDate = new Date(this.startDateModel.year.toString()+'-'+this.startDateModel.month.toString()+"-"+this.startDateModel.day.toString()+
  ' '+this.timeLast.hour.toLocaleString()+':'+this.timeLast.minute.toLocaleString());*/

    let counter = 0;
    let closedClassroomId = 0;
    this.service.listByFilterActualMultiTimeForAdd(this.criteriaModel).subscribe((data)=>{
      if(data.success){
        this.groupedList = [];
        this.filterResponses = data.dynamicClass as FilterResponseModel[];
        //this.selectedDays = this.filterResponses[0].resultDaysAndHours;
        this.filterResponses.forEach(element => {
          //kayit icin dizi olustur
          
          const list = this.groupedList.filter(i=>i.classroom === element.classroomName);
          if(list.length == 0 || this.groupedList.length == 0){
            if(element.isClosed){
              const model: GroupedListModel = {
                resultIndex: counter,
                title: `${element.description} - ${element.lessonName}`,
                classroom: element.classroomName,
                classroomId: element.classroomId,
                status: element.isClosed
               };
               closedClassroomId = element.classroomId;
               this.groupedList.push(model);
            }else{
              const model: GroupedListModel = {
                resultIndex: counter,
                title: `${element.classroomName} - ${element.lessonName} (${element.priority}. Öncelikli) Dersin Kontenjan Durumu = 
                ${element.customerCount+'/'+element.lessonCapacity}
                Sınıfın Kontenjan Durumu = ${element.customerCount+'/'+element.classroomCapacity} (${element.reason}))`,
                classroom: element.classroomName,
                classroomId: element.classroomId,
                status: element.isClosed
               };
  
               this.groupedList.push(model);
            }
            
             counter++;
          } 
        });
        if(closedClassroomId !== 0){
          this.groupedList.forEach(element => {
            if(element.classroomId == closedClassroomId){
              element.status = true;
            }
          });
        }
      }});

    /*this.filterDetailResponses = [];
    //this.criteria.days = this.selectedDays;
    this.criteria.lessonId = this.customerLesson.lessonId;
    this.criteria.packageId = this.customerLesson.artPackageId;
    this.criteria.startDate = new Date(this.startDateModel.year.toString()+'-'+this.startDateModel.month.toString()+"-"+this.startDateModel.day.toString()+
  ' '+this.time.hour.toLocaleString()+':'+this.time.minute.toLocaleString());
  this.criteria.finishDate = new Date(this.startDateModel.year.toString()+'-'+this.startDateModel.month.toString()+"-"+this.startDateModel.day.toString()+
  ' '+this.timeLast.hour.toLocaleString()+':'+this.timeLast.minute.toLocaleString());
    let counter = 0;
    this.service.getListByFilter(this.criteria).subscribe((data)=>{
      if(data.success){
        this.groupedList = [];
        this.filterResponses = data.dynamicClass as FilterResponseModel[];
        this.filterResponses.forEach(element => {
          //kayit icin dizi olustur
          const list = this.groupedList.filter(i=>i.classroom === element.classroomName);
          if(list.length == 0 || this.groupedList.length == 0){
            if(element.isClosed){
              const model: GroupedListModel = {
                resultIndex: counter,
                title: `${element.description} - ${element.lessonName}`,
                classroom: element.classroomName,
                classroomId: element.classroomId,
                status: element.isClosed
               };
  
               this.groupedList.push(model);
               console.log(model);
            }else{
              const model: GroupedListModel = {
                resultIndex: counter,
                title: `${element.classroomName} - ${element.lessonName} (${element.priority}. Öncelikli) Dersin Kontenjan Durumu = 
                ${element.customerCount+'/'+element.lessonCapacity}
                Sınıfın Kontenjan Durumu = ${element.customerCount+'/'+element.classroomCapacity} (${element.reason}))`,
                classroom: element.classroomName,
                classroomId: element.classroomId,
                status: element.isClosed
               };
  
               this.groupedList.push(model);
               console.log(model);
            }
             counter++;
          } 
        });

      }
    });*/
  }

  ngAfterViewInit() {
    this.setInitialValue();                                                                                                                                                                                                                                                                                   
  }

  protected setInitialValue() {
    this.filteredCustomers
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
          this.singleSelect.compareWith = (a: Customer, b: Customer) => a && b && a.id === b.id;
      });
  }

  openDetail(classroomId: number){
    this.customerLessons = [];
    this.filterDetailResponses = this.filterResponses.filter(i=>i.classroomId == classroomId);
    this.filterDetailResponses.forEach(element => {
      this.selectedUnicKey = element.unicKey;
      this.customerLesson = {
        artPackageId:parseInt(this.criteriaModel.packageId.toString()),
        categoryId: parseInt(this.selectedCategoryId.toString()),
        classroomId: parseInt(element.classroomId.toString()),
        createdAt: new Date(),
        createdBy: 0,
       // customerId: parseInt(this.selectedCustomerId.toString()), 
        finishDate: element.lessonFinish,
        id: 0,
        isDone: false,
        lessonId: parseInt(this.criteriaModel.lessonId.toString()),
        startDate: element.lessonStart,
        subCategoryId: parseInt(this.selectedSubCategoryId.toString()),
        educatorId: parseInt(this.customerLesson.educatorId.toString()),
        unicStrId: element.unicKey,
        unicKey: element.unicKey,
      };
  
      this.customerLessons.push(this.customerLesson);
    });
    
  }


  categoryOnChange(id) {
    this.selectedCategoryId = parseInt(id);
    this.getSubCategories(this.selectedCategoryId);
  }

  subCategoryOnChange(id) {
    this.selectedSubCategoryId = parseInt(id);
    this.getLessons(this.selectedCategoryId, this.selectedSubCategoryId);
  }

  lessonOnChange(id) {
    this.getPackages(parseInt(id));
    this.getStaffs(parseInt(id));
  }

  packageOnChange(id) {
    this.getPackageDetail(parseInt(id));
  }

  dayOnChange(id) {
    const day: dayOf = {
      dayIndex: parseInt(id)
    }
    if(this.selectedDays.filter(i=>i.day == day.dayIndex).length == 0){
      const dayAndHoursVal: DayAndHoursModel = {
        day: day.dayIndex,
        dayFinishTime: '00:00',
        dayStartTime: '00:00'
      };
      this.selectedDays.push(dayAndHoursVal);
    }else{
      alert(this.dayLabels[day.dayIndex]+' zaten seçilmiş');
    }
    /*if(!this.selectedDays.includes(day)){
      if(parseInt(id)!==-1){
        this.selectedDays.push(day);
      }
      
    }else{
      if(parseInt(id)!==-1){
        alert(this.dayLabels[day.dayIndex]+' zaten seçilmiş');
      }
    }*/
  }

  removeDayFromList(id){
    const temp = this.selectedDays.filter(i=>i.day != parseInt(id));
    console.log(temp);
    this.selectedDays = temp;
  }

  protected filterCustomers(){
    let search = this.customerFilterCtrl.value;
    if(!search){
      this.filteredCustomers.next(this.customers.slice());
      return
    }else{
      search = search.toLowerCase();
    }

    this.filteredCustomers.next(
      this.customers.filter(i=>i.name.toLocaleLowerCase().indexOf(search) > -1)
    );
  }

  getCustomers(){
    this.customerService.getList().subscribe((data)=>{
      if(data.success){
        this.customers = data.dynamicClass as Customer[];
        this.customerCtrl.setValue(this.customers[1]);
        this.filteredCustomers.next(this.customers.slice());
      
        this.customerFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterCustomers();
          });
        }
    })
  }

  getPackageDetail(id: number){
    this.packageService.getDetails(id).subscribe((data)=>{
      if(data.success){
        this.selectedPackage = data.dynamicClass as ArtPackageModel;
        
      }
    })
  }

  getLessons(categoryId: number, subCategoryId: number){
    this.lessonService.getByCategory(categoryId, subCategoryId).subscribe((data)=>{
      if(data.success){
        this.lessons = data.dynamicClass as VLessons[];
      }
    })
  }

  getClassrooms(){
    this.classroomService.getList().subscribe((data)=>{
      if(data.success){
        this.classrooms = data.dynamicClass as ClassroomModel[];
      }
    })
  }

  getCategories(){
    this.categoryService.getList().subscribe((data)=>{
      if(data.success){
        this.categories = data.dynamicClass as CategoryModel[];
      }
    })
  }

  getSubCategories(categoryId: number){
    this.subCategoryService.getList(categoryId).subscribe((data)=>{
      if(data.success){
        this.subCategories = data.dynamicClass as SubCategoryModel[];
      }
    })
  }

  getPackages(lessonId: number){
    this.packageService.getListByLesson(lessonId).subscribe((data)=>{
      if(data.success){
        this.artPackages = data.dynamicClass as ArtPackageModel[];
      }
    })
  }

  getStaffs(lessonId: number){
    this.staffService.getTeachersByLesson(lessonId).subscribe((data)=>{
      if(data.success){
        this.staffs = data.dynamicClass as StaffModel[];
      }
    })
  }

  getList() {
    this.service.getList().subscribe((data) => {
      this.customerLessons = data.dynamicClass as CustomerLessonsTemp[];
      this.pageOfItems = this.customerLessons;
    })
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.customerLesson = resource;
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
    if (this.customerLesson.id == 0) {
      this.tempService.addRange(this.customerLessons).subscribe((data) => {
        if (data.success) {
          const lessons = data.dynamicClass as CustomerLessonsTemp[];

          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
          let price = this.selectedPackage.seancePrice;
          if(this.authorized_price != 0){
            price = this.authorized_price;
          }
          this.accountingTransaction = {
            balance: 0,
            claim: 0,
            createdAt: new Date(),
            createdBy: 0,
            debt: price,
            id: 0,
            relatingId: this.selectedUnicKey,
            transactionType: TransactionTypeEnum.PaketSatis,
            unicKey: lessons[0].unicStrId,
            personType: PersonTypeEnum.Customer
          };
          const days = [];

          this.selectedDays.forEach(element => {
            if(!days.includes(element.day)){
              days.push(element.day);
            }
          });

          console.log(days.toLocaleString());
          this.customerDayModel = {
            basicInfoId: 0,
            customerId: 0,
            daysArray: days.toLocaleString(),
            id: 0,
            uniqKey: this.accountingTransaction.unicKey
          };

          this.tempService.addCustomerDay(this.customerDayModel).subscribe((data)=>{
            if(data.success){
              console.log(data);
            }
          })
          
          this.accountingService.addTemp(this.accountingTransaction).subscribe((data)=>{
            if(data.success){
              this.groupedList = [];
              this.filterDetailResponses = [];
              this.router.navigate(['musteriler']);
            }
          });
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
