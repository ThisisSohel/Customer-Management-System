import { Component, inject, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../materialModule';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { roles, updateuser, users } from '../../_model/user.model';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-userupdate',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './userupdate.component.html',
  styleUrl: './userupdate.component.css'
})
export class UserupdateComponent implements OnInit{
  dialogdata: any;
  userdata!: users;
  rolelist!: roles[]
  type = '';
  _response: any;

  private builder = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private service = inject(UserService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<UserupdateComponent>) {

  }

  ngOnInit(): void {
    this.loadroles();
    this.dialogdata = this.data;
    this.type = this.dialogdata.type;
    console.log(this.dialogdata);
    if (this.dialogdata.username !== '') {
      this.service.GetUserbycode(this.dialogdata.username).subscribe(item => {
        this.userdata = item;
        this.userform.setValue({ username: this.userdata.username, role: this.userdata.role, status: this.userdata.isactive })
      })
    }

  }

  loadroles() {
    this.service.Getallroles().subscribe(item => {
      this.rolelist = item;
    })
  }

  userform = this.builder.group({
    username: this.builder.control({ value: '', disabled: true }),
    role: this.builder.control('', Validators.required),
    status: this.builder.control(true)
  })

  proceedchange() {
    if (this.userform.valid) {
      let _obj: updateuser = {
        username: this.dialogdata.username,
        role: this.userform.value.role as string,
        status:this.userform.value.status as boolean
      }
      if (this.type === 'role') {
        this.service.Updaterole(_obj).subscribe(item => {
          this._response=item;
          if (this._response.result == 'pass') {
            this.toastr.success('Updated successfully', 'Role Update');
            this.closepopup();
          } else {
            this.toastr.error('Failed due to : ' + this._response.message, 'Role Update')
          }
        })
      }else{
        this.service.Updatestatus(_obj).subscribe(item => {
          this._response=item;
          if (this._response.result == 'pass') {
            this.toastr.success('Updated successfully', 'Status Update');
            this.closepopup();
          } else {
            this.toastr.error('Failed due to : ' + this._response.message, 'Status Update')
          }
        })
      }
    }
  }

  closepopup() {
    this.ref.close();
  }
}
