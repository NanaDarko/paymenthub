import { Component, OnInit } from '@angular/core';
import { Batch } from '../Models/batch';
import { OperationService } from '../operation.service';
import { Router } from '@angular/router';
import { BatchTransaction } from '../Models/batchTransaction';
import { AccountService } from '../account.service';
import { Approval } from '../Models/approvals';
import { DatePipe } from '@angular/common';
import { Contact } from '../Models/contact';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: []
})
export class DetailsComponent implements OnInit {

  batch: Batch;
  transaction: BatchTransaction;
  userData = {};
  approval: Approval = new Approval();
  errorMsg: string;
  response = false;
  amountFlag = false;
  amountValidatorMsg = '';
  editbatch = new Batch();
  display_edit = false;
  display_detail = true;
  transactions: BatchTransaction[] = [];
  contacts: Contact[] = [];
  batch_transaction = new BatchTransaction();
  selectedContact: Contact = new Contact();

  constructor(private fb: FormBuilder, private datepipe: DatePipe, private _accountService: AccountService, private _opService: OperationService, private _router: Router) { }

  addTransactionForm = this.fb.group({
    name: [''],
    amount: [''],
    bankName: [''],
    branch: [''],
    contactId: ['default'],
    comment: ['']
  });

  barren(){
    return !!( this.batch.status === "Pending Approval")
  }


  addToBatch() {

    //getamounts and compare
    if (this.validAmount(this.addTransactionForm.get('amount').value)) {
      //Complete transaction
      this.batch_transaction.contact = this.selectedContact;
      this.batch_transaction.date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
      this.batch_transaction.contactId = this.selectedContact.id;
      this.batch_transaction.branch = this.selectedContact.branch;
      this.batch_transaction.comments = this.addTransactionForm.get('comment').value;
      this.batch_transaction.amount = this.addTransactionForm.get('amount').value;
      this.batch_transaction.batchId = this.batch.id;
      //Save to API
      this._opService.postBatchTransactionAsync(this.batch_transaction)
        .subscribe(data => {
          this.getBatchTransactions();
          this.batch.totalAmout = (this.batch.totalAmout + this.batch_transaction.amount);
          this.resetForm();
        },
          error => this.errorMsg = error.statusText
        );
    }
    else {
      this.amountFlag = true;
      this.amountValidatorMsg = 'Total Amount must not exceed Checksum';
    }

  }


  validAmount(amount: number): boolean {
    if (this.batch.checkSum >= (this.batch.totalAmout + amount)) {
      return true;
    }
    else {
      return false;
    }
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

  resetAmountMsg(){
    this.amountFlag = false;
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
        error => console.log(error)
      )

  }


  getContacts() {
    this._opService.getContactsAsync()
      .subscribe(data => {
        this.contacts = data;
      },
        error => console.log(error)
      )
  }

  deleteBatch(item) {
    this._opService.deleteBatchAsync(item.id)
      .subscribe(
        data => {
          console.log('deleted!', data);
          this._router.navigate(['/batch']);
        },
        error => console.log(error.statusText)
      );
  }


  deleteTransaction(item) {
    this._opService.deleteBatchTransactionAsync(item.id)
      .subscribe(
        data => {
          this.batch.totalAmout = this.batch.totalAmout - item.amount;
          if (this.batch.batchTransactions.length === 1) {
            this.batch.batchTransactions = [];
          }
          else {
            this.getBatchTransactions();
          }

        },
        error => console.log(error)
      );
  }


  getBatchTransactions() {
    this._opService.getBatchTransactionsAsync(this.batch.id)
      .subscribe(data => {
        this.batch.batchTransactions = data;
      },
        error => {
          this.errorMsg = 'Transactions Failed to Load';
        }
      );
  }


  getBatch() {
    this._opService.getBatchAsync(this.batch.id)
      .subscribe(res => {
        this.batch = res;
        //Append Transactions
        this._opService.getBatchTransactionsAsync(this.batch.id)
          .subscribe(data => {
            this.batch.batchTransactions = data;
          },
            error => this.errorMsg = 'Transactions Failed to Load'
          );
      },
        error => this.errorMsg = 'Transactions Failed to Load'
      );
  }


  gotoEditBatch() {
    this.display_edit = true;
    this.display_detail = false;
  }


  //Handle Data From Child Component
  handleCloseEdit(eventData: string) {
    this.display_edit = false;
    this.display_detail = true;
  }


  transactionDetails(item) {
    this.transaction = item;
  }


  resetResponse() {
    this.response = false;
  }


  resetErrorMsg() {
    this.errorMsg = '';
  }

  gotoBatch() {
    this._router.navigate(['/batch']);
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
    this._opService.currentBatch.subscribe(data => {
      this.batch = data;
      if (data) {
        this._opService.getBatchTransactionsAsync(data.id)
          .subscribe(res => {
            this.batch.batchTransactions = res;
          },
            error => {
              if (error.statuscode === 404) {
                this.batch.batchTransactions = [];
              }
            }
          );
        this.getContacts();
      }
      else {
        this._router.navigate(['/batch']);
      }
    },
      error => this.errorMsg = 'Batch Loading Failed'
    );
  }

}
