import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../materialModule';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { registerconfirm, userregister } from '../../_model/user.model';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MaterialModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private builder = inject(FormBuilder)
  constructor( private service: UserService, private toastr: ToastrService,
    private router: Router) {
  }

  _response: any;

  _regform = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    password: this.builder.control('', Validators.required),
    confirmpassword: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.required)
  })

  proceedregister() {
    debugger
    if (this._regform.valid) {
      let _obj: userregister = {
        userName: this._regform.value.username as string,
        name: this._regform.value.name as string,
        phone: this._regform.value.phone as string,
        email: this._regform.value.email as string,
        password: this._regform.value.password as string
      }
      this.service.userRegistration(_obj).subscribe(item => {
        this._response = item;
        console.log(this._response);
        if (this._response.result == 'pass') {
          let _confirmobj: registerconfirm = {
            userid: this._response.message,
            username: _obj.userName,
            otptext: ''
          }
          this.service._registerresp.set(_confirmobj);
          this.toastr.success('Validate OTP & complete the registeration', 'Registeration');
          this.router.navigateByUrl('/confirmotp');
        } else {
          debugger
          this.toastr.error('Failed due to : ' + this._response.message, 'Registeration Failed')
        }
      });

    }
  }
}


