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
import {Classroom} from '../../dictionaries/classrooms/classroom.model';
import {ExternalEvent, TimetableOfClasses} from '../../shared/models/timetable-of-classes.model';
import Tooltip from 'tooltip.js';
import {TimetableOfClassesService} from '../../shared/services/timetable-of-classes.service';

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
        console.log(data);
        const dataObj: ExternalEvent = JSON.parse(data);

        const timetable: TimetableOfClasses = new TimetableOfClasses();
        timetable.disciplineDto = dataObj.objectData.disciplineDto;
        timetable.teacherDto = dataObj.objectData.teacherDto;
        timetable.groupDto = dataObj.objectData.groupDto;
        timetable.typeOfWork = dataObj.objectData.typeOfWork;
        timetable.lessonNumber = dataObj.objectData.lessonNumber;
        timetable.pairNumber = dataObj.objectData.pairNumber;
        timetable.subgroup = dataObj.objectData.subgroup;
        timetable.status = false;
        timetable.classDate = event.event.start.toISOString().split('T')[0];
        timetable.beginTime = event.event.start.toTimeString().slice(0, 8);
        timetable.finishTime = event.event.end.toTimeString().slice(0, 8);
        this.classroomService.getClassroom(event.event._def.resourceIds[0]).subscribe((res: Classroom) => {
            timetable.classroomDto = res;
        });



        console.log(timetable);


        console.log(event);
      //  console.log(event.draggedEl.dataset.event);
        console.log(event.event._def.resourceIds[0]);

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
