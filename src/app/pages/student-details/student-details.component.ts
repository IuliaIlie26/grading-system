import { Component, OnInit, Input } from '@angular/core';
import { EntryDetailsStudent } from 'src/app/entry-detalis-student';
import { EntryService } from 'src/app/entry-service.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  @Input()
   entry: EntryDetailsStudent;

  constructor(private entryService: EntryService) { }

  ngOnInit() {
  }

  onClick(){
    this.entryService.deleteEntry(this.entry).subscribe(res => {
      window.location.reload();
    });
  }
}
