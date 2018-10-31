import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Contact } from './Models/contact';
import { AccountService } from './account.service';
import { C_Type } from './Models/contact-type';
import { BehaviorSubject } from 'rxjs';
import { Batch } from './Models/batch';
import { BatchTransaction } from './Models/batchTransaction';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  constructor(private client:HttpClient,private _accountService:AccountService, private _router:Router) { }
  
  


  //***************************** Contacts ******************************
  private receivedContact = new BehaviorSubject<Contact>(name);
  currentContact = this.receivedContact.asObservable();

  setContact(object: Contact) {
    this.receivedContact.next(object);
  }


  getContactsAsync(){
    return this.client.get<Contact[]>(this._accountService._baseUrl + "contacts")
    .pipe(catchError(this._accountService.errorHandler))
  }

  getContactAsync(Id){
    return this.client.get<Contact>(this._accountService._baseUrl + "contacts/" + Id)
    .pipe(catchError(this._accountService.errorHandler))
  }

  putContactAsync(model){
    return this.client.put<any>(this._accountService._baseUrl + "contacts/" + model.id, model)
    .pipe(catchError(this._accountService.errorHandler))
  }

  postContactAsync(model){
    return this.client.post<any>(this._accountService._baseUrl + "contacts", model)
    .pipe(catchError(this._accountService.errorHandler))
  }


  deleteContactAsync(Id){
    return this.client.delete<any>(this._accountService._baseUrl + "contacts?id=" + Id)
    .pipe(catchError(this._accountService.errorHandler))
  }

  //***************************** End Contacts ******************************


  //***************************** Contact Types ******************************
  getContactTypesAsync(){
    return this.client.get<C_Type[]>(this._accountService._baseUrl + "contacttypes")
    .pipe(catchError(this._accountService.errorHandler))
  }

  //***************************** End Contact Types ******************************


  //***************************** Batches ******************************
  private receivedBatch = new BehaviorSubject<Batch>(name);
  currentBatch = this.receivedBatch.asObservable();

  setBatch(object: Batch) {
    this.receivedBatch.next(object);
  }


  getBatchByNameAsync(Name){
    return this.client.get<Batch[]>(this._accountService._baseUrl + "batches/search?query=" + Name)
    .pipe(catchError(this._accountService.errorHandler))
  }


  getBatchAsync(Id){
    return this.client.get<Batch>(this._accountService._baseUrl + "batches/" + Id)
    .pipe(catchError(this._accountService.errorHandler))
  }


  postBatchAsync(model){
    return this.client.post<any>(this._accountService._baseUrl + "batches", model)
    .pipe(catchError(this._accountService.errorHandler))
  }


  getBatchesAsync(){
    return this.client.get<Batch[]>(this._accountService._baseUrl + "batches")
    .pipe(catchError(this._accountService.errorHandler))
  }


  getUnAuthorizedBatchesAsync(){
    return this.client.get<Batch[]>(this._accountService._baseUrl + "batches/unapproved")
    .pipe(catchError(this._accountService.errorHandler))
  }


  putBatchAsync(model){
    return this.client.put<any>(this._accountService._baseUrl + "batches/" + model.id, model)
    .pipe(catchError(this._accountService.errorHandler))
  }


  deleteBatchAsync(Id){
    return this.client.delete<any>(this._accountService._baseUrl + "batches?id=" + Id)
    .pipe(catchError(this._accountService.errorHandler))
  }
  //***************************** End Batches ******************************


  //***************************** Batch Transaction ******************************
  getBatchTransactionsAsync(batchId){
    return this.client.get<BatchTransaction[]>(this._accountService._baseUrl + "batchtransactions/batch/" + batchId)
    .pipe(catchError(this._accountService.errorHandler))
  }

  postBatchTransactionAsync(model){
    return this.client.post<any>(this._accountService._baseUrl + "batchtransactions", model)
    .pipe(catchError(this._accountService.errorHandler))
  }

  deleteBatchTransactionAsync(Id){
    return this.client.delete<any>(this._accountService._baseUrl + "batchtransactions?id=" + Id)
    .pipe(catchError(this._accountService.errorHandler))
  }
  //***************************** End Batch Transaction ******************************




  
   //***************************** Approval ******************************
   postApprovalAsync(model){
    return this.client.post<any>(this._accountService._baseUrl + "Approvals", model)
    .pipe(catchError(this._accountService.errorHandler))
  }
  //***************************** End Approval ******************************

}
