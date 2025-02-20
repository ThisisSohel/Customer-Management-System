import { Component, inject, ViewChild } from '@angular/core';
import { MaterialModule } from '../../materialModule';
import { users } from '../../_model/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserupdateComponent } from '../userupdate/userupdate.component';

@Component({
  selector: 'app-user',
  imports: [MaterialModule, MatPaginator],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  userlist!: users[];
  displayedColumns: string[] = ["username", "name", "email", "phone", "status", "role", "action"];
  datasource: any;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private service = inject(UserService);
  private toastr = inject(ToastrService);
  private dialog = inject(MatDialog);

  constructor() {
  }
  
  ngOnInit(): void {
    this.Loadusers();
  }

  Loadusers() {
    this.service.Getallusers().subscribe(item => {
      this.userlist = item;
      this.datasource = new MatTableDataSource<users>(this.userlist);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }

  updaterole(code: string) {
    this.Openpopup(code,'role');
  }

  updatestatus(code: string) {
    this.Openpopup(code,'status');
  }

  Openpopup(username: string, type: string) {
    this.dialog.open(UserupdateComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        username: username,
        type: type
      }
    }).afterClosed().subscribe(item=>{
      this.Loadusers();
    })
  }
}
