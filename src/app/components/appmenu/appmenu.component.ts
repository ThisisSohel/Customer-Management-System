import { Component, effect } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { menu } from '../../_model/user.model';
import { MaterialModule } from '../../materialModule';

@Component({
  selector: 'app-appmenu',
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './appmenu.component.html',
  styleUrl: './appmenu.component.css'
})
export class AppmenuComponent {
  constructor(private service: UserService, private router: Router) {
    effect(() => {
      this.menulist = this.service._menulist();
    })
  }

  menulist!: menu[]
  Loginuser = ''
  showmenu = false;

  ngOnInit(): void {
    let userrole = localStorage.getItem('userrole') as string;
    this.service.Loadmenubyrole(userrole).subscribe(item => {
      this.menulist = item;
    })


  }

  ngDoCheck(): void {
    this.Loginuser = localStorage.getItem('username') as string;
    this.Setaccess();
  }

  Setaccess() {
    let userrole = localStorage.getItem('userrole');
    let currentUrl = this.router.url;
    if (currentUrl === '/register' || currentUrl === '/login' || currentUrl === '/resetpassword' ||
      currentUrl === '/forgetpassword') {
      this.showmenu = false;
    } else {
      this.showmenu = true;
    }
  }

}
