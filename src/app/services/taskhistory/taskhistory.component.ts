import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-taskhistory',
  templateUrl: './taskhistory.component.html',
  styleUrls: ['./taskhistory.component.css']
})
export class TaskhistoryComponent implements OnInit {
  tasks!: any[];
  taskHistories!: any[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Fetch tasks
    this.http.get<any[]>('http://localhost:9090/task')
      .subscribe(tasks => {
        this.tasks = tasks;
        this.fetchTaskHistory();
      }, error => {
        console.log('Error fetching tasks: ', error);
      });
  }

  fetchTaskHistory(): void {
    // Fetch task histories
    this.http.get<any[]>('http://localhost:9090/taskhistory')
      .subscribe(histories => {
        this.taskHistories = histories.map(history => {
          // Find task by ID
          const task = this.tasks.find(t => t.taskid === history.taskid);
          // Extract required data
          return {
            taskId: history.taskid,
            status: task ? task.status : '',
            completedDate: history.completeddate
          };
        });
      }, error => {
        console.log('Error fetching task histories: ', error);
      });
  }
}
