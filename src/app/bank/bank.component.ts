import { Component, OnInit, ViewChild } from '@angular/core';
import { SetupService } from '../setup.service';
import { Router } from '@angular/router';
import { Bank } from '../Models/bank';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styles: []
})
export class BankComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  items = [];
  public model = new Bank();
  data = {};
  successFlag = false;
  successMsg = '';
  errorMsg = '';
  errorFlag = false;

  constructor(private _setupService: SetupService, private _router: Router) { }


  Onselect(item) {
    this.model = this.cloneBank(item);
  }


  cloneBank(bank: Bank) {
    let clone = new Bank();
    for (var key in bank) {
      if (bank.hasOwnProperty(key))
        clone[key] = bank[key];
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
    this._setupService.deleteBankAsync(item.id)
      .subscribe(
        data => {
          this.successMsg = 'Bank deleted!';
          this.successFlag = true;
          this.destroyDt();
          this.getAvailableBanks();
        },
        error => {
          this.errorMsg = error;
          this.errorFlag = true;
        }
      );
  }


  saveUpdate() {
    this._setupService.putBankAsync(this.model)
      .subscribe(
        data => {
          this.successMsg = 'Bank Updated!';
          this.successFlag = true;
          this.destroyDt();
          this.getAvailableBanks();
        },
        error => {
          this.errorMsg = error;
          this.errorFlag = true;
        }
      );
  }


  postBank() {
    this._setupService.postBankAsync(this.data)
      .subscribe(data => {
        this.successMsg = 'Bank Updated!';
        this.successFlag = true;
        this.destroyDt();
        this.getAvailableBanks();
      },
        error => {
          this.errorMsg = error;
          this.errorFlag = true;
        }
      );
  }


  getAvailableBanks() {
    this._setupService.getBanksAsync()
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
    this.getAvailableBanks();
  }

  destroyDt() {
    $("#mydatatable").DataTable().clear();
    $("#mydatatable").DataTable().destroy();
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}

