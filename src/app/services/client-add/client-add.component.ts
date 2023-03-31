import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

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
    this.http.post('http://localhost:9090/client',
      {clientid: this.ClientId, clientname: this.ClientName, email: this.Email,contact: this.Contact, roleid: 2 })
      .subscribe(
        data => { location.reload(); }
      );
  }

}
