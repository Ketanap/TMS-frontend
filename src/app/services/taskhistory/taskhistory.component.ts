import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-taskhistory',
  templateUrl: './taskhistory.component.html',
  styleUrls: ['./taskhistory.component.css']
})
export class TaskhistoryComponent {
  addresses : any = [];

  @Output() editEvent= new EventEmitter<any>();
  constructor(private http: HttpClient) {
        this.http.get('http://localhost:9090/taskhistory').subscribe(data=>this.showData(data) );
     }
     

  ngOnInit(): void {
 
  }
 
  showData(data:any){
      this.addresses=data;
      console.log(this.addresses[0]);
  }
  editClick(id: number) {
    console.log(id);
    this.editEvent.emit(id);
    //location.reload();
  }

  removeClick(id: number) {
    this.http.delete('http://localhost:9090/taskhistory'+id).subscribe(data=>{location.reload() ; });
  }



}
