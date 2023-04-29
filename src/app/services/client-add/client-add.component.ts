import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {
  @Input()
  Clientid = "";
  ClientName = "";
  Email = "";
  Contact = "";
  data = {};
  user: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.user = JSON.parse(localStorage.getItem("user") || "{}");
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params); // { orderby: "price" }
      this.Clientid = params['id'];
      var user = JSON.parse(localStorage.getItem("user") || "{}");
      let api_key = user.token;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`
      });

      const requestOptions = { headers: headers };
      this.http.get('http://localhost:9090/client/' + this.Clientid, requestOptions).subscribe(data => this.showData(data));
    });
  }

  showData(data: any) {
    if (data) {
      this.ClientName = data.clientname;
      this.Contact = data.contact;
      this.Email = data.email;
    }
  }
  OnSubmit() {
    this.user = JSON.parse(localStorage.getItem("user") || "{}");
    let api_key = this.user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });

    const requestOptions = { headers: headers };
    console.log(headers);

    if (this.Clientid) {
      this.http.put('http://localhost:9090/client/' + this.Clientid,
        { clientname: this.ClientName, email: this.Email, contact: this.Contact, roleid: 2 }, requestOptions)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['../client']);
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.http.post('http://localhost:9090/client',
        { clientname: this.ClientName, email: this.Email, contact: this.Contact, roleid: 2 }, requestOptions)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['../client']);
          },
          error => {
            console.log(error);
          }
        );
    }
  }
}