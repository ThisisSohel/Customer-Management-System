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
        path: 'customer',
        component: CustomerComponent
    },
    {
        path: 'forgetpassword',
        component: ForgetpasswordComponent, canActivate: [authGuard]
    },
    {
        path:'user',
        component: UserComponent, canActivate:[authGuard]
    }
];
