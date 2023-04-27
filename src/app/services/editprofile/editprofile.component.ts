import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {
  @Input()
   email: any;
   username: any;
   user: any;
   contact: any;
   userId: any;
  UserId: any;
  UserName: any;
  Email: any;
  Contact: any;
  Userid: any;
  userid: any;
   
 

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { 
    this.user = JSON.parse(localStorage.getItem("user") || "{}");
  }

  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params); // { orderby: "price" }
      this.Userid = params['id'];
      var user = JSON.parse(localStorage.getItem("user") || "{}");
      let api_key = user.token;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`
      });

      const requestOptions = { headers: headers };
      this.http.get('http://localhost:9090/user/' + this.Userid, requestOptions).subscribe(data => this.showData(data));
    });
  }
  
  showData(data: any) {
    console.log(data);
    
      this.username = data.username;
      this.email = data.email;
      this.contact = data.contact;
      
    
    
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
 
  if(this.userid)
  {
  this.http.put('http://localhost:9090/user/'+this.userid,
    { username:this.UserName,Email:this.Email,contact:this.Contact})
    .subscribe(
      data=>{location.reload() ; }
      );
  
  

  }else
  this.http.post('http://localhost:9090/user/login/',
    {  username:this.UserName,Email:this.Email,contact:this.Contact})
    .subscribe(
      data=>{location.reload() ; }
      );
    
  
  } 
}
