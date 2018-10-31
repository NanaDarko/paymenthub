import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: []
})
export class ChangePasswordComponent implements OnInit {

  userData = {}
  errorMsg = '';
  errorFlag = false;

  constructor(private _accountService: AccountService, private _router: Router) { }
  
  onSubmit() {
    this._accountService.changePasswordAsync(this.userData)
      .subscribe(
        data => {
          localStorage.removeItem('token_Ghipps');
          localStorage.removeItem('name_Ghipps');
          localStorage.removeItem('role_Ghipps');
          this._router.navigate(['/login']);
        },
        error => {
          this.errorMsg = error;
          this.errorFlag = true;
        }
      );
  }


  resetErrorFlag(){
    this.errorFlag = false;
    this.errorMsg = '';
  }


  ngOnInit() {
  }

}
