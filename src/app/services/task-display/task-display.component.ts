import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
  
@Component({
  selector: 'app-task-display',
  templateUrl: './task-display.component.html',
  styleUrls: ['./task-display.component.css']
})
export class TaskDisplayComponent {
  tasks: any = [];
  filteredTasks: any = [];
  p: number = 1; 
  searchText: string = '';
  startDate: string = '';
  endDate: string = '';
  statusSortOption: string = '';
  @Output() editEvent= new EventEmitter<any>();
  TaskDate: any;
  UserId: any;
  userid: any;
  ProjectId: any;
  StatusId: any;
  Description: any;
  ExpectedTime: any;
  ActualTime: any;
  DueDate: any;
  ComletedDate: any;
  Completed: any;
  ChangeStatus: any;
  user: any;
  constructor(private http: HttpClient) {
    this.user=JSON.parse(localStorage.getItem("user")||"{}");
    let api_key=this.user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });
  
    const requestOptions = { headers: headers };
    if (this.user.user.roleid == 1) {
      this.http.get('http://localhost:9090/task', requestOptions).subscribe(data => this.showData(data));
    } else {
      const userId = this.user.user.userid; // Assuming user ID is present in the user object
      this.http.get(`http://localhost:9090/task/user/${userId}`, requestOptions).subscribe(data => this.showData(data));
    }
  }
  
  ngOnInit(): void {
    this.startDate = '';
  this.endDate = '';                          
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
    this.tasks = data;
    this.filteredTasks = data;
    

 
   
    
    
  }

  editClick(id: number) {
    this.editEvent.emit(id);
  }
  
  removeClick(taskid: number) {
    var user = JSON.parse(localStorage.getItem("user") || "{}");
    let api_key = user.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });

    const requestOptions = { headers: headers };
    this.http.delete('http://localhost:9090/task/' + taskid, requestOptions).subscribe(data => { location.reload(); });
  }

  
    
   
  

  searchData() {
    if (this.searchText !== '') {
      this.filteredTasks = this.tasks.filter((task: any) => {
        const taskDescription = task.description ? task.description.toLowerCase() : '';
        const projectName = task.tblProject && typeof task.tblProject.projectname === 'string' ? task.tblProject.projectname.toLowerCase() : '';
        const taskDate = task.taskdate ? task.taskdate.toLowerCase() : '';
        const DueDate = task.duedate ? task.duedate.toLowerCase() : '';
        const userName = task.tblUser && typeof task.tblUser.username === 'string' ? task.tblUser.username.toLowerCase() : '';
        const taskStatus = task.tblTaskstatus && typeof task.tblTaskstatus.statusname === 'string' ? task.tblTaskstatus.statusname.toLowerCase() : '';
    
        return taskDescription.includes(this.searchText.toLowerCase()) ||
        taskDate.includes(this.searchText.toLowerCase()) ||
        DueDate.includes(this.searchText.toLowerCase()) ||
               taskStatus.includes(this.searchText.toLowerCase()) ||
              userName.includes(this.searchText.toLowerCase()) ||
               projectName.includes(this.searchText.toLowerCase());
               
      });
    } else {
      this.filteredTasks = this.tasks;
    }
  }
  filterByDate() {
    if (this.startDate && this.endDate) {
      this.filteredTasks = this.tasks.filter((task: any) => {
        const taskDate = new Date(task.taskdate);
        return taskDate >= new Date(this.startDate) && taskDate <= new Date(this.endDate);
      });
    } else {
      this.filteredTasks = this.tasks;
    }
  }
  sortData() {
    if (this.statusSortOption !== '') {
      this.filteredTasks = this.tasks.filter((task: any) => task.tblTaskstatus.statusname === this.statusSortOption);
    } else {
      this.filteredTasks = this.tasks;
    }
  }
  
  
}
