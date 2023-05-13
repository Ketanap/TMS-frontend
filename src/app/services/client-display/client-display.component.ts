import { Component, EventEmitter, Output} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { Client } from '../client.model';


@Component({
  selector: 'app-client-display',
  templateUrl: './client-display.component.html',
  styleUrls: ['./client-display.component.css']
})
export class ClientDisplayComponent {
  clients: any = [];
  p: number = 1; 
  filteredClients: any = [];
  searchText: string = '';

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
    const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.searchData();
      }
    });
  }
  }

  showData(data: any) {
    console.log(data);
    this.clients = data;
    this.filteredClients = this.clients;
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
    } else {
      alert("Permission not Granted")
    }
  }

  searchData() {
    if (this.searchText !== '') {
      this.filteredClients = this.clients.filter((client: any) => {
        return client.clientname.toLowerCase().includes(this.searchText.toLowerCase()) ||
        client.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
        client.contact.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.filteredClients = this.clients;
    }
  }
  exportToExcel() {
    // Prepare the data in the format required by xlsx
    const data = this.filteredClients.map((client: Client) => ({
      'Client Name': client.clientname,
      'Email': client.email,
      'Contact': client.contact
    }));
  

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clients');

    // Generate a file name
    const fileName = 'clients.xlsx';

    // Export the workbook to Excel file
    XLSX.writeFile(workbook, fileName);
  }

}