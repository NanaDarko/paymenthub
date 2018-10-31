import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {Bank} from './Models/bank';
import { ApproverType} from './Models/approver-type';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  constructor(private client:HttpClient,private _accountService: AccountService, private _router:Router) { }
  
  //***************************** Bank Setup ******************************
  getBanksAsync(){
    return this.client.get<Bank[]>(this._accountService._baseUrl + "banks")
    .pipe(catchError(this._accountService.errorHandler))
  }

  postBankAsync(model){
    return this.client.post<any>(this._accountService._baseUrl + "banks", model)
    .pipe(catchError(this._accountService.errorHandler))
  }

  putBankAsync(model){
    return this.client.put<any>(this._accountService._baseUrl + "banks/" + model.id, model)
    .pipe(catchError(this._accountService.errorHandler))
  }

  deleteBankAsync(Id){
    return this.client.delete<any>(this._accountService._baseUrl + "banks?id=" + Id)
    .pipe(catchError(this._accountService.errorHandler))
  }

  //***************************** End Bank Setup ******************************


  //***************************** Approver-Type Setup ******************************
  getApproverTypesAsync(){
    return this.client.get<ApproverType[]>(this._accountService._baseUrl + "Approvaltypes")
    .pipe(catchError(this._accountService.errorHandler))
  }

  getApproverTypeAsync(Id){
    return this.client.get<ApproverType>(this._accountService._baseUrl + "Approvaltypes/" + Id)
    .pipe(catchError(this._accountService.errorHandler))
  }

  postApproverTypeAsync(model){
    return this.client.post<any>(this._accountService._baseUrl + "Approvaltypes", model)
    .pipe(catchError(this._accountService.errorHandler))
  }

  putApproverTypeAsync(model){
    return this.client.put<any>(this._accountService._baseUrl + "Approvaltypes/" + model.id, model)
    .pipe(catchError(this._accountService.errorHandler))
  }

  deleteApproverTypeAsync(Id){
    return this.client.delete<any>(this._accountService._baseUrl + "Approvaltypes?id=" + Id)
    .pipe(catchError(this._accountService.errorHandler))
  }

  //***************************** End Approver-Type Setup ******************************
}
