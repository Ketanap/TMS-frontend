import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  Email: string = '';
  OldPassword: string = '';
  NewPassword: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const payload = {
      email: this.Email,
      oldpassword: this.OldPassword,
      newpassword: this.NewPassword,
    };
    this.http.post('http://localhost:9090/user/changepassword', payload)
.subscribe(
      response => {
        console.log(response);
        // show success message to user
      },
      error => {
         //console.error(error);
      //this.errorMessage = error.message;
      //   // show error message to user
       }
    );
  }
  // clear() {
  //   this.Email = " ";
  //   this.OldPassword = " ";
  //   this.NewPassword = " ";
  // }
}