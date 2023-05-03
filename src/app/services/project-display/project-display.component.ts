import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-project-display',
  templateUrl: './project-display.component.html',
  styleUrls: ['./project-display.component.css']
})
export class ProjectDisplayComponent {
  projects: any = [];
  p: number = 1; 
  searchText: string = '';
  filteredprojects: any =[];
  
  @Output()
   editEvent = new EventEmitter<any>();
  user: any;
  project:any;
  Client:any;
 
  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem("user") || "{}");
    let api_key = this.user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });

    const requestOptions = { headers: headers };
    this.http.get('http://localhost:9090/project', requestOptions).subscribe(data => this.showData(data));
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
    this.projects = data;
    this.filteredprojects = this.projects;
  }

  editClick(id: number) {
    if (this.user.user.roleid == 1) {
      this.editEvent.emit(id);
    }
  }

  removeClick(projectid: string) {
    if (this.user.user.roleid == 1) {
      let api_key = this.user.token;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`
      });

      const requestOptions = { headers: headers };
      console.log(projectid)
      this.http.delete('http://localhost:9090/project/' + projectid, requestOptions).subscribe(data => { location.reload(); });
    } else {
      alert("Permission not Granted")
    }

  }

  searchData() {
    if (this.searchText !== '') {
      this.filteredprojects = this.projects.filter((project: any) => {
        const projectName = project.projectname ? project.projectname.toLowerCase() : '';
        const clientName = project.tblClient && typeof project.tblClient.clientname === 'string' ? project.tblClient.clientname.toLowerCase() : '';
        const clientId = project.clientid && typeof project.clientid === 'string' ? project.clientid.toLowerCase() : '';
        return projectName.includes(this.searchText.toLowerCase()) ||
               clientName.includes(this.searchText.toLowerCase()) ||
               clientId.includes(this.searchText.toLowerCase());
      });
    } else {
      this.filteredprojects = this.projects;
    }
  }
  
  
  
}
