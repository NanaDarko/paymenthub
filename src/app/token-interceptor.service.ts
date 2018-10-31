import { Injector, Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import {AccountService} from './account.service';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector){}
  intercept(req, next) {
    let accountService = this.injector.get(AccountService)
    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'bearer ' + accountService.getToken())
      }
    )
    return next.handle(tokenizedReq)
  }

}
