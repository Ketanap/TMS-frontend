import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-changestatus',
  templateUrl: './changestatus.component.html',
  styleUrls: ['./changestatus.component.css']
})
export class ChangestatusComponent implements OnInit {
  @Input()
  Taskid = "";
  TaskDate = new Date().toLocaleDateString('en-GB');
  editEvent: any;
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
  OldStatusId: any = "";
  data = {};
  User: any = [];
  Changedate = new Date().toLocaleDateString('en-GB');
  isStatusCompleted = false; // Added variable to track status completion

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.Taskid = params['id'];
      var user = JSON.parse(localStorage.getItem("user") || "{}");
      this.UserId = user.user.userid;
      let api_key = user.token;
      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        'Authorization': `Bearer ${api_key}`
      });

      const requestOptions = { headers: headers };
      this.http.get("http://localhost:9090/task/" + this.Taskid, requestOptions)
        .subscribe((data) => this.showData(data));
      this.http.get("http://localhost:9090/taskstatus/", requestOptions)
        .subscribe((data) => this.showStatus(data));
      this.http.get("http://localhost:9090/project/", requestOptions)
        .subscribe((data) => this.showProject(data));
      this.http.get("http://localhost:9090/user/", requestOptions)
        .subscribe((data) => this.showUser(data));
    });
  }

  showStatus(data: any) {
    this.Status = data;
  }

  showProject(data: any) {
    this.Project = data;
  }

  showUser(data: any) {
    this.User = data;
  }

  showData(data: any) {
    if (data) {
      console.log(data);
      this.TaskDate = data.taskdate;
      this.UserId = data.userid;
      this.ProjectId = data.projectid;
      this.StatusId = data.statusid;
      this.OldStatusId = data.statusid;
      this.Description = data.description;
      this.ExpectedTime = data.expectedtime;
      this.ActualTime = data.actualtime;
      this.DueDate = data.duedate;
      this.CompletedDate = data.completeddate;
      this.isStatusCompleted = this.StatusId === 'completed'; // Update the isStatusCompleted variable based on the initial status
    }
  }

  editClick(id: number) {
    this.editEvent.emit(id);
  }

  OnSubmit() {
    var user = JSON.parse(localStorage.getItem("user") || "{}");
    let api_key = user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });
    const requestOptions = { headers: headers };

    // Check if the token is valid
    if (!api_key) {
      console.error("Invalid token!");
      // Log the user out or redirect them to the login page
      return;
    }

    console.log(headers);
    if
 (this.Taskid) {
      this.http.put('http://localhost:9090/task/' + this.Taskid,
        { taskdate: this.TaskDate, userid: this.UserId, projectid: this.ProjectId, statusid: this.StatusId, description: this.Description, expectedtime: this.ExpectedTime, actualtime: this.ActualTime, duedate: this.DueDate, completeddate: this.Changedate, roleid: 2 }, requestOptions)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['../task']);
          },
          error => {
            console.log(error);
          }
        );
      this.http.post('http://localhost:9090/taskhistory/',
        { changedate: this.Changedate, description: this.Description, fromstatusid: this.OldStatusId, tostatusid: this.StatusId }, requestOptions)
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
