import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
//@Input() id:any="";
UserName:string="";
Password:string="";
show: boolean= false;
submit(){
console.log("user name is " + this.UserName)
this.clear();
}
clear(){
this.UserName ="";
this.Password = "";
this.show = true;
}
}