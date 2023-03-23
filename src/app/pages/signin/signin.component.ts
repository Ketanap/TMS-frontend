import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ Global } from '../../global';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  //@Input() id:any="";
  Email: string = "";
  Password: string = "";
  Error:string="";
  
  
  constructor(private http: HttpClient) { }
  submit() {
    this.http.post('http://localhost:9090/user/login/',
      { email: this.Email, password: this.Password  })
      .subscribe(
        data => {
          console.log(data);
          if (!data) { this.Error = "Invalid Creadentail"; }
          else { Global.isAuth = true; location.reload(); }
        }
      );
    this.clear();
  }
  clear() {
    this.Email = "";
    this.Password = "";
    
  }
}