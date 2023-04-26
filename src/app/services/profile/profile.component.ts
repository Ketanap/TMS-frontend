import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profiles: any =[];
   @Output() editEvent = new EventEmitter<any>();
   email: any;
   username: any;
   user: any;
   contact: any;
   userId: any;
   
 

  constructor(private http: HttpClient) {
    this.user=JSON.parse(localStorage.getItem("user")||"{}");
    let api_key=this.user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });

    const requestOptions = { headers: headers };
    this.userId = this.user.id; // Set the userId to the current user's id
    const url = 'http://localhost:9090/user/${this.userId}'; // Use this.userId instead of userId
    this.http.get(url, requestOptions).subscribe(data => this.showData(data));
    console.log(this.user);
  }
  ngOnInit(): void {}
  
  showData(data: any) {
    if (this.user && this.user.user) {
      this.username = this.user.user.username;
      this.email = this.user.user.email;
      this.contact = this.user.user.contact;
      
    } else {
      console.error('User data is not available');
    }

  }  

}
