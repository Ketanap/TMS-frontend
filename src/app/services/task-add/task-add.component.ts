import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit{
  @Input()
  Taskid= "";
  TaskDate = "";
  UserId = "";
  ProjectId = "";
  StatusId = "";
  ExpectedTime = "";
  ActualTime = "";
  DueDate = "";
  CompletedDate = "";
  data = {};

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.Taskid = params['id'];
        var user = JSON.parse(localStorage.getItem("user") || "{}");
        let api_key = user.token;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api_key}`
        });

        const requestOptions = { headers: headers };
        this.http.get('http://localhost:9090/task/' + this.Taskid, requestOptions).subscribe(data => this.showData(data));

      }
      );
  }
  showData(data: any) {
    this.TaskDate = data.taskdate;
    this.UserId = data.userid;
    this.ProjectId = data.projectid;
    this.StatusId = data.statusid;
    this.ExpectedTime = data.expectedtime;
    this.ActualTime = data.actualtime;
    this.DueDate = data.duedate;
    this.CompletedDate = data.completeddate;

  }
  OnSubmit() {
    var user = JSON.parse(localStorage.getItem("user") || "{}");
    let api_key = user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });
    const requestOptions = { headers: headers };
    console.log(headers);
    if (this.Taskid) {
      this.http.put('http://localhost:9090/task/' + this.Taskid,
      { taskdate: this.TaskDate, userid: this.UserId, projectid: this.ProjectId, statusid: this.StatusId, expectedtime: this.ExpectedTime, actualtime: this.ActualTime, duedate: this.DueDate, completeddate: this.CompletedDate, roleid: 2 }, requestOptions)
        .subscribe(
          data => { 
            console.log(data);
            this.router.navigate(['../task']);
          },
          error => {
            console.log(error);
          }
        );
    }else{
      this.http.post('http://localhost:9090/task',
        { taskdate: this.TaskDate, userid: this.UserId, projectid: this.ProjectId, statusid: this.StatusId, expectedtime: this.ExpectedTime, actualtime: this.ActualTime, duedate: this.DueDate, completeddate: this.CompletedDate, roleid: 2 }, requestOptions)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['../task']);
          },
          error => {
            console.log(error);
          }
        );
    }



  }
}