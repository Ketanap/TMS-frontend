import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClientDisplayComponent } from './services/client-display/client-display.component';
import { ClientAddComponent } from './services/client-add/client-add.component';
import { TaskstatusDisplayComponent } from './services/taskstatus-display/taskstatus-display.component';
import { TaskstatusAddComponent } from './services/taskstatus-add/taskstatus-add.component';
import { ProjectDisplayComponent } from './services/project-display/project-display.component';
import { ProjectAddComponent } from './services/project-add/project-add.component';
import { TaskDisplayComponent } from './services/task-display/task-display.component';
import { TaskAddComponent } from './services/task-add/task-add.component';
import { ProfileComponent } from './services/profile/profile.component';
import { ChangePasswordComponent } from './services/change-password/change-password.component';
import { LogoutComponent } from './services/logout/logout.component';
import { VerticalnavComponent } from './verticalnav/verticalnav.component';
import { ChangestatusComponent } from './services/changestatus/changestatus.component';
import { TaskeditComponent } from './services/taskedit/taskedit.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgxPaginationModule}  from 'ngx-pagination';
import { TaskhistoryComponent } from './services/taskhistory/taskhistory.component';
import { EditprofileComponent } from './editprofile/editprofile.component';







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    NavbarComponent,
    ClientDisplayComponent,
    ClientAddComponent,
    TaskstatusDisplayComponent,
    TaskstatusAddComponent,
    ProjectDisplayComponent,
    ProjectAddComponent,
    TaskDisplayComponent,
    TaskAddComponent,
    ProfileComponent,
    ChangePasswordComponent,
    LogoutComponent,
    VerticalnavComponent,
    ChangestatusComponent,
    TaskeditComponent,
    PaginationComponent,
    TaskhistoryComponent,
    EditprofileComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
