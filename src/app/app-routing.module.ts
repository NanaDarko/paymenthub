import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BankComponent } from './bank/bank.component';
import { ApproverTypeComponent } from './approverType/approver-type/approver-type.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ContactsListComponent } from './contact/contacts-list.component';
import { AuthenticationGuard } from './authentication.guard';
import { AddcontactComponent } from './contact/addcontact.component';
import { ContactDetailsComponent } from './contact/details.component';
import { AuthorizationComponent } from './batch/authorization.component';
import { BatchdetailsComponent } from './batch/batchdetails.component';
import { BatchComponent } from './batch/batch.component';
import { DetailsComponent } from './batch/details.component';
import { EditbatchComponent } from './batch/editbatch.component';
import { AddbatchComponent } from './batch/addbatch.component';
import { RegisterComponent } from './account/register.component';
import { UserManagerComponent } from './account/user-manager.component';



const routes: Routes = [
  { path: '', redirectTo: '/bank', pathMatch: 'full'},
  { path: 'bank', component: BankComponent, canActivate: [AuthenticationGuard]},
  { path: 'contact', component: ContactsListComponent, canActivate: [AuthenticationGuard]},
  { path: 'addcontact', component: AddcontactComponent, canActivate: [AuthenticationGuard]},
  { path: 'contactdetails', component: ContactDetailsComponent, canActivate: [AuthenticationGuard]},
  { path: 'authorization', component: AuthorizationComponent, canActivate: [AuthenticationGuard]},
  { path: 'batch', component: BatchComponent, canActivate: [AuthenticationGuard]},
  { path: 'details', component: DetailsComponent, canActivate: [AuthenticationGuard]},
  { path: 'batchdetails', component: BatchdetailsComponent, canActivate: [AuthenticationGuard]},
  { path: 'addbatch', component: AddbatchComponent, canActivate: [AuthenticationGuard]},
  { path: 'manager', component: UserManagerComponent, canActivate: [AuthenticationGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [AuthenticationGuard]},
  { path: 'login', component:LoginComponent},
  { path: 'approvertypes', component: ApproverTypeComponent, canActivate: [AuthenticationGuard]},
  { path: 'changepassword', component: ChangePasswordComponent, canActivate: [AuthenticationGuard]},
  { path: "**", component:PagenotfoundComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [UserManagerComponent, RegisterComponent, BankComponent, AddbatchComponent, EditbatchComponent, BatchComponent, DetailsComponent, BatchdetailsComponent, AuthorizationComponent, ContactDetailsComponent, AddcontactComponent, ContactsListComponent, ApproverTypeComponent, LoginComponent, ChangePasswordComponent, PagenotfoundComponent]