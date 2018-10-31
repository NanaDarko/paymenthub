import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import {AccountService} from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  
  constructor(private _router: Router, private _accountService: AccountService){}

  canActivate(): boolean {
    if (this._accountService.loggedIn()) {
      return true
    } else {
      this._router.navigate(['/login'])
      return false
    }
  }
}
