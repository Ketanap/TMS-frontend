import { HttpClient } from '@angular/common/http';
import { Component,OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
@Input() id:any="";
UserName="";
Email="";
Password="";
Contact="";
constructor(private http: HttpClient) {}
 
ngOnInit(){ }
ngOnChanges() {
  console.log("signup" + this.id);
  this.http.get('http://localhost:9090/user'+this.id).subscribe(data=>this.showData(data));
}
showData(data:any) {
  this.UserName=data.UserName;
  this.Email=data.Email;
  this.Password=data.Password;
  this.Contact=data.Contact;
}
OnSubmit()
{
  this.http.post('http://localhost:9090/user',
  {id:this.id,UserName:this.UserName,Email:this.Email,Password:this.Password,Contact:this.Contact})
  .subscribe(
    data=>{location.reload();}
  );
}
}