import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared';
import { BaseResponse } from 'src/app/shared/model/BaseResponse';
import { TokenModel } from 'src/app/shared/model/TokenModel';
import { RegisterCompanyModel } from 'src/app/shared/model/register-company-model';

@Component({
  selector: 'app-register-main',
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
          const response = res as BaseResponse;
          const tokenModel = response.dynamicClass as TokenModel;

          this.service._user.next({
            email: this.model.email,
            accessToken: tokenModel.token,
            fullName: this.model.name+' '+this.model.surname,
            password: '',
            refreshToken: ''
          });

          this.service.setLocalStorage(tokenModel);
          this.service.startTokenTimer();
          this.router.navigate(['form']);
        }
      });
    }else{
      alert("Parolalar uyuşmuyor");
    }
  }
}
