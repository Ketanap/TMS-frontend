import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-taskhistory',
  templateUrl: './taskhistory.component.html',
  styleUrls: ['./taskhistory.component.css']
})
export class TaskhistoryComponent  {
  tasks!: any[];
  histories!: any[];
  user: any;
  p: number = 1; 
  filteredHistories: any = [];
  searchText: string = '';

  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem("user") || "{}");
    let api_key = this.user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });

    const requestOptions = { headers: headers };
    this.http.get('http://localhost:9090/taskhistory', requestOptions).subscribe(data => this.showData(data));
  }

    showData(data:any) {
      console.log(data);
      this.histories = data;
    }
    searchData() {
      if (this.searchText !== '') {
        this.filteredHistories = this.histories.filter((taskhistory: any) => {
          return taskhistory.task.toLowerCase().includes(this.searchText.toLowerCase()) ||
          taskhistory.changedate.toLowerCase().includes(this.searchText.toLowerCase()) ||
          taskhistory.fromstatusid.toLowerCase().includes(this.searchText.toLowerCase()) ||
          taskhistory.tostatusid.toLowerCase().includes(this.searchText.toLowerCase());
        });
      } else {
        this.filteredHistories = this.histories;
      }
    }

    
}

