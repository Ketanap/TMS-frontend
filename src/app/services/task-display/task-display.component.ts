import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-display',
  templateUrl: './task-display.component.html',
  styleUrls: ['./task-display.component.css']
})
export class TaskDisplayComponent {
  tasks : any = [];

  @Output() editEvent= new EventEmitter<any>();
  TaskDate: any;
  UserId: any;
  ProjectId: any;
  StatusId:any;
  Description: any;
  ExpectedTIme: any;
  ActualTime: any;
  DueDate: any;
  ComletedDate: any;
  Completed: any;
  ChangeStatus: any;
  user: any;
  constructor(private http: HttpClient) {
    this.user=JSON.parse(localStorage.getItem("user")||"{}");
    let api_key=this.user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });

    const requestOptions = { headers: headers };
    this.http.get('http://localhost:9090/task', requestOptions).subscribe(data => this.showData(data));
  }


  ngOnInit(): void {

  }

  showData(data:any){
    console.log(data);
      this.tasks=data;

  }
  editClick(id: number) {
    
      this.editEvent.emit(id);
    }
  

  removeClick(taskid: number) {
    var user=JSON.parse(localStorage.getItem("user")||"{}");
    let api_key=user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });

    const requestOptions = { headers: headers };
    this.http.delete('http://localhost:9090/task/'+taskid,requestOptions).subscribe(data=>{location.reload() ; });
  }

}
