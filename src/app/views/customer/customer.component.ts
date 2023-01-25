import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { BloodGroupModel } from 'src/app/shared/model/blood-group-model';
import { CustomerFilter } from 'src/app/shared/model/customer-filter';
import { GenderModel } from 'src/app/shared/model/gender-model';
import { ParentTypeModel } from 'src/app/shared/model/parent-type-model';
import { SearchResourceModel } from 'src/app/shared/model/search-resource-model';
import { VCustomer } from 'src/app/shared/model/v-customer';
import { BloodGroupService } from 'src/app/shared/services/blood-group.service';
import { ParentTypeService } from 'src/app/shared/services/parent-type.service';
import { SearchResourceService } from 'src/app/shared/services/search-resource.service';
import { Customer } from '../../shared/model/customer';
import { CustomerService } from '../../shared/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @ViewChild('date')
  public Date: DatePickerComponent;
  public dateValue: Date = new Date();

  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public minDate: Date = new Date(this.fullYear, this.month , 7);
  public maxDate: Date = new Date(this.fullYear, this.month, 27);

  startDateModel: NgbDateStruct;

  customer: Customer;
  customerList: VCustomer[] = [];
  bloodGroups: BloodGroupModel[] = [];
  searchServices: SearchResourceModel[] = [];
  parentTypes: ParentTypeModel[] = [];
  genders: GenderModel[] = [];
  buttonText = 'Kaydet';
  form: UntypedFormGroup;
  customerFilter: CustomerFilter;
  isNewRecord: boolean = false;
  isVisibleAddButton = true;
  isReset = false;

  displayedColumns: string[] = ['citizenIdentityNumber', 'name', 'gsm',
  'email', 'birthDate', 'blood_group_name', 'isChild', 'isActive', 'id'];
  dataSource: MatTableDataSource<VCustomer>;
  @ViewChild('customerPaginator') paginator: MatPaginator;
  @ViewChild('customerSort') sort: MatSort;

  constructor(private service: CustomerService, private bloodGroupService: BloodGroupService,
    private serviceSearch: SearchResourceService, private formBuilder: UntypedFormBuilder, private parentTypeService: ParentTypeService,
    private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.isReset = false;
    this.isVisibleAddButton = true;
    this.isNewRecord = false;
    this.customerFilter = {
      address: '',
<<<<<<< Updated upstream
      isAdult: 0,
      gender: 0,
=======
      child: 0,
>>>>>>> Stashed changes
      name: '',
      surname: '',
      identityNumber: ''
    };

    this.customer = {
      address: '',
      birthDate: new Date(), //
      birthPlace: '', //
      bloodGroupId: 0, //
      citizenIdentityNumber: '', //
      disease: '',
      email: '', //
      emailRequest: true,//
      facebookAddress: '',//
      facebookParentAddress: '',//
      gender: 0, //
      gsm: '', //
      id: 0, //
      instagramAddress: '',//
      instagramParentAddress: '', //
      isActive: true,//
      isChild: false,//
      linkedinAddress: '',//
      linkedinParentAddress: '',
      name: '', //
      parentEmail: '', //
      parentIdentity: '',//
      parentName: '', //
      parentProf: '', //
      parentSurname: '', //
      parentTypeId: 0,
      password: '',
      phone: '', //
      searchResourceId: 0,//
      smsRequest: false,//
      surname: ''//
    };
    //246adf92d70bd32e9cb4963b720132874b75c173

    

    this.form = new UntypedFormGroup({
      'address': new UntypedFormControl(this.customer.address, Validators.required),
      'birthDate': new UntypedFormControl(this.customer.birthDate, Validators.required),
      'birthPlace': new UntypedFormControl(this.customer.birthPlace, Validators.required),
      'bloodGroupId': new UntypedFormControl(this.customer.bloodGroupId, Validators.required),
      'citizenIdentityNumber': new UntypedFormControl(this.customer.citizenIdentityNumber,[Validators.required, Validators.max(99999999999), Validators.min(11111111111)]),
       'name': new UntypedFormControl(this.customer.name, Validators.required),
      'disease':  new UntypedFormControl(this.customer.disease, null),
      'email':  new UntypedFormControl(this.customer.email,[Validators.required, Validators.email
        ,Validators.maxLength(50)]),
      //'emailRequest':new FormControl(this.customer.emailRequest, Validators.required),
      'facebookAddress': new UntypedFormControl(this.customer.facebookAddress, null),
      'facebookParentAddress': new UntypedFormControl(this.customer.facebookAddress, null),
      'gender': new UntypedFormControl(this.customer.gender, Validators.required),
      'gsm': new UntypedFormControl(this.customer.gsm, [Validators.required, Validators.maxLength(20)]),
      'id': new UntypedFormControl(this.customer.id, null),
      'instagramAddress': new UntypedFormControl(this.customer.instagramAddress, null),
      'instagramParentAddress': new UntypedFormControl(this.customer.instagramParentAddress, null),
    //  'isActive': new FormControl(this.customer.isActive, Validators.required),
      'isChild': new UntypedFormControl(this.customer.isActive, Validators.required),
      'linkedinAddress': new UntypedFormControl(this.customer.linkedinAddress, null),
      'linkedinParentAddress': new UntypedFormControl(this.customer.linkedinParentAddress, null),
      'parentEmail': new UntypedFormControl(this.customer.parentEmail, Validators.email),
      'parentIdentity': new UntypedFormControl(this.customer.parentIdentity, [Validators.required,  Validators.max(99999999999), Validators.min(11111111111)]),
      'parentName': new UntypedFormControl(this.customer.parentName, [Validators.required, Validators.maxLength(50)]),
      'parentProf': new UntypedFormControl(this.customer.parentProf, null),
      'parentSurname': new UntypedFormControl(this.customer.parentSurname, [Validators.required, Validators.maxLength(50)]),
      'parentTypeId': new UntypedFormControl(this.customer.parentTypeId, Validators.required),
      'phone':  new UntypedFormControl(this.customer.phone, null),
      'searchResourceId': new UntypedFormControl(this.customer.searchResourceId, Validators.required),
      //'smsRequest': new FormControl(this.customer.smsRequest, Validators.required),
      'surname': new UntypedFormControl(this.customer.surname, [Validators.required, Validators.maxLength(50)]),
      'password': new UntypedFormControl(this.customer.password, [Validators.required, Validators.maxLength(20)]),
    });

    this.getList();
    this.getGenders();
    this.getBloodGroups();
    this.getSearchResources();
    this.getParentTypes();
  }

  onDateChange(){
    this.dateValue = this.Date.value;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  
  getDetail(val) {
    this.router.navigate([]).then(result => { window.open(`musteriler/detay/${val}`, '_self'); });
  }

  getServices(val) {
    this.router.navigate(['musteri-hizmetleri/paketler.html/', val]);
  }

  getHealts(val) {
    this.router.navigate(['genel-tanimlar/musteri-saglik-bilgileri.html/', val]);
  }

  openNewRecord(){
    this.isVisibleAddButton = false;
    this.isNewRecord = true;
    this.isReset = true;
  }

  getDateErrorMessage(pickerInput: string): string {
    if (!pickerInput || pickerInput === '' ) {
      return 'Lütfen bir tarih seçiniz';
    }
  }

  getGenders(){
    this.service.genders().subscribe((data)=>{
      if(data.success){
        this.genders = data.dynamicClass as GenderModel[];
      }
    })
  }

  getBloodGroups(){
    this.bloodGroupService.getList().subscribe((data) => {
      if (data.success){
        this.bloodGroups = data.dynamicClass as BloodGroupModel[];
      }
    });
  }

  getSearchResources(){
    this.serviceSearch.getList().subscribe((data) => {
      if (data.success){
        this.searchServices = data.dynamicClass as SearchResourceModel[];
      }
    });
  }

  getParentTypes(){
    this.parentTypeService.getActiveList().subscribe((data) => {
      if (data.success){
        this.parentTypes = data.dynamicClass as ParentTypeModel[];
      }
    });
  }

  // tslint:disable-next-line: typedef
  getList(){
    this.service.getList().subscribe((data) => {
      if (data.success){
        this.customerList = data.dynamicClass as VCustomer[];
        this.dataSource = new MatTableDataSource(this.customerList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  getWithFilter(){
    this.service.getListWithFilter(this.customerFilter).subscribe((data) => {
      if (data.success){
        this.customerList = data.dynamicClass as VCustomer[];
        this.dataSource = new MatTableDataSource(this.customerList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  resetForm(){
    this.ngOnInit();
  }

  getDetailFromTable(resource: any): void {
    this.openNewRecord();
    var id = parseInt(resource.id);
    this.service.getDetails(id).subscribe((data)=>{
      if(data.success){
        this.customer = data.dynamicClass as Customer;
        this.buttonText = 'Güncelle';
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    })
   
  }

  add(): void {
    console.log(this.customer);
    if (this.customer.id === 0){
      // tslint:disable-next-line: radix
      this.customer.bloodGroupId = parseInt(this.customer.bloodGroupId.toString());
      // tslint:disable-next-line: radix
      this.customer.parentTypeId = parseInt(this.customer.parentTypeId.toString());
      // tslint:disable-next-line: radix
      this.customer.searchResourceId = parseInt(this.customer.searchResourceId.toString());
      this.customer.citizenIdentityNumber = this.customer.citizenIdentityNumber.toString();
      this.customer.parentIdentity = this.customer.parentIdentity.toString();
      this.customer.birthDate = new Date(this.dateValue.getFullYear(), this.dateValue.getMonth(), this.dateValue.getDate(), 0, 0, 0, 0);
      this.service.add(this.customer).subscribe((data) => {
        if (data.success){
          alert(data.clientMessage);
          this.ngOnInit();
        }else{
          alert(data.clientMessage);
        }
      }, (err) => {
        alert(err);
      });
    }else{
      this.service.update(this.customer).subscribe((data) => {
        if (data.success){
          alert(data.clientMessage);
          this.ngOnInit();
        }else{
          alert(data.clientMessage);
        }
      });
    }
  }

  remove(id: number): void {
    this.service.remove(id).subscribe((data) => {
       if (data.success){
         alert(data.clientMessage);
         this.ngOnInit();
       }else{
         alert(data.clientMessage);
       }
     });
   }

   reset(): void {
    this.buttonText = 'Kaydet';
    this.ngOnInit();
   }

   parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }
}
