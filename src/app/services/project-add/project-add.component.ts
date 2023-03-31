import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent {
  @Input() ProjectId = "";
  ProjectName = "";
  ClientId = "";
  constructor(private http: HttpClient) { }

  ngOnInit() { }
  OnSubmit() {
    this.http.post('http://localhost:9090/project',
      {projectid: this.ProjectId, projectname: this.ProjectName, clientid: this.ClientId, roleid: 2 })
      .subscribe(
        data => { location.reload(); }
      );
  }


}
