import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Batch } from '../Models/batch';
import { OperationService } from '../operation.service';
import { DatePipe } from '@angular/common';
import { Clone } from '../shared/clone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editbatch',
  templateUrl: './editbatch.component.html',
  styles: []
})
export class EditbatchComponent implements OnInit {

  @Input() batch = new Batch();
  @Output() closeEdit: EventEmitter<boolean> = new EventEmitter<boolean>();
  errorMsg = "";
  amountFlag: boolean;
  amountValidatorMsg: string;
  clonedBatch = new Batch();
  errorFlag: boolean;

  constructor(private _opService: OperationService, private _datePipe: DatePipe, private _router: Router) { }

  onSubmit() {
    if (this.validAmount(this.clonedBatch.checkSum)) {
      this._opService.putBatchAsync(this.clonedBatch)
        .subscribe(
          data => {
            this.batch = this.cloneBatch(this.clonedBatch);
            this.closeEdit.emit(false);
            this._router.navigate(['/batch']);
            //this.submitted = true;
            
          },
          error => {
            //this.clonedBatch = this.batch;
            this.clonedBatch = this.cloneBatch(this.batch);
            this.clonedBatch.date = this._datePipe.transform(this.clonedBatch.date, 'yyyy-MM-dd');
            this.errorMsg = error;
            this.errorFlag = true;
          }
        );
    }
    else {
      this.amountFlag = true;
      this.amountValidatorMsg = 'Total Amount must not exceed Checksum';
    }

  }

  validAmount(checkSum: number): boolean {
    if (!(checkSum < (this.batch.totalAmout))) {
      return true;
    }
    else {
      return false;
    }
  }


  resetAmountMsg() {
    this.amountFlag = false;
  }


  resetErrorFlag() {
    this.errorFlag = false;
    this.errorMsg = '';
  }


  backToBatch() {
    this.closeEdit.emit(false);
  }

  cloneBatch(batch: Batch) {
    let clone = new Batch();
    for (var key in batch) {
      if (batch.hasOwnProperty(key)) //ensure not adding inherited props
        clone[key] = batch[key];
    }
    return clone;
  };

  ngOnInit() {
    this.clonedBatch = this.cloneBatch(this.batch);
    this.clonedBatch.date = this._datePipe.transform(this.clonedBatch.date, 'yyyy-MM-dd');
  }

}
