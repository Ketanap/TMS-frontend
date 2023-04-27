import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;
    if (!token) {
      this.errorMessage = 'You must be logged in to change your password.';
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const payload = {
      email: this.Email,
      oldpassword: this.OldPassword,
      newpassword: this.NewPassword,
    };
    const requestOptions = { headers: headers };
    this.http.post('http://localhost:9090/user/changepassword', payload, requestOptions)
      .subscribe(
        response => {
          console.log(response);
          alert("password successfully changed!")
          this.Email = '';
          this.OldPassword = '';
          this.NewPassword = '';
        },
        error => {
          console.error(error);
          this.errorMessage = error.message;
          alert("Invalid Information")
          // show error message to user
        }
      );
  }
}