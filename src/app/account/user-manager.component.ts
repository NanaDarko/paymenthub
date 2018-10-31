import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { UserInfo } from '../Models/userInfo';
import { SetupService } from '../setup.service';
import { AssignApprover } from '../Models/assignApprover';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styles: []
})
export class UserManagerComponent implements OnInit {

  errorFlag = false;
  errorMsg = '';
  successFlag = false;
  successMsg = '';
  userInfo = new UserInfo();
  Roles = [];
  ApproverTypes = [];
  assignApprover = new AssignApprover();
  roleFlag = false;
  approverFlag = false;
  userName = '';

  constructor(private _setupService: SetupService, private _accountService: AccountService, private _router: Router) { }

  searchUser(IsRole: boolean) {
    if(IsRole){
      this.userName = this.userInfo.userName;
    }
    else{
      this.userName = this.assignApprover.userName;
    }
    this._accountService.getUserInfoAsync(this.userName)
      .subscribe(data => {
        this.userInfo = data;
        if (IsRole) {
          if (this.userInfo.roles == '') {
            this.userInfo.roles = "default";
          }
          this.roleFlag = true;
        }
        else{
          if (this.userInfo.approverTypeId == undefined || this.userInfo.approverTypeId == '') {
            this.assignApprover.typeId = 'default';
          }
          else{
            this.assignApprover.typeId = this.userInfo.approverTypeId;
          }
          this.approverFlag = true;
        }

      },
        error => {
          this.errorMsg = "User Not Found!";
          this.errorFlag = true;
        }
      );
  }


  cancelRoleAssignment() {
    this.userInfo = new UserInfo();
    this.roleFlag = false;
  }


  cancelApproverAssignment() {
    this.assignApprover = new AssignApprover();
    this.approverFlag = false;
  }


  resetErrorFlag() {
    this.errorFlag = false;
    this.errorMsg = '';
  }


  resetSuccessFlag() {
    this.successFlag = false;
    this.successMsg = '';
  }


  assignRole(searchForm: NgForm, userRoleForm: NgForm) {
    this._accountService.assignRoleAsync(this.userInfo.id, this.userInfo.roles)
      .subscribe(data => {
        this.successMsg = this.userInfo.roles + " role assigned to " + this.userInfo.userName;
        searchForm.reset();
        userRoleForm.reset();
        this.roleFlag = false;
        this.successFlag = true;
      },
        error => {
          this.errorMsg = error;
          this.errorFlag = true;
        }
      );
  }


  assignApproverType(approverForm: NgForm) {
    this._accountService.assignApproverTypeAsync(this.assignApprover.userName, this.assignApprover.typeId)
      .subscribe(data => {
        this.successMsg = "Approver role assigned to " + this.assignApprover.userName;
        approverForm.reset();
        this.assignApprover.typeId = 'default';
        this.approverFlag = false;
        this.successFlag = true;
      },
        error => {
          this.errorMsg = error;
          this.errorFlag = true;
        }
      );
  }


  getRoles() {
    this._accountService.getRolesAsync()
      .subscribe(data => this.Roles = data,
        error => {
          this.errorMsg = error;
          this.errorFlag = true;
        }
      );
  }


  getApproverTypes() {
    this._setupService.getApproverTypesAsync()
      .subscribe(data => this.ApproverTypes = data,
        error => {
          this.errorMsg = error;
          this.errorFlag = true;
        }
      );
  }


  ngOnInit() {
    this.getRoles();
    this.getApproverTypes();
  }

}
