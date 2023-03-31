import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-taskstatus-add',
  templateUrl: './taskstatus-add.component.html',
  styleUrls: ['./taskstatus-add.component.css']
})
export class TaskstatusAddComponent {
  @Input()
  Id = "";
  StatusId = "";
  StatusName = "";
  Type = "";
  constructor(private http: HttpClient) { }

  ngOnInit() { }
  OnSubmit() {
    this.http.post('http://localhost:9090/taskstatus',
      { id: this.Id,statusid: this.StatusId, statusname: this.StatusName, type: this.Type, roleid: 2 })
      .subscribe(
        data => { location.reload(); }
      );
  }

}
