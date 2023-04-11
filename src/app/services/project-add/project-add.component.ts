import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit{
  @Input()
  ProjectName = "";
  ClientId = "";
  Projectid: any;
  data={};

  constructor(private http: HttpClient,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.Projectid=params['id'];
        var user = JSON.parse(localStorage.getItem("user") || "{}");
        let api_key = user.token;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api_key}`
        });
    
        const requestOptions = { headers: headers };
        this.http.get('http://localhost:9090/project/'+this.Projectid, requestOptions).subscribe(data =>this.showData(data));
    
      }
    );
  }
  showData(data: any){
    this.ProjectName = data.projectname;
    this.ClientId = data.clientid;
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
    if (this.Projectid) {
      this.http.put('http://localhost:9090/project/' + this.Projectid,
        { projectname: this.ProjectName, clientid: this.ClientId, roleid: 2 }, requestOptions)
        .subscribe(
          data => { location.reload(); }
        );
    } else {
      this.http.post('http://localhost:9090/project',
        { projectname: this.ProjectName, clientid: this.ClientId, roleid: 2 }, requestOptions)
        .subscribe(
          data => { location.reload(); }
        );
    }

  }
}
