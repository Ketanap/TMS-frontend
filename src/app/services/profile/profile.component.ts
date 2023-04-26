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
  Email: any;
  Phone: any;
  username: any;
  user:any;
  Contact: any;
  

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
      this.user.name = data.user.user.username;

  }
}
