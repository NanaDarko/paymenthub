import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../Models/contact';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { OperationService } from '../operation.service';
import { Subject } from 'rxjs';
import { SetupService } from '../setup.service';
import { Bank } from '../Models/bank';
import { C_Type } from '../Models/contact-type';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit, OnDestroy {
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  Banks: Bank[] = [];
  Types: C_Type[] = [];
  items = [];
  model = new Contact();
  successFlag: boolean = false;
  successMsg = '';
  errorFlag: boolean = false;
  errorMsg = '';

  constructor(private _setupService: SetupService, private _operationService: OperationService, private _router: Router) { }

  getBanks() {
    this._setupService.getBanksAsync()
      .subscribe(data => this.Banks = data,
        error => {
          this.errorMsg = error;
          this.errorFlag = true;
        }
      );
  }

  getContactTypes() {
    this._operationService.getContactTypesAsync()
      .subscribe(data => this.Types = data,
        error => {
          this.errorMsg = error;
          this.errorFlag = true;
        }
      );
  }


  Onselect(item) {
    this.model = this.cloneContact(item);
  }

  gotoAddContact() {
    this._router.navigate(['/addcontact']);
  }

  Delete(item) {
    this._operationService.deleteContactAsync(item.id)
      .subscribe(data => {
        this.successFlag = true;
        this.successMsg = 'Contact delete!';
        this._operationService.setContact(item);
        this._router.navigate(['/contactdetails']);
      },
        error => {
          this.errorMsg = error;
          this.errorFlag = true;
        }
      );

  }


  saveUpdate() {
    this._operationService.putContactAsync(this.model)
      .subscribe(
        data => {
          this.successFlag = true;
          this.successMsg = "Contact updated";
          this.destroyDt();
          this.getContacts();
        },
        error => {
          this.errorMsg = error;
          this.errorFlag = true;
        }
      );
  }


  cloneContact(contact: Contact) {
    let clone = new Contact();
    for (var key in contact) {
      if (contact.hasOwnProperty(key)) //ensure not adding inherited props
        clone[key] = contact[key];
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


  getContacts() {
    this._operationService.getContactsAsync()
      .subscribe(data => {
        this.items = data;
        this.dtTrigger.next();
      },
        error => {this.errorMsg = error;
          this.errorFlag = true;
        }
      )
  }

  
  ngOnInit() {
    this.getContacts();
    this.getBanks();
    this.getContactTypes();
  }

  destroyDt() {
    $("#mydatatable").DataTable().clear();
    $("#mydatatable").DataTable().destroy();
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
