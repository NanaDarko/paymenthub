import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { OperationService } from '../operation.service';
import { Batch } from '../Models/batch';
import { DatePipe } from '@angular/common';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styles: []
})
export class BatchComponent implements OnInit, OnDestroy {

  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  constructor(private _opService: OperationService, private _accountService: AccountService, private _router: Router, private datepipe: DatePipe) { }

  errorMsg = "";
  errorFlag = false;
  items: Batch[] = [];
  model = new Batch();
  userData = {};

  Onselect(item) {
    this._opService.setBatch(item);
    this._router.navigate(['/details']);
  }

  resetErrorFlag() {
    this.errorMsg = '';
    this.errorFlag = false;
  }

  getBatches() {
    this._opService.getBatchesAsync()
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

  gotoAddBatch() {
    this._router.navigate(['/addbatch']);
  }


  ngOnInit() {
    this.getBatches();
  }

  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
