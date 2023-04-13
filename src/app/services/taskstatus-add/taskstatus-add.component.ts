import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-taskstatus-add',
  templateUrl: './taskstatus-add.component.html',
  styleUrls: ['./taskstatus-add.component.css']
})
export class TaskstatusAddComponent implements OnInit {
  @Input()
  StatusName = "";
  Type = "";
  Statusid: any;
  data ={};
  

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() { 
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.Statusid=params['id'];
        var user = JSON.parse(localStorage.getItem("user") || "{}");
        let api_key = user.token;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api_key}`
        });
    
        const requestOptions = { headers: headers };
        this.http.get('http://localhost:9090/taskstatus/'+this.Statusid, requestOptions).subscribe(data =>this.showData(data));
    
      }
    );
  }
  showData(data: any){
    this.StatusName = data.statusname;
    this.Type = data.type;
  }
  OnSubmit() {
    var user=JSON.parse(localStorage.getItem("user")||"{}");
    let api_key=user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });
    const requestOptions = { headers: headers };
    console.log(headers);
    if (this.Statusid) {
      this.http.put('http://localhost:9090/taskstatus/' + this.Statusid,
      {  statusname: this.StatusName, type: this.Type, roleid: 2 },requestOptions)
        .subscribe(
          data => {
            console.log(data);
            // Navigate to taskstatus page
            this.router.navigate(['/taskstatus']);
          },
          error => {
            console.log(error);
          }
        );
    } else {
    this.http.post('http://localhost:9090/taskstatus',
      {  statusname: this.StatusName, type: this.Type, roleid: 2 },requestOptions)
      .subscribe(
        data => {
          console.log(data);
          // Navigate to taskstatus page
          this.router.navigate(['/taskstatus']);
        },
        error => {
          console.log(error);
        }
      );
  }}

}
