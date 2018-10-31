import { Component, OnInit, OnDestroy } from '@angular/core';
import { SetupService } from '../../setup.service';
import { Router } from '@angular/router';
import { ApproverType } from '../../Models/approver-type';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-approver-type',
  templateUrl: './approver-type.component.html',
  styles: []
})

export class ApproverTypeComponent implements OnInit, OnDestroy {

  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  items = [];
  model = new ApproverType();
  data = {};
  successFlag = false;
  successMsg = '';
  errorMsg = '';
  errorFlag = false;

  constructor(private _setupService: SetupService, private _router: Router) { }

  Onselect(item) {
    this.model = this.cloneApproverType(item);
  }


  cloneApproverType(type: ApproverType) {
    let clone = new ApproverType();
    for (var key in type) {
      if (type.hasOwnProperty(key))
        clone[key] = type[key];
    }
    return clone;
  };


  resetErrorFlag() {
    this.errorFlag = false;
    this.errorMsg = '';
  }

  resetSuccessFlag() {
    this.successFlag = false;
    this.successMsg = '';
  }


  Delete(item) {
    this._setupService.deleteApproverTypeAsync(item.id)
      .subscribe(
        data => {
          this.successMsg = 'ApproverType deleted!';
          this.successFlag = true;
          this.destroyDt();
          this.getApproverTypes();
        },
        error => {
          this.errorMsg = error;
          this.errorFlag = true;
        }
      );
  }


  saveUpdate() {
    this._setupService.putApproverTypeAsync(this.model)
      .subscribe(
        data => {
          this.successMsg = 'ApproverType Updated';
          this.successFlag = true;
          this.destroyDt();
          this.getApproverTypes();
        },
        error => {
          this.errorMsg = error;
          this.errorFlag = true;
        }
      );
  }


  postApproverType(addform: NgForm) {
    this._setupService.postApproverTypeAsync(this.data)
      .subscribe(data => {
        this.successMsg = 'ApproverType Updated';
        this.successFlag = true;
        this.destroyDt();
        this.getApproverTypes();
        addform.reset();
      },
        error => {
          this.errorMsg = error;
          this.errorFlag = true;
        }
      );

  }


  getApproverTypes() {
    this._setupService.getApproverTypesAsync()
      .subscribe(data => {
        this.items = data;
        this.dtTrigger.next();
      },
        error => {
          this.errorMsg = error;
          this.errorFlag = true;
        }
      )
  }


  ngOnInit() {
    this.getApproverTypes();
  }


  destroyDt() {
    $("#mydatatable").DataTable().clear();
    $("#mydatatable").DataTable().destroy();
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
