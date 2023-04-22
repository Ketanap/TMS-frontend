import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output} from '@angular/core';


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
  userId: any;
  user:any;
  
  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(this.user);
    let api_key = this.user.token;
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
    console.log(data);
    this.clients = data;
  }

  editClick(id: number) {
    
    if (this.user.user.roleid == 1 ) { 
      this.editEvent.emit(id);
    }
  }

  removeClick(clientid: string) {

    if (this.user.user.roleid == 1 ) {
      let api_key = this.user.token;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`
      });
      const requestOptions = { headers: headers };
      console.log(clientid);
      this.http.delete('http://localhost:9090/client/'+clientid,requestOptions ).subscribe(data=>{location.reload() ; });
    }else{
      alert("Permission not Granted")
    }
  }

}
