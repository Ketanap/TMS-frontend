import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  Email: string = "";
  Password: string = "";
  Error:string="";
  
  
  constructor(private http: HttpClient,private router: Router) { }
  submit() {
     
    this.http.post('http://localhost:9090/user/logintoken/',
      { email: this.Email, password: this.Password  })
      .subscribe(
        data => {
          console.log(data);
          if (!data) { this.Error = "Invalid Creadentail"; }
          else {localStorage.setItem("user",JSON.stringify( data));this.router.navigateByUrl("/client"); }
        }
      );
  
    
  }
  clear() {
    this.Email = "";
    this.Password = "";
    
  }
}