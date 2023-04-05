import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent {
  @Input() ClientId = "";
  ClientName = "";
  Email = "";
  Contact = "";
  constructor(private http: HttpClient) { }

  ngOnInit() { }
  OnSubmit() {
    var user=JSON.parse(localStorage.getItem("user")||"{}");
    let api_key=user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });
    const requestOptions = { headers: headers };
    console.log(headers);
    this.http.post('http://localhost:9090/client',
      {clientid: this.ClientId, clientname: this.ClientName, email: this.Email,contact: this.Contact, roleid: 2 },requestOptions)
      .subscribe(
        data => { location.reload(); }
      );
  }

}
