import { Component, OnInit } from '@angular/core';
import { Contact } from '../Models/contact';
import { OperationService } from '../operation.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: []
})
export class ContactDetailsComponent implements OnInit {

  public contact = new Contact();
  errorMsg = '';
  constructor(private _operationService: OperationService, private _router : Router) { }

  gotoContactsList(){
    this._router.navigate(['/contact']);
  }


  ngOnInit() {
    this._operationService.currentContact.subscribe(data =>
      this.contact = data,
       error => {
        this.errorMsg = error;
      }
       );
  }
}
