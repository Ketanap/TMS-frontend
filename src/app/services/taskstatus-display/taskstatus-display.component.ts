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
  Type: any;
  StatusName: any;
  userId: any;
  user:any;
  constructor(private http: HttpClient) {
    this.user=JSON.parse(localStorage.getItem("user")||"{}");
    let api_key=this.user.token;
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
    if (this.user.user.roleid == 1 ) { 
      this.editEvent.emit(id);
    }
  }

  removeClick(statusid: string) {
    if (this.user.user.roleid == 1 ) {
      let api_key=this.user.token;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`
      });
  
      const requestOptions = { headers: headers };
      console.log(statusid)
    this.http.delete('http://localhost:9090/taskstatus/'+statusid,requestOptions).subscribe(data=>{location.reload() ; });
  }
  else{
    alert("Permission not Granted")
  }
}



}
