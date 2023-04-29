import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit{
  @Input()
  ProjectName = "";
  ClientId = "";
  Client: any = [];
  Projectid= "";

  data={};
  user: any;
  

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { 
    this.user = JSON.parse(localStorage.getItem("user") || "{}");
  }


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
        this.http.get('http://localhost:9090/client/', requestOptions).subscribe(data =>this.showClient(data));
    
      }
    );
  }
  showClient(data:any){
    this.Client = data;

  }
  showData(data: any){
    if(data) {
    this.ProjectName = data.projectname;
    this.ClientId = data.clientid;
    }
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
          data => { 
            console.log(data);
            this.router.navigate(['../project']);
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.http.post('http://localhost:9090/project',
        { projectname: this.ProjectName, clientid: this.ClientId, roleid: 2 }, requestOptions)
        .subscribe(
          data => { 
            console.log(data);
            this.router.navigate(['../project']);
          },
          error => {
            console.log(error);
          }
        );
    }

  }
}
