import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let toastr = inject(ToastrService)
  let service = inject(UserService)

  if(localStorage.getItem('username') != null){
    return true;
  }else{
    toastr.warning("Unauthorized Access!")
    return false;
  }

};
