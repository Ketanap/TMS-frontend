import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   @Output() editEvent = new EventEmitter<any>();
  Email: any;
  Phone: any;
  username: any;
  profile: any;
  user:any;
  

  constructor(private http: HttpClient) {
    this.user=JSON.parse(localStorage.getItem("user")||"{}");
    let api_key=this.user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });

    const requestOptions = { headers: headers };
    this.http.get('http://localhost:9090/user', requestOptions).subscribe(data => this.showData(data));
  }
  ngOnInit(): void {}
  
  showData(data:any) {

    console.log(data);
      this.user=data;
    if(this.user.profile) {
      this.profile = this.user.profile;
    this.Email = this.user.tblUser.email;
    this.Phone = this.user.tblUser.contact;
    this.username = this.user.tblUser.username; 
      
    }
  }
}
