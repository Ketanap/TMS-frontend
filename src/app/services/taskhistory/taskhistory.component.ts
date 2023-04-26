import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-taskhistory',
  templateUrl: './taskhistory.component.html',
  styleUrls: ['./taskhistory.component.css']
})
export class TaskhistoryComponent  {
  tasks!: any[];
  taskHistories!: any[];
  user: any;

  constructor(private http: HttpClient) {this.user = JSON.parse(localStorage.getItem("user") || "{}");
  let api_key = this.user.token;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${api_key}`
  });
  const requestOptions = { headers: headers };
  console.log(headers);
   }

  

    
}

