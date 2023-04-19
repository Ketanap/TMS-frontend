import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css'],

})
export class TaskAddComponent implements OnInit {
  @Input()
  Taskid = "";
  TaskDate = new Date().toLocaleDateString('en-GB');
  UserId = "";
  ProjectId = "";
  StatusId = "";
  Description = "";
  ExpectedTime = "";
  ActualTime = "";
  DueDate = "";
  CompletedDate = "";
  Status: any = [];
  Project: any = [];
  data = {};
  user:any



  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.user = JSON.parse(localStorage.getItem("user") || "{}");
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params) => {
        let api_key = this.user.token;
        const headers = new HttpHeaders({
          "Content-Type": "application/json",
          'Authorization': `Bearer ${api_key}`
        });

        const requestOptions = { headers: headers };
        this.http
          .get("http://localhost:9090/taskstatus/", requestOptions)
          .subscribe((data) => this.showStatus(data));
        this.http
          .get("http://localhost:9090/project/", requestOptions)
          .subscribe((data) => this.showProject(data));
      });
  }



  showStatus(data: any) {
    this.Status = data;
  }
  showProject(data: any) {
    this.Project = data;
  }
  OnSubmit() {
    this.UserId=this.user.user.userid;
    this.StatusId="1";
    var user = JSON.parse(localStorage.getItem("user") || "{}");
    let api_key = user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });
    const requestOptions = { headers: headers };
    console.log(headers);
      this.http.post('http://localhost:9090/task/',
        { taskdate: this.TaskDate, userid: this.UserId, projectid: this.ProjectId, statusid: this.StatusId, description: this.Description, expectedtime: this.ExpectedTime, actualtime: this.ActualTime, duedate: this.DueDate, completeddate: this.CompletedDate, roleid: 2 }, requestOptions)
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
