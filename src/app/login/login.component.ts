import { Component, OnInit, InjectionToken } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { Itoken } from '../Models/Itoken';
import { SetupService } from '../setup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private _setupService: SetupService, private _accountService: AccountService, private _router: Router) { }

  userData = {}
  public errorMsg;
  response = new Itoken();
  errorFlag = false;


  loginUser() {
    this._accountService.login(this.userData)
      .subscribe(data => {
        this.response = data;
        localStorage.setItem('token_Ghipps', data.access_token);
        localStorage.setItem('name_Ghipps', data.userName);

        this._accountService.getUserInfoAsync(data.userName)
          .subscribe(res => {
            localStorage.setItem('role_Ghipps', res.roles[0]);
            if (res.approverTypeId == undefined) {
              this._router.navigate(['/batch']);
            }
            else {
              //Get sumLimit...
              this._setupService.getApproverTypeAsync(res.approverTypeId)
                .subscribe(response => {
                  localStorage.setItem('limit_Ghipps', response.sumLimit.toString());
                  this._router.navigate(['/batch']);
                },
                  error => {
                    this.errorMsg = error;
                    this._accountService.logout();
                  }
                );
            }

          },
            error => this.errorMsg = error
          );

      },
        error => this.errorMsg = error
      );
  }


  resetErrorFlag() {
    this.errorFlag = false;
    this.errorMsg = '';
  }


  ngOnInit() {
  }

}
