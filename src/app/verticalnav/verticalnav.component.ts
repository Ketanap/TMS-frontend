import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verticalnav',
  templateUrl: './verticalnav.component.html',
  styleUrls: ['./verticalnav.component.css']
})
export class VerticalnavComponent {
  constructor(private router: Router) {}


  
  onLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/signin']);
   }

}
