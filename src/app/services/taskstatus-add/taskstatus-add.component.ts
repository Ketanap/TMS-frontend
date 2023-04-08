import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-taskstatus-add',
  templateUrl: './taskstatus-add.component.html',
  styleUrls: ['./taskstatus-add.component.css']
})
export class TaskstatusAddComponent {
  @Input()
  StatusName = "";
  Type = "";
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
    this.http.post('http://localhost:9090/taskstatus',
      {  statusname: this.StatusName, type: this.Type, roleid: 2 },requestOptions)
      .subscribe(
        data => { location.reload(); }
      );
  }

}
