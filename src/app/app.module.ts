import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CourseService } from './course-service.service';
import { EntryService } from './entry-service.service';
import { UserService } from './user-service.service';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/student-home/home.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { SearchComponent } from './pages/search/search.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { TeacherHomeComponent } from './pages/teacher-home/teacher-home.component';
import { TeacherDetailsComponent } from './pages/teacher-details/teacher-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    StudentDetailsComponent,
    SearchComponent,
    MyAccountComponent,
    TeacherHomeComponent,
    TeacherDetailsComponent],
  imports: [
     CommonModule,
    BrowserModule,
    ClarityModule,
    NgbModule.forRoot(),
    HttpModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [UserService, CourseService, EntryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
