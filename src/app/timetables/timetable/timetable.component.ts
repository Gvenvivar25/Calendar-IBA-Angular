import {
    AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation
} from '@angular/core';

import {FullCalendarComponent} from '@fullcalendar/angular';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import {EventInput} from '@fullcalendar/core/structs/event';
import {ClassroomService} from '../../dictionaries/classrooms/classroom.service';
import {Classroom} from '../../dictionaries/classrooms/classroom.model';
import {ExternalEvent, NewEvent, TimetableOfClasses, TimetableOfClassesDto} from '../../shared/models/timetable-of-classes.model';
import Tooltip from 'tooltip.js';
import {TimetableOfClassesService} from '../../shared/services/timetable-of-classes.service';


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
    time: string;


    header = {
        left: 'resourceTimeGridWeek, resourceTimeGrid3Days, resourceTimeGridDay, timeGridWeek,',
        center: 'title',
        right:  'prev,next today'};

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
                private timetableOfClassesService: TimetableOfClassesService) {
        this.classroomService.getClassrooms().subscribe((res: Classroom []) => {
            this.resources = [];
            for (let i = 0, len = Object.keys(res).length; i < len; i++) {
                this.resources.push({id: (res[i].id).toString(), title: res[i].number});
            }
            console.log(this.resources);
        });

    }

    ngAfterViewInit(): void {

        new Draggable(this.external.nativeElement, {
            itemSelector: '.list-group-item',
            eventData(eventEl) {
                // получаю из div data-event в строку и конвертирую в json, дальше беру необходимые данные
                const data: string = eventEl.getAttribute('data-event');
                const dataObj: ExternalEvent = JSON.parse(data);
                console.log(dataObj.description);
                console.log(eventEl);

                return {
                    title: eventEl.firstChild.textContent,
                    duration: '00:45',
                    description: dataObj.description,
                    id: null

                };
            }
        });

    }

    eventDragStop(event) {
        const trashEl = document.getElementById('fcTrash') as HTMLElement;

        const x1 = trashEl.offsetLeft - 100;
        const x2 = trashEl.offsetLeft + trashEl.offsetWidth + 20;
        const y1 = trashEl.offsetTop + 60;
        const y2 = trashEl.offsetTop + trashEl.offsetHeight + 120;

        console.log(x1 + ' ' + x2 + ' ' + y1 + ' ' + y2);
        console.log(event);

        if (event.jsEvent.pageX >= x1 && event.jsEvent.pageX <= x2 &&
            event.jsEvent.pageY >= y1 && event.jsEvent.pageY <= y2) {
            event.event.remove();
            let id;
            if (event.event.id !== 'null') {
                id = event.event.id;
            } else {id = event.event.extendedProps.id; }
            this.timetableOfClassesService.deleteOneTimetableOfClasses(id).subscribe(() => {
                this.clickButtonOk.emit('OK');
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
            classroomId = 1; // изменить потом на получение id с календаря
        }
        this.classroomService.getClassroom(classroomId).subscribe((res: Classroom) => {
            timetable.classroomDto = {
                id: res.id,
                number: res.number,
                typeOfClassroom: res.typeOfClassroom.id,
                color: res.color
            };
            console.log(timetable.classroomDto);
            this.timetableOfClassesService.saveOneTimetableOfClasses(timetable).subscribe((result: TimetableOfClasses) => {
                console.log('Пришло с сервера' + JSON.stringify(result));
                if (result) {
                    event.event.setExtendedProp('id', result.id);
                } else {
                    event.event.remove();
                    this.clickButtonOk.emit('OK');

                }

             //   event.id = result.id;
             //   event.event.id = result.id.toString();
             //   event.event.setProp('id', result.id.toString());
                console.log(event);
            } );
        });
    }

    eventReceive(event) {
        console.log(event);
        const time = event.event.start.toTimeString().substring(0, 5) + '-' + event.event.end.toTimeString().substring(0, 5) + ', ' +
            event.event.extendedProps.description;
        console.log(time);
        event.event.setExtendedProp('description', time);
        console.log(event.event.extendedProps.description);
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
        console.log(event);
        let id: number;
        if (event.event.id !== 'null') {
            id = event.event.id;
        } else {
            id = event.oldEvent.extendedProps.id;
        }

        console.log(id);
        this.timetableOfClassesService.getOneTimetableOfClasses(id).subscribe((res: TimetableOfClasses) => {
            console.log(res);
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
                classroomId = 1; // изменить потом на получение id с календаря
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
                    } else {
                     //   event.event.remove();
                     //   this.clickButtonOk.emit('OK');

                    }
                    console.log(event);
                } );
            });
            }
        );
    }

    // метод для передачи Диме периода для ивентов из БД
    getDaysPeriod(info) {
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
                    if (data[i].status === false) {
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
                            color: '#f5a7a2',
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
                                color: '#69f574',
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
    }

    eventClick(info) {
        alert('Event: ' + info.event.title);


        // change the border color just for fun
        info.el.style.borderColor = 'red';
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

    handleEventMouseLeave(info) {
        this.tooltip.dispose();
    }

}
