import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ClientAddComponent } from './services/client-add/client-add.component';
import { ClientDisplayComponent } from './services/client-display/client-display.component';
import { TaskstatusDisplayComponent } from './services/taskstatus-display/taskstatus-display.component';
import { TaskstatusAddComponent } from './services/taskstatus-add/taskstatus-add.component';
import { ProjectDisplayComponent } from './services/project-display/project-display.component';
import { ProjectAddComponent } from './services/project-add/project-add.component';
import { TaskDisplayComponent } from './services/task-display/task-display.component';
import { ProfileComponent } from './services/profile/profile.component';
import { ChangePasswordComponent } from './services/change-password/change-password.component';
import { LogoutComponent } from './services/logout/logout.component';
import { TaskAddComponent } from './services/task-add/task-add.component';
import { VerticalnavComponent } from './verticalnav/verticalnav.component';
import { AuthGuard } from './authGuard';
import { TaskhistoryComponent } from './services/taskhistory/taskhistory.component';
import { TaskeditComponent } from './services/taskedit/taskedit.component';

const routes: Routes = [
  //Site routes goes here 
  { 
    path: '', 
    component: NavbarComponent,
    children: [
      {path:'',component:HomeComponent, pathMatch: 'full'} ,
      {path:'signin',component:SigninComponent},
      {path:'verticalnav',component:VerticalnavComponent},
      {path:'signup',component:SignupComponent},
        ]
},

// App routes goes here here
{ 
    path: '',
    component: VerticalnavComponent, 
    children: [
      {path:'client',component:ClientDisplayComponent  ,canActivate: [AuthGuard], },
      {path:'taskstatus',component:TaskstatusDisplayComponent, canActivate: [AuthGuard],},
      {path:'project',component:ProjectDisplayComponent, canActivate: [AuthGuard],},
      {path:'task',component:TaskDisplayComponent, canActivate: [AuthGuard],},
      {path:'profile',component:ProfileComponent, canActivate: [AuthGuard],},
      {path:'changepassword',component:ChangePasswordComponent, canActivate: [AuthGuard],},
      {path:'logout',component:LogoutComponent, canActivate: [AuthGuard],},
      {path:'taskhistory',component:TaskhistoryComponent, canActivate: [AuthGuard],},
      {path:'clientadd',component:ClientAddComponent, canActivate: [AuthGuard],},
      {path:'projectadd',component:ProjectAddComponent, canActivate: [AuthGuard],},
      {path:'taskadd',component:TaskAddComponent, canActivate: [AuthGuard],},
      {path:'taskstatusadd',component:TaskstatusAddComponent, canActivate: [AuthGuard],},
      {path:'taskhistory',component:TaskhistoryComponent, canActivate: [AuthGuard],},
      {path:'taskedit',component:TaskeditComponent, canActivate: [AuthGuard],}
        ]
},


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
