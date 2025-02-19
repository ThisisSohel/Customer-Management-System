import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../materialModule';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { loginresp, usercred } from '../../_model/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private builder = inject(FormBuilder);
  private service = inject(UserService);
  private toastr = inject(ToastrService);
  private router = inject(Router)

  constructor() {}

  ngOnInit(): void {
    localStorage.clear();
    this.service._menulist.set([]);
  }

  _response!: loginresp;
  
  _loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  proceedlogin(){
    if (this._loginform.valid) {
      let _obj: usercred = {
        username: this._loginform.value.username as string,
        password: this._loginform.value.password as string
      }
      this.service.Proceedlogin(_obj).subscribe(item => {
        this._response = item;
        localStorage.setItem('token', this._response.token);
        localStorage.setItem('username', _obj.username);
        localStorage.setItem('userrole', this._response.userRole);

        this.service.Loadmenubyrole(this._response.userRole).subscribe(item=>{
          this.service._menulist.set(item);
        })
        this.toastr.success("Successfully Login")
        this.router.navigateByUrl('/');
      }, error => {
        this.toastr.error('Failed to login', error.error.title)
      });
    }
  }
  
}
