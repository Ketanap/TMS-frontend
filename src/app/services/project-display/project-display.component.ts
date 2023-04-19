import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-project-display',
  templateUrl: './project-display.component.html',
  styleUrls: ['./project-display.component.css']
})
export class ProjectDisplayComponent {
  projects: any = [];

  @Output() editEvent = new EventEmitter<any>();
  ProjectName: any;
  ClientId: any;
  userId: any;
  user: any;
  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem("user") || "{}");
    let api_key = this.user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });

    const requestOptions = { headers: headers };
    this.http.get('http://localhost:9090/project', requestOptions).subscribe(data => this.showData(data));
  }


  ngOnInit(): void {

  }

  showData(data: any) {
     console.log(data);
    this.projects = data;

  }
  editClick(id: number) {
    if (this.user.user.roleid == 1) {
      this.editEvent.emit(id);
    }
  }

  removeClick(projectid: string) {
   
    if (this.user.user.roleid == 1) {
      let api_key = this.user.token;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`
      });

      const requestOptions = { headers: headers };
      console.log(projectid)
      this.http.delete('http://localhost:9090/project/' + projectid, requestOptions).subscribe(data => { location.reload(); });
    } else {
      alert("Permission not Granted")
    }

  }
}
