import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {ExternalEvent, NewEvent, TimetableOfClasses} from '../../../shared/models/timetable-of-classes.model';
import Tooltip from 'tooltip.js';
import {EventInput} from '@fullcalendar/core/structs/event';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import {TimetableOfClassesService} from '../../../shared/services/timetable-of-classes.service';

@Component({
  selector: 'app-booking-timetable',
  templateUrl: './booking-timetable.component.html',
  styleUrls: ['./booking-timetable.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BookingTimetableComponent implements OnInit {

    @ViewChild('fullcalendar', {static: false}) fullcalendar: FullCalendarComponent;
    @ViewChild('external', {static: true}) external: ElementRef;
    @Input() public events: ExternalEvent[];
    @Output() requestNewEvent = new EventEmitter<NewEvent>();
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
                //  console.log(this.timetableOfClasses);
                this.calendarEvents = [];

                // конвертация объектов из БД в event на календарь
                for (let i = 0, len = Object.keys(data).length; i < len; i++) {
                    this.calendarEvents.push (
                        {
                            id: data[i].id,
                            title: data[i].disciplineDto.shortDisciplineName + ' гр. ' +
                                data[i].groupDto.groupName,
                            resourceId: data[i].classroomDto.id,
                            start: data[i].classDate + 'T' + data[i].beginTime,
                            end: data[i].classDate + 'T' + data[i].finishTime,
                            description: data[i].disciplineDto.disciplineName + ' ' + data[i].teacherDto.lastName + ' ауд. ' +
                                data[i].classroomDto.number + ' группа ' + data[i].groupDto.groupName + ' подгр.' + data[i].subgroup,
                            color: '#ffac50',
                        }
                    );
                }
                console.log(this.calendarEvents);
            }
        );
    }

    handleDateClick(arg) { // handler method
        //  alert(arg.dateStr);
        console.log(arg);
        this.requestNewEvent.emit(this.createNewEvent(arg));
    }

    eventClick(info) {
        alert('Event: ' + info.event.title);


        // change the border color just for fun
        info.el.style.borderColor = 'red';
    }

    createNewEvent(arg): NewEvent {
        const newEvent: NewEvent = new NewEvent();
        newEvent.title = 'lalala';

        newEvent.day = arg.dateStr.split('T')[0];
        newEvent.startTime = arg.dateStr.substring(11, 16);
        newEvent.endTime = arg.dateStr.substring(11, 16);
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

    handleEventMouseLeave(info) {
        this.tooltip.dispose();
    }


}
