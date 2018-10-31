import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule,RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { DataTablesModule } from 'angular-datatables';
import { IsEqualValidator } from './shared/equal-validator.directive';
import { SelectValidator } from './shared/select-validator.directive';
import {DatePipe} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    IsEqualValidator,
    SelectValidator
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
