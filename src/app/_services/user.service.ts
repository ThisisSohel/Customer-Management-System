import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { loginresp, menu, menupermission, registerconfirm, resetpassword, updatepassword, usercred, userregister } from '../_model/user.model';
import { environment } from '../../environments/environment'; 



@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl= environment.apiUrl;
  
  constructor(private http : HttpClient){

  }

  _registerresp = signal<registerconfirm>({
    userid: 0,
    username: '',
    otptext: ''
  })

  _menulist = signal<menu[]>([]);
  _username=signal('');
  
  userRegistration(_data: userregister) {
    return this.http.post(`${this.baseUrl}/User/userregisteration`, _data);
  }

  Confirmregisteration(_data: registerconfirm) {
    debugger
    return this.http.post(`${this.baseUrl}/User/confirmregisteration`, _data);
  }

  Proceedlogin(_data: usercred) {
    return this.http.post<loginresp>(`${this.baseUrl}/Authorize/GenerateToken`, _data);
  }

  Loadmenubyrole(role: string) {
    debugger
    return this.http.get<menu[]>(`${this.baseUrl}/UserRole/GetAllMenusbyrole?userrole=${role}`);
  }
  
  Resetpassword(_data: resetpassword) {
    return this.http.post(`${this.baseUrl}/User/resetpassword`, _data);
  }

  Forgetpassword(username: string) {
    debugger
    return this.http.get(`${this.baseUrl}/User/forgetpassword?username=${username}`)
  }
  
  Updatepassword(_data: updatepassword) {
    return this.http.post(`${this.baseUrl}/User/updatepassword`, _data);
  }

  Getmenupermission(role:string,menuname:string){
    return this.http.get<menupermission>(this.baseUrl + '/UserRole/GetMenupermissionbyrole?userrole='+role+'&menucode=' + menuname)
  }

}
