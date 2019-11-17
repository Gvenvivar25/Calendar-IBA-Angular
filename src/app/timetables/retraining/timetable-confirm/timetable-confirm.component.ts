import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TimetableOfClassesService} from '../../../shared/services/timetable-of-classes.service';
import {GroupService} from '../../../dictionaries/groups/group.service';
import {Group} from '../../../dictionaries/groups/group.model';
import {Teacher} from '../../../dictionaries/teachers/teacher.model';
import {TeachersService} from '../../../dictionaries/teachers/teachers.service';
import {TimetableOfClasses} from '../../../shared/models/timetable-of-classes.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-timetable-confirm',
  templateUrl: './timetable-confirm.component.html',
  styleUrls: ['./timetable-confirm.component.scss']
})
export class TimetableConfirmComponent implements OnInit {
    @Output() closed = new EventEmitter();
    @Input() startDate: string;
    @Input() endDate: string;
    @Input() isConfirm: boolean;
    groups: Group[];
    teachers: Teacher[];
    timetables: any[];
    checkedTimetables: number[];
    masterSelected: boolean;

    confirmForPeriodForm: FormGroup;
    confirmForGroupForm: FormGroup;
    confirmForTeacherForm: FormGroup;
    constructor(private formBuilder: FormBuilder, private timetableOfClassesService: TimetableOfClassesService,
                private groupService: GroupService, private teacherService: TeachersService, private toastr: ToastrService) {
        this.masterSelected = false;

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

    checkUncheckAll() {
        for (let i = 0; i < this.timetables.length; i++) {
            this.timetables[i].isSelected = this.masterSelected;
        }
        this.getCheckedItemList();
    }
    isAllSelected() {
        this.masterSelected = this.timetables.every((item: any) => {
            return item.isSelected === true;
        });
        this.getCheckedItemList();
    }

    getCheckedItemList() {
        this.checkedTimetables = [];
        for (let i = 0; i < this.timetables.length; i++) {
            if (this.timetables[i].isSelected) {
                this.checkedTimetables.push(this.timetables[i].id);
            }
        }
      //  this.checkedList = JSON.stringify(this.checkedList);
    }

    onClose() {
        this.closed.emit();
    }

    loadTimetableToConfirmForPeriod() {
        const start = this.confirmForPeriodForm.get('startDate').value;
        const end = this.confirmForPeriodForm.get('endDate').value;
        const time = '?d1=' + start + '&d2=' + end;
        this.timetableOfClassesService.getTimetableOfClasses(time).subscribe(
            (data: TimetableOfClasses[]) => {
                this.timetables = [];
                for (let i = 0, len = Object.keys(data).length; i < len; i++) {
                    if (data[i].status === false && data[i].reserved === false) {
                        // не подтвержденные ивенты
                        this.timetables.push (
                            {
                                id: data[i].id,
                                title: data[i].disciplineDto.shortDisciplineName + ' ' +
                                    data[i].typeOfWork.short_value + ' гр. №' +
                                    data[i].groupDto.groupName + ' подгр. №' + data[i].subgroup,
                                isSelected: false
                            }
                        );
                    }
                }
            }
        );
    }

    loadTimetableToConfirmForGroup() {
        const start = this.confirmForGroupForm.get('startDate').value;
        const end = this.confirmForGroupForm.get('endDate').value;
        const time = '?d1=' + start + '&d2=' + end;
        const group = this.confirmForGroupForm.get('group').value;
        this.timetableOfClassesService.getTimetableOfClasses(time).subscribe(
            (data: TimetableOfClasses[]) => {
                this.timetables = [];
                for (let i = 0, len = Object.keys(data).length; i < len; i++) {
                    if (data[i].status === false && data[i].reserved === false && data[i].groupDto.id === group) {
                        // не подтвержденные ивенты
                        this.timetables.push (
                            {
                                id: data[i].id,
                                title: data[i].disciplineDto.shortDisciplineName + ' ' +
                                    data[i].typeOfWork.short_value + ' гр. №' +
                                    data[i].groupDto.groupName + ' подгр. №' + data[i].subgroup,
                                isSelected: false
                            }
                        );
                    }
                }
            }
        );
    }

    loadTimetableToConfirmForTeacher() {
        const start = this.confirmForTeacherForm.get('startDate').value;
        const end = this.confirmForTeacherForm.get('endDate').value;
        const time = '?d1=' + start + '&d2=' + end;
        const teacher = this.confirmForTeacherForm.get('teacher').value;
        this.timetableOfClassesService.getTimetableOfClasses(time).subscribe(
            (data: TimetableOfClasses[]) => {
                this.timetables = [];
                for (let i = 0, len = Object.keys(data).length; i < len; i++) {
                    if (data[i].status === false && data[i].reserved === false && data[i].teacherDto.id === teacher) {
                        // не подтвержденные ивенты
                        this.timetables.push (
                            {
                                id: data[i].id,
                                title: data[i].disciplineDto.shortDisciplineName + ' ' +
                                    data[i].typeOfWork.short_value + ' гр. №' +
                                    data[i].groupDto.groupName + ' подгр. №' + data[i].subgroup,
                                isSelected: false
                            }
                        );
                    }
                }
            }
        );
    }

    confirmTimetables() {
        console.log(this.checkedTimetables);
        if (this.checkedTimetables !== undefined && this.checkedTimetables.length !== 0) {
        this.timetableOfClassesService.confirmTimetable(this.checkedTimetables).subscribe();
        this.closed.emit();
        } else {
            this.toastr.error(`Ни одна запись не выбрана для подтверждения`, 'Ошибка');
        }
    }

    loadTimetableToCancelForPeriod() {
        const start = this.confirmForPeriodForm.get('startDate').value;
        const end = this.confirmForPeriodForm.get('endDate').value;
        const time = '?d1=' + start + '&d2=' + end;
        this.timetableOfClassesService.getTimetableOfClasses(time).subscribe(
            (data: TimetableOfClasses[]) => {
                this.timetables = [];
                for (let i = 0, len = Object.keys(data).length; i < len; i++) {
                    if (data[i].status === true && data[i].reserved === false) {
                        // не подтвержденные ивенты
                        this.timetables.push (
                            {
                                id: data[i].id,
                                title: data[i].disciplineDto.shortDisciplineName + ' ' +
                                    data[i].typeOfWork.short_value + ' гр. №' +
                                    data[i].groupDto.groupName + ' подгр. №' + data[i].subgroup,
                                isSelected: false
                            }
                        );
                    }
                }
            }
        );
    }

    loadTimetableToCancelForGroup() {
        const start = this.confirmForGroupForm.get('startDate').value;
        const end = this.confirmForGroupForm.get('endDate').value;
        const time = '?d1=' + start + '&d2=' + end;
        const group = this.confirmForGroupForm.get('group').value;
        this.timetableOfClassesService.getTimetableOfClasses(time).subscribe(
            (data: TimetableOfClasses[]) => {
                this.timetables = [];
                for (let i = 0, len = Object.keys(data).length; i < len; i++) {
                    if (data[i].status === true && data[i].reserved === false && data[i].groupDto.id === group) {
                        // не подтвержденные ивенты
                        this.timetables.push (
                            {
                                id: data[i].id,
                                title: data[i].disciplineDto.shortDisciplineName + ' ' +
                                    data[i].typeOfWork.short_value + ' гр. №' +
                                    data[i].groupDto.groupName + ' подгр. №' + data[i].subgroup,
                                isSelected: false
                            }
                        );
                    }
                }
            }
        );
    }

    loadTimetableToCancelForTeacher() {
        const start = this.confirmForTeacherForm.get('startDate').value;
        const end = this.confirmForTeacherForm.get('endDate').value;
        const time = '?d1=' + start + '&d2=' + end;
        const teacher = this.confirmForTeacherForm.get('teacher').value;
        this.timetableOfClassesService.getTimetableOfClasses(time).subscribe(
            (data: TimetableOfClasses[]) => {
                this.timetables = [];
                for (let i = 0, len = Object.keys(data).length; i < len; i++) {
                    if (data[i].status === true && data[i].reserved === false && data[i].teacherDto.id === teacher) {
                        // не подтвержденные ивенты
                        this.timetables.push (
                            {
                                id: data[i].id,
                                title: data[i].disciplineDto.shortDisciplineName + ' ' +
                                    data[i].typeOfWork.short_value + ' гр. №' +
                                    data[i].groupDto.groupName + ' подгр. №' + data[i].subgroup,
                                isSelected: false
                            }
                        );
                    }
                }
            }
        );
    }

    cancelTimetables() {
        console.log(this.checkedTimetables);
        if (this.checkedTimetables !== undefined && this.checkedTimetables.length !== 0) {
            this.timetableOfClassesService.cancelTimetable(this.checkedTimetables).subscribe();
            this.closed.emit();
        } else {
            this.toastr.error(`Ни одна запись не выбрана для отмены`, 'Ошибка');
        }
    }

}
