import { Component, OnInit, Input } from '@angular/core';
import { EntryDetailsTeacher } from 'src/app/entry-details-teacher';
import { EntryService } from 'src/app/entry-service.service';
import { User } from 'src/app/user';
import { Entry } from 'src/app/entry';
import { Course } from 'src/app/course';
import { UserService } from 'src/app/user-service.service';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnInit {

  @Input()
  course: Course;
  newGrade: number;
  loggedUser: User;
  entries: Entry[] = [];
  entriesTeachers: EntryDetailsTeacher[] = [];
  selectedEntriesTeachers: EntryDetailsTeacher;
  teachersStudents: User[] = [];
  teachersSelectedStudent: User;

  constructor(private entryService: EntryService, private UserService: UserService) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.getEntriesForLoggedTeacher();
  }

  getEntriesForLoggedTeacher() {
    this.entryService.getEntriesForTeacher(this.course.id).subscribe((_entries: Entry[]) => {
      let index = 0;
      this.UserService.getStudents().subscribe((_students: User[]) => {
        _entries.forEach((_entry: Entry) => {
          _students.forEach((_student: User) => {
            if (_entry.id_student == _student.id) {
              this.entriesTeachers.push(new EntryDetailsTeacher(index++, _student.name, _entry.grade));
              this.teachersStudents.push(_student);
            }
          });
        });
      });
      this.entries = _entries;
    });
  }

  updateGrade() {
    this.selectedEntriesTeachers.grade = this.newGrade;
    this.entryService.updateEntryDetailsTeacher(this.selectedEntriesTeachers).subscribe(res => {
      window.location.reload();
    });
  }
}
