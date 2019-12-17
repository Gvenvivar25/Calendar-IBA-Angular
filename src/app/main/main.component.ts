import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {EventInput} from '@fullcalendar/core';
import timeGrigPlugin from '@fullcalendar/timegrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import Tooltip from 'tooltip.js';
import {TimetableOfClasses} from '../shared/models/timetable-of-classes.model';
import {TimetableOfClassesService} from '../shared/services/timetable-of-classes.service';
import {Group} from '../shared/models/group.model';
import {Teacher} from '../shared/models/teacher.model';
import {Classroom} from '../shared/models/classroom.model';
import {GroupService} from '../shared/services/group.service';
import {TeachersService} from '../shared/services/teachers.service';
import {ClassroomService} from '../shared/services/classroom.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: []
})

export class MainComponent implements OnInit {
    tooltip: Tooltip;
    timetableOfClasses: TimetableOfClasses [];
    calendarEvents: EventInput [];
    time: string;

    group;
    groups: Group[];
    teacher;
    teachers: Teacher[];
    classroom;
    classrooms: Classroom[];

    filter: string;
    isGroup: boolean;
    isTeacher: boolean;
    isClassroom: boolean;

    @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;




    // ------------------- настройки отображения расписания ----------------------------------//

    calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin, listPlugin];

    buttonText = {
        today:    'Сегодня',
        month:    'Месяц',
        week:     'Неделя',
        day:      'День',
        list:     'Список'
    };
    header = {
        left: 'dayGridMonth,timeGridWeek,timeGridDay,',
        center: 'title',
        right:  'prev,next today'};

    slotLabelFormat = {
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: false,
        meridiem: 'short'};

    // ------------------- конец настроек расписания ----------------------------------//
    constructor(private timetableOfClassesService: TimetableOfClassesService, private groupService: GroupService,
                private teacherService: TeachersService,
                private classroomService: ClassroomService) {  }

    ngOnInit(): void {
        this.isGroup = false;
        this.isTeacher = false;
        this.isClassroom = true;

        this.groupService.getGroups().subscribe((res: Group[]) => {
            this.groups = res;
        });
        this.teacherService.getTeachers().subscribe((res: Teacher[]) => {
            this.teachers = res;
        });
        this.classroomService.getClassrooms().subscribe((res: Classroom[]) => {
            this.classrooms = res;
        });
    }
    loadClassroomEvents() {
        this.isGroup = false;
        this.isTeacher = false;
        this.isClassroom = true;
        this.group = null;
        this.teacher = null;
        this.getDaysPeriod();
    }

    loadGroupEvents() {
        this.isGroup = true;
        this.isTeacher = false;
        this.isClassroom = false;
        this.teacher = null;
        this.classroom = null;
        this.getDaysPeriod();
    }

    loadTeacherEvents() {
        this.isGroup = false;
        this.isTeacher = true;
        this.isClassroom = false;
        this.classroom = null;
        this.group = null;
        this.getDaysPeriod();
    }

    loadOneClassroomEvents() {
        if (this.classroom != null) {
            this.timetableOfClassesService.getTimetableOfClassesOfClassroom(this.time, this.classroom)
                .subscribe( (data: TimetableOfClasses[]) => {
                    this.timetableOfClasses = data;
                    console.log(this.timetableOfClasses);
                    this.calendarEvents = [];

                    // конвертация объектов из БД в event на календарь
                    for (let i = 0, len = Object.keys(data).length; i < len; i++) {
                        if (this.isClassroom) {
                            this.calendarEvents.push(
                                {
                                    title: data[i].classroomDto.number,
                                    start: data[i].classDate + 'T' + data[i].beginTime,
                                    end: data[i].classDate + 'T' + data[i].finishTime,
                                    description: data[i].beginTime.toString().substring(0, 5) + '-' +
                                        data[i].finishTime.toString().substring(0, 5) + ', ' + data[i].disciplineDto.shortDisciplineName +
                                        ' ' + data[i].teacherDto.lastName + ' ' + data[i].teacherDto.firstName.substring(0, 1) + '.' +
                                        data[i].teacherDto.patronymic.substring(0, 1) + '. ' + ', к. ' + data[i].classroomDto.number +
                                        ' гр. ' + data[i].groupDto.groupName + '-' + data[i].subgroup,
                                    color: data[i].classroomDto.color,
                                }
                            );
                        }
                    }
                //    console.log(this.calendarEvents);
                });
        } else {this.getDaysPeriod(); }
    }

    loadOneTeacherEvents() {
        if (this.teacher != null) {
            this.timetableOfClassesService.getTimetableOfClassesOfTeacher(this.time, this.teacher)
                .subscribe( (data: TimetableOfClasses[]) => {
                    this.timetableOfClasses = data;
                    console.log(this.timetableOfClasses);
                    this.calendarEvents = [];

                    // конвертация объектов из БД в event на календарь
                    for (let i = 0, len = Object.keys(data).length; i < len; i++) {
                        if (this.isTeacher) {
                            this.calendarEvents.push(
                                {
                                    title: data[i].teacherDto.lastName,
                                    start: data[i].classDate + 'T' + data[i].beginTime,
                                    end: data[i].classDate + 'T' + data[i].finishTime,
                                    description: data[i].beginTime.toString().substring(0, 5) + '-' +
                                        data[i].finishTime.toString().substring(0, 5) + ', ' + data[i].disciplineDto.shortDisciplineName +
                                        ' ' + data[i].teacherDto.lastName + ' ' + data[i].teacherDto.firstName.substring(0, 1) + '.' +
                                        data[i].teacherDto.patronymic.substring(0, 1) + '. ' + ', к. ' + data[i].classroomDto.number +
                                        ' гр. ' + data[i].groupDto.groupName + '-' + data[i].subgroup,
                                    color: data[i].teacherDto.color,
                                }
                            );
                        }
                    }
                 //   console.log(this.calendarEvents);
                });
        } else {this.getDaysPeriod(); }
    }

    loadOneGroupEvents() {
        if (this.group != null) {
            this.timetableOfClassesService.getTimetableOfClassesOfGroup(this.time, this.group)
                .subscribe( (data: TimetableOfClasses[]) => {
                    this.timetableOfClasses = data;
                    console.log(this.timetableOfClasses);
                    this.calendarEvents = [];

                    // конвертация объектов из БД в event на календарь
                    for (let i = 0, len = Object.keys(data).length; i < len; i++) {
                        if (this.isGroup) {
                            this.calendarEvents.push(
                                {
                                    title: data[i].groupDto.groupName + ' ' + data[i].subgroup,
                                    start: data[i].classDate + 'T' + data[i].beginTime,
                                    end: data[i].classDate + 'T' + data[i].finishTime,
                                    description: data[i].beginTime.toString().substring(0, 5) + '-' +
                                        data[i].finishTime.toString().substring(0, 5) + ', ' + data[i].disciplineDto.shortDisciplineName +
                                        ' ' + data[i].teacherDto.lastName + ' ' + data[i].teacherDto.firstName.substring(0, 1) + '.' +
                                        data[i].teacherDto.patronymic.substring(0, 1) + '. ' + ', к. ' + data[i].classroomDto.number +
                                        ' гр. ' + data[i].groupDto.groupName + '-' + data[i].subgroup,
                                    color: data[i].groupDto.color,
                                }
                            );
                        }
                    }
                  //  console.log(this.calendarEvents);
                });
        } else {this.getDaysPeriod(); }
    }

    getPeriod(): string {
        const startDay = this.calendarComponent.getApi().view.currentStart;
        const endDay = this.calendarComponent.getApi().view.currentEnd;
        startDay.setDate(startDay.getDate() + 1);
        const start = startDay.toISOString().split('T')[0];
        const end = endDay.toISOString().split('T')[0];
        console.log('?classDate1=' + start + '&classDate2=' + end);
        return '?d1=' + start + '&d2=' + end;
    }

    // метод для передачи Диме периода для ивентов из БД
    getDaysPeriod() {
        this.time = this.getPeriod();
        if (this.classroom != null) {
            this.loadOneClassroomEvents();
        } else if (this.teacher != null) {
            this.loadOneTeacherEvents();
        } else if (this.group != null) {
            this.loadOneGroupEvents();
        } else {
            this.timetableOfClassesService.getTimetableOfClasses(this.time).subscribe(
                (data: TimetableOfClasses[]) => {
                    this.timetableOfClasses = data;
                  //  console.log(this.timetableOfClasses);
                    this.calendarEvents = [];

                    // конвертация объектов из БД в event на календарь
                    for (let i = 0, len = Object.keys(data).length; i < len; i++) {
                        if (this.isClassroom) {
                            this.calendarEvents.push(
                                {
                                    title: data[i].classroomDto.number,
                                    start: data[i].classDate + 'T' + data[i].beginTime,
                                    end: data[i].classDate + 'T' + data[i].finishTime,
                                    description: data[i].beginTime.toString().substring(0, 5) + '-' +
                                        data[i].finishTime.toString().substring(0, 5) + ', ' + data[i].disciplineDto.shortDisciplineName +
                                        ' ' + data[i].teacherDto.lastName + ' ' + data[i].teacherDto.firstName.substring(0, 1) + '.' +
                                        data[i].teacherDto.patronymic.substring(0, 1) + '. ' + ', к. ' + data[i].classroomDto.number +
                                        ' гр. ' + data[i].groupDto.groupName + '-' + data[i].subgroup,
                                    color: data[i].classroomDto.color,
                                }
                            );
                        }
                        if (this.isTeacher) {
                            this.calendarEvents.push(
                                {
                                    title: data[i].teacherDto.lastName,
                                    start: data[i].classDate + 'T' + data[i].beginTime,
                                    end: data[i].classDate + 'T' + data[i].finishTime,
                                    description: data[i].beginTime.toString().substring(0, 5) + '-' +
                                        data[i].finishTime.toString().substring(0, 5) + ', ' + data[i].disciplineDto.shortDisciplineName +
                                        ' ' + data[i].teacherDto.lastName + ' ' + data[i].teacherDto.firstName.substring(0, 1) + '.' +
                                        data[i].teacherDto.patronymic.substring(0, 1) + '. ' + ', к. ' + data[i].classroomDto.number +
                                        ' гр. ' + data[i].groupDto.groupName + '-' + data[i].subgroup,
                                    color: data[i].teacherDto.color,
                                }
                            );
                        }
                        if (this.isGroup) {
                            this.calendarEvents.push(
                                {
                                    title: data[i].groupDto.groupName + ' ' + data[i].subgroup,
                                    start: data[i].classDate + 'T' + data[i].beginTime,
                                    end: data[i].classDate + 'T' + data[i].finishTime,
                                    description: data[i].beginTime.toString().substring(0, 5) + '-' +
                                        data[i].finishTime.toString().substring(0, 5) + ', ' + data[i].disciplineDto.shortDisciplineName +
                                        ' ' + data[i].teacherDto.lastName + ' ' + data[i].teacherDto.firstName.substring(0, 1) + '.' +
                                        data[i].teacherDto.patronymic.substring(0, 1) + '. ' + ', к. ' + data[i].classroomDto.number +
                                        ' гр. ' + data[i].groupDto.groupName + '-' + data[i].subgroup,
                                    color: data[i].groupDto.color,
                                }
                            );
                        }

                    }
                 //   console.log(this.calendarEvents);
                }
            );
        }
    }



/*
    handleDateClick(arg) { // handler method
        alert(arg.dateStr);
    }

    click(info) {
        console.log(info.event.extendedProps.description);
    }*/


    eventRender(info) {
        // console.log(info);
        this.tooltip = new Tooltip(info.el, {
            title: info.event.extendedProps.description,

            placement: 'top',
            trigger: 'hover',
            container: 'body',
        });
        //  console.log(this.tooltip);
        //  console.log(info.event.extendedProps.description);
    }

    handleEventMouseLeave(info) {
        this.tooltip.dispose();
    }

}
