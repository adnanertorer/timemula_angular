import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AccountTransactionTempModel } from '../model/account-transaction-temp-model';
import { AccountingTransactionModel } from '../model/accounting-transaction-model';
import { BaseResponse } from '../model/BaseResponse';
import { FilterAccountingModel } from '../model/filter-accounting-model';

@Injectable({
  providedIn: 'root'
})
export class AccountingTransactionService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/AccountingTransaction/List`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getSales(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/AccountingTransaction/GetSales`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getCutomerDepts(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/AccountingTransaction/GetCustomerDepts`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getCutomerDeptGeneral(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/AccountingTransaction/GetGeneralCustomerBalance`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getMyDepts(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/AccountingTransaction/GetMyDepts`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getCustomerDeptDetail(customerId: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/AccountingTransaction/GetCustomerDeptDetail/?customerId=${customerId.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: AccountingTransactionModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/AccountingTransaction/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  addTemp(resource: AccountTransactionTempModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/AccountingTransaction/AddTemp`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getByFilter(resource: FilterAccountingModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/AccountingTransaction/GetByFilter`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: AccountingTransactionModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/AccountingTransaction/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}Clasroom/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}Clasroom/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
