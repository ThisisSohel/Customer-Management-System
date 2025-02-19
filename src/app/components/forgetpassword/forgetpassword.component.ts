import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_services/user.service';
import { MaterialModule } from '../../materialModule';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  imports: [MaterialModule, RouterLink, FormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
  username = ''
  _response: any;

  private toastr = inject(ToastrService);
  private router = inject(Router);
  private service = inject(UserService);
  
  constructor() {

  }

  ngOnInit(): void {

  }

  Proceed() {
    this.service.Forgetpassword(this.username).subscribe(item => {
      debugger
      this._response = item;
      if (this._response.result == 'pass') {
        this.toastr.success('OTP sent to the registered email.', 'Forget Password');
        this.service._username.set(this.username);
        this.router.navigateByUrl('/updatepassword');
      } else {
        this.toastr.error('Failed Due to:' + this._response.message, 'Failed');
      }
    })

  }
}
