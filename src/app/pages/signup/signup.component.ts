import { HttpClient } from '@angular/common/http';
import { Component,OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Input() id: any = "";
  UserName = "";
  Email = "";
  Password = "";
  Contact = "";
  constructor(private http: HttpClient) { }

  ngOnInit() { }
  OnSubmit() {
    this.http.post('http://localhost:9090/user',
      { id: this.id, username: this.UserName, email: this.Email, password: this.Password, contact: this.Contact, roleid: 2 })
      .subscribe(
        data => { location.reload(); }
      );
  }
}