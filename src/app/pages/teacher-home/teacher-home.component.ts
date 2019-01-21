import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { EntryDetailsTeacher } from 'src/app/entry-details-teacher';
import { Course } from 'src/app/course';
import { CourseService } from 'src/app/course-service.service';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent implements OnInit {
  loggedUser: User;
  selectedCourse: EntryDetailsTeacher;
  courses: Course[] = [];
  course: Course;

  constructor(private coursesService: CourseService) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.coursesService.getCourseForTeacher(this.loggedUser.id).subscribe((_res: Course[]) => {
      _res.forEach(

        (course : Course) => {

          this.courses.push(course);
        }
      );
   
    });
  }

  onSelect(entry: EntryDetailsTeacher): void {
    this.selectedCourse = entry;
  }


}