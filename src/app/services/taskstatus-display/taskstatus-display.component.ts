import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-taskstatus-display',
  templateUrl: './taskstatus-display.component.html',
  styleUrls: ['./taskstatus-display.component.css']
})
export class TaskstatusDisplayComponent {
  taskstatuses : any = [];

  @Output() editEvent= new EventEmitter<any>();
  constructor(private http: HttpClient) {
    var user=JSON.parse(localStorage.getItem("user")||"{}");
    let api_key=user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });

    const requestOptions = { headers: headers };
    this.http.get('http://localhost:9090/taskstatus', requestOptions).subscribe(data => this.showData(data));
  }


  ngOnInit(): void {

  }

  showData(data:any){
      this.taskstatuses=data;

  }
  editClick(id: number) {
    console.log(id);
    this.editEvent.emit(id);
    //location.reload();
  }

  removeClick(id: number) {
    this.http.delete('http://localhost:9090/client'+id).subscribe(data=>{location.reload() ; });
  }



}
