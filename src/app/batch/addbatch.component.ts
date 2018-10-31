import { Component, OnInit, Input } from '@angular/core';
import { Batch } from '../Models/batch';
import { BatchTransaction } from '../Models/batchTransaction';
import { Contact } from '../Models/contact';
import { OperationService } from '../operation.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addbatch',
  templateUrl: './addbatch.component.html',
  styles: []
})
export class AddbatchComponent implements OnInit {

  batch: Batch = new Batch();
  transactions: BatchTransaction[] = [];
  contacts: Contact[] = [];
  batch_transaction = new BatchTransaction();
  selectedContact: Contact = new Contact();
  errorMsg = '';
  errorFlag = false;
  successFlag = false;
  successMsg = '';
  amountValidatorMsg = '';
  amountFlag = false;
  totalAmount = 0;

  constructor(private fb: FormBuilder, private _datePipe: DatePipe, private _opService: OperationService, private _router: Router) { }

  addTransactionForm = this.fb.group({
    name: [''],
    amount: [''],
    bankName: [''],
    branch: [''],
    contactId: ['default'],
    comment: ['']
  });


  deleteTransaction() {
    let index = (this.transactions.length - 1);
    this.totalAmount -= this.transactions[index].amount;
    this.transactions.splice(index, 1);
  }


  onSubmit() {
    //Step 1
    this._opService.postBatchAsync(this.batch)
      .subscribe(data => data,
        //Should be rectified.. saving but returning error from API
        error => {
          //Step 2
          this._opService.getBatchByNameAsync(this.batch.name)
            .subscribe(data => {
              this.batch = data[0];
              //Step 3 && //Step 4
              for (let i = 0; i < this.transactions.length; i++) {
                this.transactions[i].batchId = this.batch.id;
                //Save transaction
                this._opService.postBatchTransactionAsync(this.transactions[i])
                  .subscribe(
                    data => {
                      if (i === (this.transactions.length - 1)) {
                        this._router.navigate(['/batch']);
                      }
                    },
                    error => {
                      this.errorMsg = error;
                      this.errorFlag = true;
                    }
                  );
              };

            },
              error => {
                this.errorMsg = error
                this.errorFlag = true;
              }
            );

        }
      );
  }


  resetForm() {
    this.addTransactionForm.setValue({
      name: '',
      amount: '',
      bankName: '',
      branch: '',
      contactId: 'default',
      comment: ''
    });
  }


  resetSuccessMsg() {
    this.successFlag = false;
    this.successMsg = '';
  }


  resetAmountMsg(){
    this.amountFlag = false;
    this.amountValidatorMsg = '';
  }


  resetErrorMsg() {
    this.errorFlag = false;
    this.errorMsg = '';
  }


  addToBatch() {
    //getamounts and compare
    if (this.validAmount(this.addTransactionForm.get('amount').value)) {
      //Complete transaction
      this.batch_transaction.contact = this.selectedContact;
      this.batch_transaction.date = this._datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.batch_transaction.contactId = this.selectedContact.id;
      this.batch_transaction.branch = this.selectedContact.branch;
      this.batch_transaction.comments = this.addTransactionForm.get('comment').value;
      this.batch_transaction.amount = this.addTransactionForm.get('amount').value;

      //Push to Batch
      if (this.transactions === undefined) {
        this.transactions = [];
      }
      this.transactions.push(this.cloneTransaction(this.batch_transaction));
      this.resetForm();

    }
    else {
      this.amountFlag = true;
      this.amountValidatorMsg = 'Sum of transactions must not exceed Checksum';
    }

  }


  validAmount(amount: number): boolean {
    if (this.batch.checkSum >= (this.totalAmount + amount)) {
      this.totalAmount += amount;
      return true;
    }
    else {
      return false;
    }
  }


  cloneTransaction(transaction) {
    let clone = new BatchTransaction();
    for (var key in transaction) {
      if (transaction.hasOwnProperty(key)) //ensure not adding inherited props
        clone[key] = transaction[key];
    }
    return clone;
  }


  autoFill() {
    //Get Contact By Id
    this._opService.getContactAsync(this.addTransactionForm.get('contactId').value)
      .subscribe(data => {

        this.addTransactionForm.patchValue({
          name: data.name,
          bankName: data.bank.name,
          branch: data.branch
        });
        this.selectedContact = data;
      },
        error => {
          this.errorFlag = true;
          this.errorMsg = error;
        }
      )

  }


  getContacts() {
    this._opService.getContactsAsync()
      .subscribe(data => {
        this.contacts = data;
      },
        error => {
          this.errorFlag = true;
          this.errorMsg = error;
        }
      )
  }


  backToBatch() {
    this._router.navigate(['/batch']);
  }


  ngOnInit() {
    this.getContacts();
  }

}
