import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/student-home/home.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { SearchComponent } from './pages/search/search.component';
import { TeacherHomeComponent } from './pages/teacher-home/teacher-home.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'pages/student-home', component: HomeComponent },
  { path: 'pages/teacher-home', component: TeacherHomeComponent },
  { path: 'pages/search', component: SearchComponent },
  { path: 'pages/my-account', component: MyAccountComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
