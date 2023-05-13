import { Component, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-taskhistory',
  templateUrl: './taskhistory.component.html',
  styleUrls: ['./taskhistory.component.css']
})
export class TaskhistoryComponent {
  histories: any = [];
  p: number = 1;
  filteredhistories: any = [];
  searchText: string = '';

  @Output()
  data: any;
  user: any;
  changeDate: any;
  fromstatusid: any;
  tostatusid: any;
  description: any;



  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem("user") || "{}");
    let api_key = this.user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });

    const requestOptions = { headers: headers };

    this.http.get('http://localhost:9090/taskhistory/', requestOptions).subscribe(data => this.showData(data));
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
    this.histories = data;
    this.filteredhistories = this.histories;
  }
  searchData() {
    if (this.searchText !== '') {
      this.filteredhistories = this.histories.filter((history: any) => {
        const Description = history.description ? history.description.toLowerCase() : '';
        const ChangeDate = history.changedate ? history.changedate.toLowerCase() : '';
        const FromstatusId = history.fromstatusid && typeof history.fromstatusid === 'string' ? history.fromstatusid.toLowerCase() : '';
        const TostatusId = history.tostatusid && typeof history.tostatusid === 'string' ? history.tostatusid.toLowerCase() : '';


        return Description.includes(this.searchText.toLowerCase()) ||
          ChangeDate.includes(this.searchText.toLowerCase()) ||
          FromstatusId.includes(this.searchText.toLocaleLowerCase) ||
          TostatusId.includes(this.searchText.toLowerCase());
      });
    } else {
      this.filteredhistories = this.histories;
    }
  }
  
  

}
