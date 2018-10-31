import { Component, OnInit } from '@angular/core';
import { Register } from '../Models/register';
import { AccountService } from '../account.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  userData = new Register();
  errorFlag = false;
  errorMsg = '';
  successFlag = false;
  successMsg = '';

  constructor(private _accountService:AccountService) { }

  onSubmit(userForm: NgForm){
    this._accountService.register(this.userData)
      .subscribe(data => {
        this.successMsg = 'Registration Successful. Proceed to email to continue..';
        this.successFlag = true;
        userForm.reset();
      },
        error => {
          console.log(this.userData);
          this.errorMsg = error;
          this.errorFlag = true;
        }
      );
  }

  resetErrorFlag(){
    this.errorFlag = false;
    this.errorMsg = '';
  }

  resetSuccessFlag(){
    this.successFlag = false;
    this.successMsg = '';
  }

  ngOnInit() {
  }

}
