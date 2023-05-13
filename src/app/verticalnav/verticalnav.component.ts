import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verticalnav',
  templateUrl: './verticalnav.component.html',
  styleUrls: ['./verticalnav.component.css']
})
export class VerticalnavComponent {
  @ViewChild('sidebarTrigger') sidebarTrigger!: ElementRef;

  constructor(private router: Router) { }



  onLogout() {
    const currentUrl = this.router.url;
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('user');
      this.router.navigate(['/signin']);
    } else {
      this.router.navigateByUrl(currentUrl);
    }
  }

}
