import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user-service.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  constructor(private userService: UserService) { }

  passwordOld: string;
  passwordNew: string;
  passwordNew2: string;
  status: string;
  user: User;
  private data: User[] = new Array(50);
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.status = "";
    this.userService.getUsers().subscribe((result: User[]) => {
      this.data = result;
    });
  }

  onChange() {

    let ok = false;
    this.data.forEach(element => {
      if ((this.user.username === element.username) && (this.passwordOld === element.password)) {
        ok = true;
        if (this.passwordNew == this.passwordNew2) {

          this.userService.updatePassword(this.user, this.passwordNew);
          this.status = "Password changed!";
        }
        else {
          this.status = "Passwords do not match!";
        }
      }
    }
    );

    if (ok == false)
      this.status = "Wrong password!";
  }
}

