import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-client-display',
  templateUrl: './client-display.component.html',
  styleUrls: ['./client-display.component.css']
})
export class ClientDisplayComponent {
  clients: any = [];

  @Output() editEvent = new EventEmitter<any>();
  ClientName: any;
  Email: any;
  Contact: any;
  constructor(private http: HttpClient) {
    var user = JSON.parse(localStorage.getItem("user") || "{}");
    let api_key = user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });

    const requestOptions = { headers: headers };
    this.http.get('http://localhost:9090/client', requestOptions).subscribe(data => this.showData(data));
  }

  ngOnInit(): void {
  }

  showData(data: any) {
    this.clients = data;
  }

  editClick(id: number) {
  }

  removeClick(clientid:string) {
    this.http.delete('http://localhost:9090/client/'+clientid).subscribe(data=>{location.reload() ; });
  }

}



