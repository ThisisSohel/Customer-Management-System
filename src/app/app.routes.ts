import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ConfirmotpComponent } from './components/confirmotp/confirmotp.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { UpdatepasswordComponent } from './components/updatepassword/updatepassword.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { authGuard } from './_guard/auth.guard';
import { UserComponent } from './components/user/user.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AddcustomerComponent } from './components/addcustomer/addcustomer.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent, canActivate: [authGuard]
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'confirmotp',
        component: ConfirmotpComponent
    },
    {
        path: 'resetpassword',
        component: ResetpasswordComponent
    },
    {
        path: 'updatepassword',
        component: UpdatepasswordComponent
    },
    {
        path: 'forgetpassword',
        component: ForgetpasswordComponent, canActivate: [authGuard]
    },
    {
        path:'user',
        component: UserComponent, canActivate:[authGuard]
    },
    {
        path: 'invoice',
        component: InvoiceComponent
    },
    {
        path: 'reports',
        component: ReportsComponent
    },
    {path:'customer',component:CustomerComponent,canActivate:[authGuard]},
    {path:'customer/add',component:AddcustomerComponent,canActivate:[authGuard]},
    {path:'customer/edit/:code',component:AddcustomerComponent,canActivate:[authGuard]},
    {path:'user',component:UserComponent,canActivate:[authGuard]},
];
