import { Component, OnInit } from '@angular/core';
import { EntryService } from 'src/app/entry-service.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user-service.service';
import { CourseService } from 'src/app/course-service.service';
import { User } from 'src/app/user';
import { Course } from 'src/app/course';
import { Entry } from 'src/app/entry';
import { EntryDetailsStudent } from 'src/app/entry-detalis-student';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedUser: User;
  teachers: User[] = [];
  unatendedCourses: Course[] = [];
  courses: Course[];
  entriesLoaded: boolean = false;
  entryDetalis: EntryDetailsStudent[] = [];
  entries: Entry[] = [];
  selectedEntry: EntryDetailsStudent;

  constructor(private thisRoute: ActivatedRoute, private entryService: EntryService, private coursesService: CourseService,
    private UserService: UserService) { }

  ngOnInit() {

    this.loggedUser = JSON.parse(localStorage.getItem('user'));

    this.UserService.getTeachers().subscribe((_teachers: User[]) => {
      this.teachers = _teachers;

      this.coursesService.getCourses().subscribe((res: Course[]) => {
        res.forEach(element => {
          this.unatendedCourses.push(element);
        });
        this.courses = res;
        this.getEntriesForLoggedStudent();
      });
    });

  }
  getEntriesForLoggedStudent() {
    this.entryService.getEntriesForStudent(this.loggedUser.id).subscribe((_entries: Entry[]) => {
      if (_entries.length > 0) {
        let unatCoursesAux: Course[] = [];
        this.unatendedCourses.forEach((element: Course) => {

          let isContained: boolean = false;

          let entryDetalisIndex: number = 0;

          _entries.forEach((entry: Entry) => {
            if (entry.id_course == element.id) {
              isContained = true;
              this.entryDetalis.push(new EntryDetailsStudent(entryDetalisIndex, this.diplayCourseName(entry), this.displayTeacherName(entry), 0));
            }
            entryDetalisIndex++;
          });
          if (!isContained) {
            unatCoursesAux.push(element);
          }
        });
        this.entries = _entries;
        this.unatendedCourses = unatCoursesAux;
      }
      this.entriesLoaded = true;
    });
  }
  getId(entry: Entry): number {
    let id: number;
    this.courses.forEach(_course => {
      if (_course.id == entry.id_course)
        id = entry.id;
    });

    return id;
  }

  onSelect(entry: EntryDetailsStudent): void {
    this.selectedEntry = entry;
  }


  diplayCourseName(entry: Entry): string {
    let returnString: string;
    this.courses.forEach(_course => {
      if (_course.id == entry.id_course)
        returnString = _course.name;
    });

    return returnString;
  }

  displayTeacherName(entry: Entry): string {
    let returnString: string;

    this.courses.forEach(_course => {
      if (entry.id_course == _course.id)
        this.teachers.forEach(_teacher => {
          if (_course.id_teacher == _teacher.id)
            returnString = _teacher.name;
        });
    });
    return returnString;
  }
}
