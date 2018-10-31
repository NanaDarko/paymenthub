import { Component, OnInit } from '@angular/core';
import { Batch } from '../Models/batch';
import { OperationService } from '../operation.service';
import { Router } from '@angular/router';
import { BatchTransaction } from '../Models/batchTransaction';
import { AccountService } from '../account.service';
import { Approval } from '../Models/approvals';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-batchdetails',
  templateUrl: './batchdetails.component.html',
  styles: []
})
export class BatchdetailsComponent implements OnInit {

  batch: Batch; 
  transaction: BatchTransaction;
  userData = {};
  approval: Approval = new Approval();
  errorMsg : string;
  response = false;
  sumLimit = 0;

  constructor(private datepipe: DatePipe, private _accountService: AccountService , private _opService: OperationService, private _router: Router) { }


  transactionDetails(item){
    this.transaction = item;
  }


  resetResponse(){
    this.response = false;
  }


  resetErrorMsg(){
    this.errorMsg = '';
  }

  gotoAuthorization() {
    this._router.navigate(['/authorization']);
  }


  authorizeBatch() {
    this._accountService.login(this.userData)
      
      .subscribe(data => {

        //Get UserId from Account-UserInfo...
        this._accountService.getUserInfoAsync(data.userName)
          .subscribe(res => {
            //Create Approval
            //add userId, date and batchId
            this.approval.userId = res.id;
            this.approval.batchId = this.batch.id;
            this.approval.approvalDate = this.datepipe.transform(new Date(), 'shortDate');
            //save to API...
            this._opService.postApprovalAsync(this.approval)
              .subscribe(data => {
                this.response = true;
                this._router.navigate(['/authorization']);
              },
                error => this.errorMsg = error
              );

          },
            error => this.errorMsg = error
          );

      },
        error => this.errorMsg = "Incorrect Username Or Password"
      );

  }



  ngOnInit() {
    this.sumLimit = Number(localStorage.getItem('limit_Ghipps'));
    this._opService.currentBatch.subscribe(data => {
      this.batch = data;
      if (data) {
        this._opService.getBatchTransactionsAsync(data.id)
          .subscribe(res => {
            this.batch.batchTransactions = res;
          },
            error => error
          )
      }
      else {
        this._router.navigate(['/authorization']);
      }
    },
      error => {
        this._router.navigate(['/authorization']);
      }
    );
  }

}
