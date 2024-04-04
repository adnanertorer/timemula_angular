import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared';
import { RegisterCompanyModel } from 'src/app/shared/model/register-company-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit{

  model: RegisterCompanyModel;
  passwordAgain: string = "";
  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.model = {
      companyAddress: '',
      companyName: '',
      companyPhone: '',
      email: '',
      name: '',
      password: '',
      surname: ''
    };
  }

  register(){
    if(this.model.password === this.passwordAgain){
      this.service.registerCompany(this.model).subscribe(res => {
        if(res.success){
          this.router.navigate(['/login']);
        }
      });
    }else{
      alert("Parolalar uyuşmuyor");
    }

    
  }



}
