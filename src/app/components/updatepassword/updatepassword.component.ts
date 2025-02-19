import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { updatepassword } from '../../_model/user.model';
import { MaterialModule } from '../../materialModule';

@Component({
  selector: 'app-updatepassword',
  imports: [ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.css'
})
export class UpdatepasswordComponent {
  currentusername = '';

  private builder = inject(FormBuilder);
  private service = inject(UserService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  constructor() {

  }

  ngOnInit(): void {
    this.currentusername=this.service._username();
  }

  _response: any;

  _resetform = this.builder.group({
    password: this.builder.control('', Validators .required),
    otptext: this.builder.control('', Validators.required)
  })

  proceedchange() {
    if (this._resetform.valid) {
      let _obj: updatepassword = {
        username: this.currentusername,
        password: this._resetform.value.password as string,
        otptext:this._resetform.value.otptext as string
      }
      this.service.Updatepassword(_obj).subscribe(item => {
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
