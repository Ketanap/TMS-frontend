import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
@Input() id:any="";
UserName="";
Password="";
constructor(private http: HttpClient) {}
ngOnInit() { }
showData(data:any){
  this.UserName=data.UserName;
  this.Password=data.Password;

}
onSubmit() {
  this.http.post('http://127.0.0.1:9090/user/login',
  {id:this.id,UserName: this.UserName, Password:this.Password})
  .subscribe(
    data=>{location.reload();}
  );
}
}
