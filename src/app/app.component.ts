import { Component } from '@angular/core';
import {AccountService} from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ghipps';
  constructor(private _accountService: AccountService){}

  userName = this._accountService.getUserName();
}
