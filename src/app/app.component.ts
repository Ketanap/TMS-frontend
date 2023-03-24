import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'taskboard';
  isLogin:boolean =false;

  ngOnInit(): void {
    console.log(localStorage.getItem("user"));
    if(localStorage.getItem("user"))
    {
      console.log("user");
     this.isLogin=true;
    }
  }  
    
  }
