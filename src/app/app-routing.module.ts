import { NgModule } from '@angular/core';
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


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'signin',component:SigninComponent},
  {path:'verticalnav',component:VerticalnavComponent},
  {path:'signup',component:SignupComponent},

  
  {path:'client',component:ClientDisplayComponent},
  {path:'taskstatus',component:TaskstatusDisplayComponent},
  {path:'project',component:ProjectDisplayComponent},
  {path:'task',component:TaskDisplayComponent},
  {path:'profile',component:ProfileComponent},
  {path:'changepassword',component:ChangePasswordComponent},
  {path:'logout',component:LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
