import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TimetableOfClassesService} from '../../../shared/services/timetable-of-classes.service';
import {GroupService} from '../../../dictionaries/groups/group.service';
import {Group} from '../../../dictionaries/groups/group.model';
import {Teacher} from '../../../dictionaries/teachers/teacher.model';
import {TeachersService} from '../../../dictionaries/teachers/teachers.service';

@Component({
  selector: 'app-timetable-confirm',
  templateUrl: './timetable-confirm.component.html',
  styleUrls: ['./timetable-confirm.component.scss']
})
export class TimetableConfirmComponent implements OnInit {
    @Output() closed = new EventEmitter();
    @Input() startDate: string;
    @Input() endDate: string;
    groups: Group[];
    teachers: Teacher[];

    confirmForPeriodForm: FormGroup;
    confirmForGroupForm: FormGroup;
    confirmForTeacherForm: FormGroup;
    constructor(private formBuilder: FormBuilder, private timetableOfClassesService: TimetableOfClassesService,
                private groupService: GroupService, private teacherService: TeachersService) {

    }

  ngOnInit() {
      this.groupService.getGroups().subscribe((res: Group []) => {
            this.groups = res;
        });
      this.teacherService.getTeachers().subscribe((res: Teacher []) => {
          this.teachers = res;
      });
      this.confirmForPeriodForm = this.formBuilder.group({
          startDate: [this.startDate, Validators.required],
          endDate: [this.endDate, Validators.required],
      });

      this.confirmForGroupForm = this.formBuilder.group({
          startDate: [this.startDate, Validators.required],
          endDate: [this.endDate, Validators.required],
          group: [[], Validators.required],
      });

      this.confirmForTeacherForm = this.formBuilder.group({
          startDate: [this.startDate, Validators.required],
          endDate: [this.endDate, Validators.required],
          teacher: [[], Validators.required],
      });
  }

    loadTimetableToConfirmForPeriod() {
        const start = this.confirmForPeriodForm.get('startDate').value;
        const end = this.confirmForPeriodForm.get('endDate').value;
        this.timetableOfClassesService.confirmTimetableForPeriod(start, end).subscribe();
        this.closed.emit();

    }

    loadTimetableToConfirmForGroup() {
        const start = this.confirmForGroupForm.get('startDate').value;
        const end = this.confirmForGroupForm.get('endDate').value;
        const group = this.confirmForGroupForm.get('group').value;
        this.timetableOfClassesService.confirmTimetableForGroup(start, end, group).subscribe();
        this.closed.emit();
    }

    loadTimetableToConfirmForTeacher() {
        const start = this.confirmForTeacherForm.get('startDate').value;
        const end = this.confirmForTeacherForm.get('endDate').value;
        const teacher = this.confirmForTeacherForm.get('teacher').value;
        this.timetableOfClassesService.confirmTimetableForTeacher(start, end, teacher).subscribe();
        this.closed.emit();
    }

}
