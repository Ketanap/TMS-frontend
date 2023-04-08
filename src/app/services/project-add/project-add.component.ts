import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent {
  @Input() 
  ProjectName = "";
  ClientId = "";
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
    this.http.post('http://localhost:9090/project',
      { projectname: this.ProjectName, clientid: this.ClientId, roleid: 2 },requestOptions)
      .subscribe(
        data => { location.reload(); }
      );
  }


}
