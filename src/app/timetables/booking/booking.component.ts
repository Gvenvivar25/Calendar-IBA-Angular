import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { NewEvent, TimetableOfClasses, TimetableOfClassesDto} from '../../shared/models/timetable-of-classes.model';
import {TimetableOfClassesService} from '../../shared/services/timetable-of-classes.service';
import {FullCalendarComponent} from '@fullcalendar/angular';
import Tooltip from 'tooltip.js';
import {EventInput} from '@fullcalendar/core/structs/event';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BookingComponent implements OnInit {

    timetableDetail: NewEvent;
    isNew = null;

    @ViewChild('fullcalendar', {static: false}) fullcalendar: FullCalendarComponent;

    tooltip: Tooltip;
    timetableOfClasses: TimetableOfClasses [];
    calendarEvents: EventInput [];
    time: string;


    header = {
        left: 'timeGridWeek, timeGridDay',
        center: 'title',
        right:  'prev,next today'};


    buttonText = {
        today:    'Сегодня',
        week:     'Неделя',
        day:      'День',
    };

    slotLabelFormat = {
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: false,
        meridiem: 'short'};



    plugins = [dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimeGridPlugin];

    constructor(private el: ElementRef,
                private timetableOfClassesService: TimetableOfClassesService) { }

    ngOnInit() {
    }
// метод для передачи Диме периода для ивентов из БД
    getDaysPeriod() {
        const startDay = this.fullcalendar.getApi().view.currentStart;
        const endDay = this.fullcalendar.getApi().view.currentEnd;
        startDay.setDate(startDay.getDate() + 1);
        const start = startDay.toISOString().split('T')[0];
        const end = endDay.toISOString().split('T')[0];
        console.log('?classDate1=' + start + '&classDate2=' + end);
        this.time = '?d1=' + start + '&d2=' + end;
        this.timetableOfClassesService.getTimetableOfClasses(this.time).subscribe(
            (data: TimetableOfClasses[]) => {
                this.timetableOfClasses = data;
                //  console.log(this.timetableOfClasses);
                this.calendarEvents = [];

                // конвертация объектов из БД в event на календарь
                for (let i = 0, len = Object.keys(data).length; i < len; i++) {
                    if (data[i].reserved === true) {
                        this.calendarEvents.push (
                            {
                                id: data[i].id,
                                /*title: 'Бронь!' + data[i].disciplineDto.shortDisciplineName + ' ' + data[i].typeOfWork.short_value
                                    + ' гр. №' + data[i].groupDto.groupName + ' подгр. №' + data[i].subgroup,*/
                                title: 'Бронь!' + data[i].classroomDto.number + 'к.',
                                resourceId: data[i].classroomDto.id,
                                start: data[i].classDate + 'T' + data[i].beginTime,
                                end: data[i].classDate + 'T' + data[i].finishTime,
                                description: data[i].beginTime.toString().substring(0, 5) + '-' +
                                    data[i].finishTime.toString().substring(0, 5) + ', ' + data[i].disciplineDto.shortDisciplineName +
                                    ' ' + data[i].teacherDto.lastName + ' ' + data[i].teacherDto.firstName.substring(0, 1) + '.' +
                                    data[i].teacherDto.patronymic.substring(0, 1) + '. ' + ', к. ' + data[i].classroomDto.number +
                                    ' гр. ' + data[i].groupDto.groupName + '-' + data[i].subgroup,
                                color: '#ed9097',
                                editable: true,
                                resourceEditable: false
                            }
                        );
                    } else if (data[i].status === false) {
                        // не подтвержденные ивенты
                        this.calendarEvents.push (
                            {
                                id: data[i].id,
                                title: data[i].classroomDto.number + 'к.',
                                resourceId: data[i].classroomDto.id,
                                start: data[i].classDate + 'T' + data[i].beginTime,
                                end: data[i].classDate + 'T' + data[i].finishTime,
                                description: data[i].beginTime.toString().substring(0, 5) + '-' +
                                    data[i].finishTime.toString().substring(0, 5) + ', ' + data[i].disciplineDto.shortDisciplineName +
                                    ' ' + data[i].teacherDto.lastName + ' ' + data[i].teacherDto.firstName.substring(0, 1) + '.' +
                                    data[i].teacherDto.patronymic.substring(0, 1) + '. ' + ', к. ' + data[i].classroomDto.number +
                                    ' гр. ' + data[i].groupDto.groupName + '-' + data[i].subgroup,
                                color: '#cccad8',
                                editable: true,
                                resourceEditable: false
                            }
                        );
                    }   else {
                        // подтвержденные ивенты
                        this.calendarEvents.push (
                            {
                                id: data[i].id,
                                title: data[i].classroomDto.number + 'к.',
                                resourceId: data[i].classroomDto.id,
                                start: data[i].classDate + 'T' + data[i].beginTime,
                                end: data[i].classDate + 'T' + data[i].finishTime,
                                description: data[i].beginTime.toString().substring(0, 5) + '-' +
                                    data[i].finishTime.toString().substring(0, 5) + ', ' + data[i].disciplineDto.shortDisciplineName +
                                    ' ' + data[i].teacherDto.lastName + ' ' + data[i].teacherDto.firstName.substring(0, 1) + '.' +
                                    data[i].teacherDto.patronymic.substring(0, 1) + '. ' + ', к. ' + data[i].classroomDto.number +
                                    ' гр. ' + data[i].groupDto.groupName + '-' + data[i].subgroup,
                                color: '#2490f5',
                                editable: false,
                                resourceEditable: false
                            }
                        );
                    }
                }
                console.log(this.calendarEvents);
            }
        );
    }

    handleDateClick(arg) { // handler method
        //  alert(arg.dateStr);
        console.log(arg);
      //  this.requestNewEvent.emit(this.createNewEvent(arg));

        this.timetableDetail = this.createNewEvent(arg);
        this.isNew = true;
    }

    eventClick(info) {
        console.log(info.event);
        if (info.event.startEditable === true) {

            this.isNew = false;
            const eventId: number = parseInt(info.event.id, 10);
            const timetable: TimetableOfClasses = this.timetableOfClasses.find(obj => obj.id === eventId);
            console.log(timetable);
            const updateEvent: NewEvent = new NewEvent();
            updateEvent.id = timetable.id;
            updateEvent.title = timetable.classDate + ' ' + timetable.beginTime + ' ауд. ' + timetable.classroomDto.number + ' ' +
                timetable.disciplineDto.shortDisciplineName + ', ' + timetable.groupDto.groupName;
            updateEvent.day = timetable.classDate;
            updateEvent.startTime = timetable.beginTime;
            updateEvent.endTime = timetable.finishTime;
            updateEvent.reserved = timetable.reserved;
            updateEvent.status = timetable.status;
            updateEvent.classroom = timetable.classroomDto;
            updateEvent.discipline = timetable.disciplineDto;
            updateEvent.group = timetable.groupDto;
            updateEvent.teacher = timetable.teacherDto;
            updateEvent.subgroup = timetable.subgroup;
            updateEvent.typeOfWork = timetable.typeOfWork;
            this.timetableDetail = updateEvent;
        }
    }

    createNewEvent(arg): NewEvent {
        const newEvent: NewEvent = new NewEvent();
        newEvent.title = 'lalala';

        newEvent.day = arg.dateStr.split('T')[0];
        const day = new Date(arg.date);
        console.log(day);
        day.setMinutes(day.getMinutes() + 45);
        console.log(day.toTimeString());


        newEvent.startTime = arg.dateStr.substring(11, 16);
        newEvent.endTime = day.toTimeString().substring(0, 5) as any;
        // newEvent.endTime.hours = newEvent.startTime.hours;
        // newEvent.endTime.minutes = newEvent.startTime.minutes + 45;
        return newEvent;
    }

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

    handleEventMouseLeave() {
        this.tooltip.dispose();
    }


    onCloseTimetableDetail(): void {
        this.timetableDetail = null;
        this.isNew = null;
    }


    onAdd(event: NewEvent): void {
        this.timetableDetail = event;
        console.log(this.timetableDetail);
        const timetable: TimetableOfClassesDto = new TimetableOfClassesDto();
        timetable.id = null;
        timetable.disciplineDto = event.discipline;
        timetable.teacherDto = {
            id: event.teacher.id,
            firstName: event.teacher.firstName,
            lastName: event.teacher.lastName,
            patronymic: event.teacher.patronymic,
            typeOfEmployment: event.teacher.typeOfEmployment.id,
            color: event.teacher.color
        };

        timetable.groupDto = {
            id: event.group.id,
            groupName: event.group.groupName,
            numberOfSubgroup: event.group.numberOfSubgroup,
            typeOfEducation: event.group.typeOfEducation.id,
            descriptionOfPlanDto: {
                id: event.group.descriptionOfPlanDto.id,
                description: event.group.descriptionOfPlanDto.description,
                typeOfCourse: event.group.descriptionOfPlanDto.typeOfCourse.id,
            },
            color: event.group.color
        };

        timetable.typeOfWork = event.typeOfWork.id;
        timetable.lessonNumber = 0;
        timetable.pairNumber = 0;
        timetable.subgroup = event.subgroup;
        timetable.status = event.status;
        timetable.reserved = event.reserved;
        timetable.classDate = event.day;
        timetable.beginTime = event.startTime;
        timetable.finishTime = event.endTime;
        timetable.classroomDto = {
            id: event.classroom.id,
        number: event.classroom.number,
        typeOfClassroom: event.classroom.typeOfClassroom.id,
        color: event.classroom.color
        };
        console.log(timetable);
        this.timetableOfClassesService.saveOneTimetableOfClasses(timetable).subscribe( () => {
            this.getDaysPeriod(); }
        );

        this.onCloseTimetableDetail();
    }

    onUpdate(event: NewEvent): void {
        this.timetableDetail = event;
        console.log(this.timetableDetail);
        const timetable: TimetableOfClassesDto = new TimetableOfClassesDto();
        timetable.id = event.id;
        timetable.disciplineDto = event.discipline;
        timetable.teacherDto = {
            id: event.teacher.id,
            firstName: event.teacher.firstName,
            lastName: event.teacher.lastName,
            patronymic: event.teacher.patronymic,
            typeOfEmployment: event.teacher.typeOfEmployment.id,
            color: event.teacher.color
        };

        timetable.groupDto = {
            id: event.group.id,
            groupName: event.group.groupName,
            numberOfSubgroup: event.group.numberOfSubgroup,
            typeOfEducation: event.group.typeOfEducation.id,
            descriptionOfPlanDto: {
                id: event.group.descriptionOfPlanDto.id,
                description: event.group.descriptionOfPlanDto.description,
                typeOfCourse: event.group.descriptionOfPlanDto.typeOfCourse.id,
            },
            color: event.group.color
        };

        timetable.typeOfWork = event.typeOfWork.id;
        timetable.lessonNumber = 0;
        timetable.pairNumber = 0;
        timetable.subgroup = event.subgroup;
        timetable.status = event.status;
        timetable.reserved = event.reserved;
        timetable.classDate = event.day;
        timetable.beginTime = event.startTime;
        timetable.finishTime = event.endTime;
        timetable.classroomDto = {
            id: event.classroom.id,
            number: event.classroom.number,
            typeOfClassroom: event.classroom.typeOfClassroom.id,
            color: event.classroom.color
        };
        console.log(timetable);
        this.timetableOfClassesService.updateOneTimetableOfClasses(timetable.id, timetable).subscribe( () => {
            this.getDaysPeriod(); }
        );
        this.onCloseTimetableDetail();
    }

    onDelete(event: NewEvent): void {
        this.timetableOfClassesService.deleteOneTimetableOfClasses(event.id).subscribe(() => {
            this.getDaysPeriod(); });
        this.onCloseTimetableDetail();
    }

    /*onEventUpdated(event: NewEvent): void {
        this.onUpdate(event);
    }*/

}
