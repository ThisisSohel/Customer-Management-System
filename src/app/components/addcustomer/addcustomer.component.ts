import { Component, inject, Injector, OnInit } from '@angular/core';
import { MaterialModule } from '../../materialModule';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { customer } from '../../_model/customer.model';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../_services/customer.service';

@Component({
  selector: 'app-addcustomer',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './addcustomer.component.html',
  styleUrl: './addcustomer.component.css'
})
export class AddcustomerComponent implements OnInit {
  _response: any;
  title = 'Add Customer';
  editcode = '';
  isedit = false;
  editdata!: customer;

  private builder = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private service = inject(CustomerService);
  private act = inject(ActivatedRoute);

  constructor() {

  }

  ngOnInit(): void {
    this.editcode = this.act.snapshot.paramMap.get('code') as string;
    if (this.editcode != '' && this.editcode != null) {
      this.isedit = true
      this.title = 'Edit Customer';
      this.customerform.controls['code'].disable();
      this.service.Getbycode(this.editcode).subscribe(item => {
        this.editdata = item;
        this.customerform.setValue({
          code: this.editdata.code, name: this.editdata.name, email: this.editdata.email,
          phone: this.editdata.phone, creditlimit: this.editdata.creditlimit, status: this.editdata.isActive
        })
      })
    }

  }

  customerform = this.builder.group({
    code: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.required),
    creditlimit: this.builder.control(0, Validators.required),
    status: this.builder.control(true)
  })

  Savecustomer() {
    if (this.customerform.valid) {
      let _obj: customer = {
        code: this.customerform.value.code as string,
        name: this.customerform.value.name as string,
        email: this.customerform.value.email as string,
        phone: this.customerform.value.phone as string,
        creditlimit: this.customerform.value.creditlimit as number,
        isActive: this.customerform.value.status as boolean,
        statusname: ''
      }

      if (!this.isedit) {
        this.service.Createcustomer(_obj).subscribe(item => {
          this._response = item;
          if (this._response.result === 'pass') {
            this.toastr.success('Created successfully', 'Success');
            this.router.navigateByUrl('/customer');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }else{
        _obj.code=this.editcode;
        this.service.Updatecustomer(_obj).subscribe(item => {
          this._response = item;
          if (this._response.result === 'pass') {
            this.toastr.success('Updated successfully', 'Success');
            this.router.navigateByUrl('/customer');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }
    }
  }
}
