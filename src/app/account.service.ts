import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {throwError as observableThrowError} from 'rxjs';
import { Router } from '@angular/router';
import { Role } from './Models/role';
import { UserInfo } from './Models/userInfo';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private client:HttpClient, private _router:Router) { }
  
  public _baseUrl = "http://52.91.63.84:13158/api/";

  login(model){
    return this.client.post<any>(this._baseUrl + "account/login", model)
    .pipe(catchError(this.errorHandler))
  }

  register(model){
    return this.client.post<any>(this._baseUrl + "account/Register", model)
    .pipe(catchError(this.errorHandler));
  };

  changePasswordAsync(model){
    return this.client.post<any>(this._baseUrl + "account/ChangePassword", model)
    .pipe(catchError(this.errorHandler));
  };

  getUserInfoAsync(userName){
    return this.client.get<UserInfo>(this._baseUrl + "account/UserInfo/" + userName)
    .pipe(catchError(this.errorHandler));
  };

  getRolesAsync(){
    return this.client.get<Role[]>(this._baseUrl + "roles")
    .pipe(catchError(this.errorHandler));
  };

  assignApproverTypeAsync(username: string, typeId: string){
    return this.client.get<any>(this._baseUrl + "account/AddApprovalsType/" + username + "/" + typeId)
    .pipe(catchError(this.errorHandler));
  }

  assignRoleAsync(userId: string, role: string){
    let rolesArray:string[] = [role];
    return this.client.put<any>(this._baseUrl + "account/" + userId + "/roles", rolesArray)
    .pipe(catchError(this.errorHandler));
  }


  logout() {
    localStorage.removeItem('token_Ghipps');
    localStorage.removeItem('name_Ghipps');
    localStorage.removeItem('role_Ghipps');
    localStorage.removeItem('limit_Ghipps');
    this._router.navigate(['/login']);
  };

  getToken() {
    return localStorage.getItem('token_Ghipps')
  };

  getUserName() {
    return localStorage.getItem('name_Ghipps')
  };

  loggedIn() {
    return !!(localStorage.getItem('token_Ghipps') &&  localStorage.getItem('name_Ghipps') &&  localStorage.getItem('role_Ghipps'))
  };

  IsAdmin(){
    return !!(localStorage.getItem('role_Ghipps') === "Admin");
  }

  IsApprover(){
    return !!(localStorage.getItem('role_Ghipps') === "Approver");
  }
  
  /* errorHandler(error: HttpErrorResponse){
      if (error.status === 401) {
        localStorage.removeItem('token_Ghipps');
        localStorage.removeItem('name_Ghipps');
        localStorage.removeItem('role_Ghipps');
        localStorage.removeItem('limit_Ghipps');
        this._router.navigate(['/login']);
      }
      else if( error instanceof ErrorEvent ) {
        return observableThrowError(error.message || "System Error! Try again later...");
      }
      else {
        return observableThrowError("Server Error! Try again later...");
      }
  } */

  errorHandler(error: HttpErrorResponse){
    if (error.status === 401) {
      localStorage.removeItem('token_Ghipps');
      localStorage.removeItem('name_Ghipps');
      localStorage.removeItem('role_Ghipps');
      localStorage.removeItem('limit_Ghipps');
      this._router.navigate(['/login']);
    }
    else {
      return observableThrowError(error);
    }
}
}
