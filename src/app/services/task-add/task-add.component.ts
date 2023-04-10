import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent {
  @Input() 
  TaskDate = "";
  UserId = "";
  ProjectId = "";
  StatusId ="";
  ExpectedTime ="";
  ActualTime = "";
  DueDate = "";
  CompletedDate ="";
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
    this.http.post('http://localhost:9090/task',
      {taskdate: this.TaskDate, userid: this.UserId,projectid: this.ProjectId, statusid: this.StatusId,expectedtime: this.ExpectedTime,actualtime: this.ActualTime, duedate: this.DueDate, completeddate: this.CompletedDate, roleid: 2 },requestOptions)
      .subscribe(
        data => { location.reload(); }
      );
  }
  


}
