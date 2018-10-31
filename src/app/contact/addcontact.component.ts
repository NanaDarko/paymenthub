import { Component, OnInit } from '@angular/core';
import { SetupService } from '../setup.service';
import { OperationService } from '../operation.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent implements OnInit {

  constructor(private _router:Router, private _setupService:SetupService, private _opService: OperationService) { }
  userModel = {BankId: "default", TypeId: "default"};
  errorMsg = '';
  Banks = [];
  Types = [];
  response: boolean = false;

  getBanks(){
    this._setupService.getBanksAsync()
    .subscribe(data =>this.Banks = data,
          error =>{this.errorMsg = error}
    );
  }

  getContactTypes(){
    this._opService.getContactTypesAsync()
    .subscribe(data => this.Types = data,
          error => this.errorMsg = error
    );
  }

  onSubmit(userForm: NgForm){
    this._opService.postContactAsync(this.userModel)
    .subscribe(data => data,  
          error => this.errorMsg = error
    );
    this.response = true;
    userForm.reset();
    this.userModel = {BankId: "default", TypeId: "default"};
  }

  gotoContacts(){
    this._router.navigate(['/contact']);
  }


  resetResponse(){
    this.response = false;
  }

  ngOnInit() {
    this.getContactTypes();
    this.getBanks();
  }

}
