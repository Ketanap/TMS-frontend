import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ Global } from '../../global';
import { Router } from '@angular/router';
import {Output,EventEmitter } from '@angular/core';

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
     
    this.http.post('http://localhost:9090/user/login/',
      { email: this.Email, password: this.Password  })
      .subscribe(
        data => {
          console.log(data);
          if (!data) { this.Error = "Invalid Creadentail"; }
          else {localStorage.setItem("user",JSON.stringify( data)); location.reload(); }
        }
      );
  //  localStorage.setItem("user","Something"); 
    console.log("Before Navigate");
    this.router.navigateByUrl('/verticalnav',{skipLocationChange:true}).then(()=>{
      this.router.navigate([`/client`]).then(()=>{
        console.log(`After navigation I am on:${this.router.url}`)
      })
    })

    
  }
  clear() {
    this.Email = "";
    this.Password = "";
    
  }
}