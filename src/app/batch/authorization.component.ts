import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { OperationService } from '../operation.service';
import { Batch} from '../Models/batch';
import { Approval } from '../Models/approvals';
import { DatePipe } from '@angular/common';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styles: []
})

export class AuthorizationComponent implements OnInit, OnDestroy {

  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  constructor(private _opService: OperationService, private _accountService: AccountService, private _router: Router, private datepipe: DatePipe) { }

  public errorMsg;
  items: Batch[] = [];
  public model = new Batch();
  response = false;
  userData = {};
  approval: Approval = new Approval();
  toBeAuthorizedBatch: Batch;
  sumLimit = 0;

  LogInToApprove(batch) {
    //Save Selected Batch
    this.toBeAuthorizedBatch = batch;
  }


  ApproveBatch() {
    this._accountService.login(this.userData)
      .subscribe(data => {

        //Get UserId from Account-UserInfo...
        this._accountService.getUserInfoAsync(data.userName)
          .subscribe(res => {
            //Create Approval
            //add userId, date and batchId
            this.approval.userId = res.id;
            this.approval.batchId = this.toBeAuthorizedBatch.id;
            this.approval.approvalDate = this.datepipe.transform(new Date(), 'shortDate');
            //save to API...
            this._opService.postApprovalAsync(this.approval)
              .subscribe(data => {
                //Destroy DataTable
                this.destroyDt();
                this.getUnAuthorizedBatches();
                this.response = true;
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


  Onselect(item) {
    this._opService.setBatch(item);
    this._router.navigate(['/batchdetails']);
  }

  resetResponse() {
    this.response = false;
  }

  getUnAuthorizedBatches() {
    this._opService.getUnAuthorizedBatchesAsync()
      .subscribe(data => {
        this.items = data;
        this.dtTrigger.next();
      },
        error => this.errorMsg = error
      )
  }


  ngOnInit() {
    this.getUnAuthorizedBatches();
    this.sumLimit = Number(localStorage.getItem('limit_Ghipps'));
  }


  destroyDt() {
    $("#mydatatable").DataTable().clear();
    $("#mydatatable").DataTable().destroy();
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
