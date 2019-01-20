import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  status: string;
  private data: User[] = new Array(50);
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.userService.getUsers().subscribe((result: User[]) => {
      this.data = result;
    });
    this.status = "";

  }

  onClick() {

    if (!(this.username && this.password)) {
      this.status = "Enter username or password!";
    }
    else {

      this.status = "Login error!";

      this.data.forEach(element => {
        if ((this.username === element.username) && (this.password === element.password)) {


          localStorage.setItem('user', JSON.stringify(element));
          if (element.isTeacher == false)
            this.router.navigate(['/pages/student-home'], { queryParams: element });
        }
      });


    }
  }
}

