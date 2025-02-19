import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../materialModule';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { resetpassword } from '../../_model/user.model';

@Component({
  selector: 'app-resetpassword',
  imports: [MaterialModule,ReactiveFormsModule,RouterLink],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  private builder = inject(FormBuilder);
  private service = inject(UserService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  constructor() {
  }

  ngOnInit(): void {
  }

  _response: any;

  _resetform = this.builder.group({
    oldpassword: this.builder.control('', Validators.required),
    newpassword: this.builder.control('', Validators.required)
  })

  proceedchange(){
    if (this._resetform.valid) {
      let _obj: resetpassword = {
        username: localStorage.getItem('username') as string,
        oldpassword: this._resetform.value.oldpassword as string,
        newpassword:this._resetform.value.newpassword as string
      }
      this.service.Resetpassword(_obj).subscribe(item => {
        this._response = item;
        if (this._response.result == 'pass') {
          this.toastr.success('Please login with new password', 'Password changed');
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error('Failed due to : ' + this._response.message, 'Resetpassword Failed')
        }
      });

    }
  }
}
