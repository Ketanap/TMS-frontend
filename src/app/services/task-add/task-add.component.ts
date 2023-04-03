import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent {
  @Input() 
  TaskId = "";
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
    this.http.post('http://localhost:9090/task',
      {taskid: this.TaskId, taskdate: this.TaskDate, userid: this.UserId,projectid: this.ProjectId, statusid: this.StatusId,expectedtime: this.ExpectedTime,actualtime: this.ActualTime, duedate: this.DueDate, completeddate: this.CompletedDate, roleid: 2 })
      .subscribe(
        data => { location.reload(); }
      );
  }
  


}
