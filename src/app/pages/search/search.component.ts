import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/course';
import { UserService } from 'src/app/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { EntryService } from 'src/app/entry-service.service';
import { User } from 'src/app/user';
import { CourseService } from 'src/app/course-service.service';
import { Entry } from 'src/app/entry';
import { EntryDetailsStudent } from 'src/app/entry-detalis-student';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private thisRoute: ActivatedRoute, private entryService: EntryService, private coursesService: CourseService,
    private UserService: UserService) { }


  loggedUser: User;
  teachers: User[] = [];
  unatendedCourses: Course[] = [];
  courses: Course[];
  entriesLoaded: boolean = false;
  entryDetalis: EntryDetailsStudent[] = [];
  entries: Entry[] = [];
  selectedEntry: EntryDetailsStudent;
  selectedCourse: Course;
  selectedTeacherCourse: Course;

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

  onSelectCourseClick() {
    if (!(this.selectedCourse === null) || (this.selectedCourse === undefined)) {
      let _entry = {
        id_course: this.selectedCourse.id,
        id_student: this.loggedUser.id,
        grade: 0

      };
      this.entryService.addEntry(_entry).subscribe(res => {
        window.location.reload();
      });

    }
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
              this.entryDetalis.push(new EntryDetailsStudent(entryDetalisIndex,this.diplayCourseName(entry), this.displayTeacherName(entry),0));
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

  diplayCourseName(entry: Entry): string {
    let returnString: string;
    this.courses.forEach(_course => {
      if (_course.id == entry.id_course)
        returnString = _course.name;
    });

    return returnString;
  }

}
