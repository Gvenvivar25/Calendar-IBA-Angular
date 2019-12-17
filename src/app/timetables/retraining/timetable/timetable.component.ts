import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import {EventInput} from '@fullcalendar/core/structs/event';
import {ClassroomService} from '../../../shared/services/classroom.service';
import {Classroom} from '../../../shared/models/classroom.model';
import {ExternalEvent, NewEvent, TimetableOfClasses, TimetableOfClassesDto} from '../../../shared/models/timetable-of-classes.model';
import Tooltip from 'tooltip.js';
import {TimetableOfClassesService} from '../../../shared/services/timetable-of-classes.service';
import {AuthenticationService} from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TimetableComponent implements  AfterViewInit {

    @ViewChild('fullcalendar', {static: false}) fullcalendar: FullCalendarComponent;
    @ViewChild('external', {static: true}) external: ElementRef;
    @Input() public events: ExternalEvent[];
    @Output() requestNewEvent = new EventEmitter<NewEvent>();
    @Output() clickButtonOk = new EventEmitter<string>();
    tooltip: Tooltip;
    timetableOfClasses: TimetableOfClasses [];
    calendarEvents: EventInput [];
    isTimetableConfirm;
    isConfirm: boolean;
    time: string;
    startDate: string;
    endDate: string;

    header = {
        left: 'resourceTimeGridWeek, resourceTimeGrid3Days, resourceTimeGridDay',
        center: 'title',
        right:  'confirmButton, prev,next today'};

    customButtons = {
        confirmButton: {
            text: 'Подтвердить занятия',
            click: this.onConfirm.bind(this)
        }
    };

    views = {
        resourceTimeGrid5Days: {
            type: 'resourceTimeGrid',
            duration: { days: 5 },
            buttonText: '5 дней'
        },
        resourceTimeGrid3Days: {
            type: 'resourceTimeGrid',
            duration: { days: 3 },
            buttonText: '3 дня'
        },

        resourceTimeGridWeek: {
            type: 'resourceTimeGrid',
            duration: { days: 7 },
            buttonText: '7 дней'
        }
    };

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

    resources = [];

    plugins = [dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimeGridPlugin];

    constructor(private el: ElementRef, private classroomService: ClassroomService,
                private timetableOfClassesService: TimetableOfClassesService, private authService: AuthenticationService) {
        this.classroomService.getClassrooms().subscribe((res: Classroom []) => {
            this.resources = [];
            for (let i = 0, len = Object.keys(res).length; i < len; i++) {
                this.resources.push({id: (res[i].id).toString(), title: res[i].number});
            }
            // console.log(this.resources);
        });
    }

    ngAfterViewInit(): void {

        new Draggable(this.external.nativeElement, {
            itemSelector: '.list-group-item',
            eventData(eventEl) {
                const data: string = eventEl.getAttribute('data-event');
                const dataObj: ExternalEvent = JSON.parse(data);

                return {
                    title: eventEl.firstChild.textContent,
                    duration: '00:45',
                    description: dataObj.description,
                    id: null
                };
            }
        });
    }

    get isAdmin() {
        const role = this.authService.userRole;
        if (role === 'ROLE_ADMIN') { return true; } else { return false; }
    }

    eventDragStop(event) {
        const trashEl = document.getElementById('fcTrash') as HTMLElement;

        const x1 = trashEl.offsetLeft - 100;
        const x2 = trashEl.offsetLeft + trashEl.offsetWidth + 20;
        const y1 = trashEl.offsetTop + 60;
        const y2 = trashEl.offsetTop + trashEl.offsetHeight + 120;
        if (event.jsEvent.pageX >= x1 && event.jsEvent.pageX <= x2 &&
            event.jsEvent.pageY >= y1 && event.jsEvent.pageY <= y2) {
            let id;
            if (event.event.id !== 'null') {
                id = event.event.id;
            } else {id = event.event.extendedProps.id; }
            this.timetableOfClassesService.deleteOneTimetableOfClasses(id).subscribe((res: any) => {
                if (res === null) {
                event.event.remove();
                this.clickButtonOk.emit('OK');
                }
            });
        }
    }

    getEvent(event) {
        return JSON.stringify(event);
    }

    // сборка объекта для отправки на сервер
    getTimetableObjectWithResource(dataObj, event) {
        const timetable: TimetableOfClassesDto = new TimetableOfClassesDto();
        timetable.id = null;
        timetable.disciplineDto = dataObj.objectData.disciplineDto;
        timetable.teacherDto = {
            id: dataObj.objectData.teacherDto.id,
            firstName: dataObj.objectData.teacherDto.firstName,
            lastName: dataObj.objectData.teacherDto.lastName,
            patronymic: dataObj.objectData.teacherDto.patronymic,
            typeOfEmployment: dataObj.objectData.teacherDto.typeOfEmployment.id,
            color: dataObj.objectData.teacherDto.color
        };
        timetable.groupDto = {
            id: dataObj.objectData.groupDto.id,
            groupName: dataObj.objectData.groupDto.groupName,
            numberOfSubgroup: dataObj.objectData.groupDto.numberOfSubgroup,
            typeOfEducation: dataObj.objectData.groupDto.typeOfEducation.id,
            descriptionOfPlanDto: {
                id: dataObj.objectData.groupDto.descriptionOfPlanDto.id,
                description: dataObj.objectData.groupDto.descriptionOfPlanDto.description,
                typeOfCourse: dataObj.objectData.groupDto.descriptionOfPlanDto.typeOfCourse.id,
            },
            color: dataObj.objectData.groupDto.color
        };
        timetable.typeOfWork = dataObj.objectData.typeOfWork.id;
        timetable.lessonNumber = dataObj.objectData.lessonNumber;
        timetable.pairNumber = dataObj.objectData.pairNumber;
        timetable.subgroup = dataObj.objectData.subgroup;
        timetable.status = false;
        timetable.reserved = false;
        timetable.classDate = event.event.start.toISOString().split('T')[0];
        timetable.beginTime = event.event.start.toTimeString().slice(0, 8);
        timetable.finishTime = event.event.end.toTimeString().slice(0, 8);
        let classroomId;
        if ( event.event._def.resourceIds[0] != null) {
            classroomId = event.event._def.resourceIds[0];
        } else {
            classroomId = 1;
        }
        this.classroomService.getClassroom(classroomId).subscribe((res: Classroom) => {
            timetable.classroomDto = {
                id: res.id,
                number: res.number,
                typeOfClassroom: res.typeOfClassroom.id,
                color: res.color
            };
            this.timetableOfClassesService.saveOneTimetableOfClasses(timetable).subscribe((result: TimetableOfClasses) => {
                if (result) {
                    event.event.setExtendedProp('id', result.id);
                } else {
                    event.event.remove();
                    this.clickButtonOk.emit('OK');
                }
            } );
        });
    }

    eventReceive(event) {
        const time = event.event.start.toTimeString().substring(0, 5) + '-' + event.event.end.toTimeString().substring(0, 5) + ', ' +
            event.event.extendedProps.description;
        event.event.setExtendedProp('description', time);
        // меняю количество ивентов для перетаскивания в DOM
        const need = event.draggedEl.childNodes[1].innerText;
        if (need > 1) {event.draggedEl.childNodes[1].innerText = need - 1; }
        if (need <= 1) {
            event.draggedEl.parentNode.removeChild(event.draggedEl); }
        // чтение и запись полученных данных в объект на сервер
        const dataObj = JSON.parse(event.draggedEl.dataset.event);
        this.getTimetableObjectWithResource(dataObj, event);
    }

    eventDrop(event) {
        let id: number;
        if (event.event.id !== 'null') {
            id = event.event.id;
        } else {
            id = event.oldEvent.extendedProps.id;
        }

        this.timetableOfClassesService.getOneTimetableOfClasses(id).subscribe((res: TimetableOfClasses) => {
            const timetable: TimetableOfClassesDto = new TimetableOfClassesDto();
            timetable.id = res.id;
            timetable.disciplineDto = res.disciplineDto;
            timetable.teacherDto = {
                id: res.teacherDto.id,
                firstName: res.teacherDto.firstName,
                lastName: res.teacherDto.lastName,
                patronymic: res.teacherDto.patronymic,
                typeOfEmployment: res.teacherDto.typeOfEmployment.id,
                color: res.teacherDto.color
            };
            timetable.groupDto = {
                id: res.groupDto.id,
                groupName: res.groupDto.groupName,
                numberOfSubgroup: res.groupDto.numberOfSubgroup,
                typeOfEducation: res.groupDto.typeOfEducation.id,
                descriptionOfPlanDto: {
                    id: res.groupDto.descriptionOfPlanDto.id,
                    description: res.groupDto.descriptionOfPlanDto.description,
                    typeOfCourse: res.groupDto.descriptionOfPlanDto.typeOfCourse.id,
                },
                color: res.groupDto.color
            };
            timetable.typeOfWork = res.typeOfWork.id;
            timetable.lessonNumber = res.lessonNumber;
            timetable.pairNumber = res.pairNumber;
            timetable.subgroup = res.subgroup;
            timetable.status = false;
            timetable.reserved = false;
            timetable.classDate = event.event.start.toISOString().split('T')[0];
            timetable.beginTime = event.event.start.toTimeString().slice(0, 8);
            timetable.finishTime = event.event.end.toTimeString().slice(0, 8);
            let classroomId;
            if ( event.event._def.resourceIds[0] != null) {
                classroomId = event.event._def.resourceIds[0];
            } else {
                classroomId = 1;
            }
            this.classroomService.getClassroom(classroomId).subscribe((res2: Classroom) => {
                timetable.classroomDto = {
                    id: res2.id,
                    number: res2.number,
                    typeOfClassroom: res2.typeOfClassroom.id,
                    color: res2.color

                };
                console.log(timetable.classroomDto);
                this.timetableOfClassesService.updateOneTimetableOfClasses(id, timetable).subscribe((result: TimetableOfClasses) => {
                    console.log('Пришло с сервера' + JSON.stringify(result));
                    if (result) {
                        event.event.setExtendedProp('id', result.id);
                    }
                } );
            });
            }
        );
    }

    getDaysPeriod() {

        const startDay = this.fullcalendar.getApi().view.currentStart;
        const endDay = this.fullcalendar.getApi().view.currentEnd;
        startDay.setDate(startDay.getDate() + 1);
        const start = startDay.toISOString().split('T')[0];
        const end = endDay.toISOString().split('T')[0];
        this.startDate = start;
        this.endDate = end;
        this.time = '?d1=' + start + '&d2=' + end;
        this.timetableOfClassesService.getTimetableOfClasses(this.time).subscribe(
            (data: TimetableOfClasses[]) => {
                this.fullcalendar.getApi().removeAllEvents();
                this.fullcalendar.getApi().removeAllEventSources();
                this.fullcalendar.getApi().rerenderEvents();
                this.timetableOfClasses = data;
                this.calendarEvents = [];

                // конвертация объектов из БД в event на календарь
                for (let i = 0, len = Object.keys(data).length; i < len; i++) {
                    if (data[i].reserved === true) {
                        this.calendarEvents.push(
                            {
                                id: data[i].id,
                                title: 'Бронь!' + data[i].disciplineDto.shortDisciplineName + ' ' + data[i].typeOfWork.short_value
                                    + ' гр. №' + data[i].groupDto.groupName + ' подгр. №' + data[i].subgroup,
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
                            title: data[i].disciplineDto.shortDisciplineName + ' ' + data[i].typeOfWork.short_value + ' гр. №' +
                                data[i].groupDto.groupName + ' подгр. №' + data[i].subgroup,
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
                            resourceEditable: true
                        }
                    );
                   } else {
                        // подтвержденные ивенты
                        this.calendarEvents.push (
                            {
                                id: data[i].id,
                                title: data[i].disciplineDto.shortDisciplineName + ' ' + data[i].typeOfWork.short_value + ' гр. №' +
                                    data[i].groupDto.groupName + ' подгр. №' + data[i].subgroup,
                                resourceId: data[i].classroomDto.id,
                                start: data[i].classDate + 'T' + data[i].beginTime,
                                end: data[i].classDate + 'T' + data[i].finishTime,
                                description: data[i].beginTime.toString().substring(0, 5) + '-' +
                                    data[i].finishTime.toString().substring(0, 5) + ', ' + data[i].disciplineDto.shortDisciplineName +
                                    ' ' + data[i].teacherDto.lastName + ' ' + data[i].teacherDto.firstName.substring(0, 1) + '.' +
                                    data[i].teacherDto.patronymic.substring(0, 1) + '. ' + ', к. ' + data[i].classroomDto.number +
                                    ' гр. ' + data[i].groupDto.groupName + '-' + data[i].subgroup,
                                color: '#2499ff',
                                editable: false,
                                resourceEditable: false
                            }
                        );
                    }

                }
              //  console.log(this.calendarEvents);

            }
        );

    }

    refetchEvents() {
        const startDay = this.fullcalendar.getApi().view.currentStart;
        const endDay = this.fullcalendar.getApi().view.currentEnd;
        startDay.setDate(startDay.getDate() + 1);
        const start = startDay.toISOString().split('T')[0];
        const end = endDay.toISOString().split('T')[0];
        this.startDate = start;
        this.endDate = end;
        this.time = '?d1=' + start + '&d2=' + end;
        this.timetableOfClassesService.getTimetableOfClasses(this.time).subscribe(
            (data: TimetableOfClasses[]) => {
                this.fullcalendar.getApi().removeAllEvents();
                this.fullcalendar.getApi().removeAllEventSources();
                this.fullcalendar.getApi().rerenderEvents();
                this.timetableOfClasses = data;
                this.calendarEvents = [];
                // конвертация объектов из БД в event на календарь
                for (let i = 0, len = Object.keys(data).length; i < len; i++) {
                    if (data[i].reserved === true) {
                        this.calendarEvents.push(
                            {
                                id: data[i].id,
                                title: 'Бронь!' + data[i].disciplineDto.shortDisciplineName + ' ' + data[i].typeOfWork.short_value
                                    + ' гр. №' + data[i].groupDto.groupName + ' подгр. №' + data[i].subgroup,
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
                                title: data[i].disciplineDto.shortDisciplineName + ' ' + data[i].typeOfWork.short_value + ' гр. №' +
                                    data[i].groupDto.groupName + ' подгр. №' + data[i].subgroup,
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
                                resourceEditable: true
                            }
                        );
                    } else {
                        // подтвержденные ивенты
                        this.calendarEvents.push (
                            {
                                id: data[i].id,
                                title: data[i].disciplineDto.shortDisciplineName + ' ' + data[i].typeOfWork.short_value + ' гр. №' +
                                    data[i].groupDto.groupName + ' подгр. №' + data[i].subgroup,
                                resourceId: data[i].classroomDto.id,
                                start: data[i].classDate + 'T' + data[i].beginTime,
                                end: data[i].classDate + 'T' + data[i].finishTime,
                                description: data[i].beginTime.toString().substring(0, 5) + '-' +
                                    data[i].finishTime.toString().substring(0, 5) + ', ' + data[i].disciplineDto.shortDisciplineName +
                                    ' ' + data[i].teacherDto.lastName + ' ' + data[i].teacherDto.firstName.substring(0, 1) + '.' +
                                    data[i].teacherDto.patronymic.substring(0, 1) + '. ' + ', к. ' + data[i].classroomDto.number +
                                    ' гр. ' + data[i].groupDto.groupName + '-' + data[i].subgroup,
                                color: '#2499ff',
                                editable: false,
                                resourceEditable: false
                            }
                        );
                    }

                }
                this.fullcalendar.getApi().removeAllEventSources();
                this.fullcalendar.getApi().rerenderEvents();
            }

        );

    }

    datesRender(info) {
        console.log(info);
    }

    eventRender(info) {
        this.tooltip = new Tooltip(info.el, {
            title: info.event.extendedProps.description,
            placement: 'top',
            trigger: 'hover',
            container: 'body',
        });
    }

    handleEventMouseLeave() {
        this.tooltip.dispose();
    }

    onCloseTimetableConfirm(info): void {
        console.log(info);
        if (info === 'close') {
            this.isTimetableConfirm = false;
            this.isConfirm = null;
        } else {
            this.isTimetableConfirm = false;
            this.isConfirm = null;
            setTimeout (() => {
                this.refetchEvents();
            }, 500);
        }
    }

    onConfirm() {
        this.isTimetableConfirm = !this.isTimetableConfirm;
        this.isConfirm = true;
    }

    onCancel() {
        this.isConfirm = false;
        this.isTimetableConfirm = !this.isTimetableConfirm;
    }
}
