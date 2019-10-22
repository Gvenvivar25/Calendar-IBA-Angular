import {
    AfterViewInit,
    Component,
    ElementRef, Input,
    IterableDiffers,
    OnInit,
    ViewChild, ViewEncapsulation
} from '@angular/core';

import {FullCalendarComponent} from '@fullcalendar/angular';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import {EventInput} from '@fullcalendar/core/structs/event';
import {ClassroomService} from '../../dictionaries/classrooms/classroom.service';
import {Classroom, ClassroomDto} from '../../dictionaries/classrooms/classroom.model';
import {ExternalEvent, TimetableOfClasses, TimetableOfClassesDto} from '../../shared/models/timetable-of-classes.model';
import Tooltip from 'tooltip.js';
import {TimetableOfClassesService} from '../../shared/services/timetable-of-classes.service';
import {Teacher, TeacherDto} from '../../dictionaries/teachers/teacher.model';
import {GroupDto} from '../../dictionaries/groups/group.model';
import {DescriptionOfPlanDto} from '../../dictionaries/courses/course.model';

declare let $: any;

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
   // encapsulation: ViewEncapsulation.None,
})
export class TimetableComponent implements  AfterViewInit {

    @ViewChild('fullcalendar', {static: false}) fullcalendar: FullCalendarComponent;
    @ViewChild('external', {static: true}) external: ElementRef;
    @Input() public events: ExternalEvent[];

    tooltip: Tooltip;
    timetableOfClasses: TimetableOfClasses [];
    calendarEvents: EventInput [];
    time: string;


    header = {
        left: 'resourceTimeGridWeek, resourceTimeGrid3Days, resourceTimeGrid5Days, resourceTimeGridDay',
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
            itemSelector: '.fc-event',
            eventData(eventEl) {
                // получаю из div data-event в строку и конвертирую в json, дальше беру необходимые данные
                const data: string = eventEl.getAttribute('data-event');
                const dataObj: ExternalEvent = JSON.parse(data);

                return {
                    title: eventEl.innerText,
                    duration: '00:45',
                    description: dataObj.title + ' ' + dataObj.description
                };
            }
        });

    }

    getEvent(event) {
        return JSON.stringify(event);
    }


    eventReceive(event) {
        const data = event.draggedEl.dataset.event;
        const dataObj = JSON.parse(data);
        console.log('Data' + data);
        console.log('DataObj' + dataObj.objectData.teacherDto);
        // сборка объекта для отправки на сервер
        const timetable: TimetableOfClassesDto = new TimetableOfClassesDto();
        timetable.teacherDto = new TeacherDto();
        timetable.groupDto = new GroupDto();
        timetable.classroomDto = new ClassroomDto();
        timetable.id = null;



        timetable.disciplineDto = dataObj.objectData.disciplineDto;
      //  console.log(timetable);
        timetable.teacherDto.id = dataObj.objectData.teacherDto.id;
       // console.log(timetable);
        timetable.teacherDto.firstName = dataObj.objectData.teacherDto.firstName;
        timetable.teacherDto.lastName = dataObj.objectData.teacherDto.lastName;
        timetable.teacherDto.patronymic = dataObj.objectData.teacherDto.patronymic;
        timetable.teacherDto.typeOfEmployment = dataObj.objectData.teacherDto.typeOfEmployment.id;
        timetable.groupDto.id = dataObj.objectData.groupDto.id;
        timetable.groupDto.groupName = dataObj.objectData.groupDto.groupName;
        timetable.groupDto.numberOfSubgroup = dataObj.objectData.groupDto.numberOfSubgroup;
        timetable.groupDto.typeOfEducation = dataObj.objectData.groupDto.typeOfEducation.id;
        /*timetable.groupDto.descriptionOfPlanDto.id = dataObj.objectData.groupDto.descriptionOfPlanDto.id;
        timetable.groupDto.descriptionOfPlanDto.description = dataObj.objectData.groupDto.descriptionOfPlanDto.description;
        timetable.groupDto.descriptionOfPlanDto.typeOfCourse = dataObj.objectData.groupDto.descriptionOfPlanDto.typeOfCourse.id;*/
        timetable.typeOfWork = dataObj.objectData.typeOfWork.id;
        timetable.lessonNumber = dataObj.objectData.lessonNumber;
        timetable.pairNumber = dataObj.objectData.pairNumber;
        timetable.subgroup = dataObj.objectData.subgroup;
        timetable.status = false;
        timetable.classDate = event.event.start.toISOString().split('T')[0];
        timetable.beginTime = event.event.start.toTimeString().slice(0, 8);
        timetable.finishTime = event.event.end.toTimeString().slice(0, 8);
        this.classroomService.getClassroom(event.event._def.resourceIds[0]).subscribe((res: Classroom) => {
            timetable.classroomDto.id = res.id;
            timetable.classroomDto.number = res.number;
            timetable.classroomDto.typeOfClassroom = res.typeOfClassroom.id;
        });



        console.log(timetable);
        this.timetableOfClassesService.saveOneTimetableOfClasses(timetable).subscribe((res: TimetableOfClasses) => {
            console.log('Пришло с сервера' + res); } );
      //  console.log(event);
      //  console.log(event.draggedEl.dataset.event);
      //  console.log(event.event._def.resourceIds[0]);

    }

    eventDrop(event) {
        console.log(event);
    }

    // метод для передачи Диме периода для ивентов из БД
    getDaysPeriod(info) {
        const startDay = this.fullcalendar.getApi().view.currentStart;
        const endDay = this.fullcalendar.getApi().view.currentEnd;
        startDay.setDate(startDay.getDate() + 1);
        const start = startDay.toISOString().split('T')[0];
        const end = endDay.toISOString().split('T')[0];
        console.log('?classDate1=' + start + '&classDate2=' + end);
        this.time = '?classDate1=' + start + '&classDate2=' + end;
        this.timetableOfClassesService.getTimetableOfClasses(this.time).subscribe(
            (data: TimetableOfClasses[]) => {
                this.timetableOfClasses = data;
                console.log(this.timetableOfClasses);
                this.calendarEvents = [];

                // конвертация объектов из БД в event на календарь
                for (let i = 0, len = Object.keys(data).length; i < len; i++) {
                    this.calendarEvents.push (
                        {
                            title: data[i].disciplineDto.shortDisciplineName + ' гр. ' +
                                data[i].groupDto.groupName,
                            resourceId: data[i].classroomDto.id,
                            start: data[i].classDate + 'T' + data[i].beginTime,
                            end: data[i].classDate + 'T' + data[i].finishTime,
                            description: data[i].disciplineDto.disciplineName + ' ' + data[i].teacherDto.lastName + ' ауд. ' +
                                data[i].classroomDto.number + ' группа ' + data[i].groupDto.groupName + ' подгр.' + data[i].subgroup,
                            color: '#a7f2f5',
                        }
                    );
                }
                console.log(this.calendarEvents);
            }
        );

    }

    handleDateClick(arg) { // handler method
        alert(arg.dateStr);
    }

    click(info) {
        console.log(info.event.extendedProps.description);
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
