import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {


  constructor(private HttpClient: HttpClient) {

  }

  getUsers(): Observable<User[]> {

    return this.HttpClient.get<User[]>( 'http://localhost:3000/users');

  }

  getTeachers():Observable<User[]>{
    return this.HttpClient.get<User[]>("http://localhost:3000/users?isTeacher=true");
  }

  getStudents():Observable<User[]>{
    return this.HttpClient.get<User[]>("http://localhost:3000/users?isTeacher=false");
  }

  updatePassword(user:User, newP:String): Observable<any>
  {
    const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    console.log(newP +  "=========INTRA" +user.id);
    return this.HttpClient.patch('http://localhost:3000/users/'+user.id, {password: newP});
  }

}
