import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var localStorage: any;

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {
  email: any;
  username: any;
  user: any;
  contact: any;
  UserName: any;
  Email: any;
  Contact: any;
  Userid: any;
  userid: any;

  constructor(
    private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.UserName = this.user.user.username;
    this.Email = this.user.user.email;
    this.Contact = this.user.user.contact;
    this.userid = this.user.userid;
  }



  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.Userid = params['id'];
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const api_key = user.token;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`
      });

      const requestOptions = { headers: headers };
      this.http
        .get('http://localhost:9090/user/' + this.Userid, requestOptions)
        .subscribe((data) => this.showData(data));
    });
  }

  showData(data: any) {
    console.log(data);

    this.username = data.username;
    this.email = data.email;
    this.contact = data.contact;
  }

  OnSubmit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const api_key = user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });
    const requestOptions = { headers: headers };
    const updatedData = {
      username: this.UserName,
      email: this.Email,
      contact: this.Contact
    };
    console.log(headers);
    this.http
      .put('http://localhost:9090/user/' + this.userid, updatedData, requestOptions)
      .subscribe(
        (data) => {
          console.log(data);
          user.user.username = this.UserName;
          user.user.email = this.Email;
          user.user.contact = this.Contact;
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['../profile']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
 