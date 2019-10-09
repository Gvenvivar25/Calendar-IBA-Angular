import {
    Component,
    ElementRef,
    IterableDiffers,
    OnInit,
    ViewChild
} from '@angular/core';

import {FullCalendarComponent} from '@fullcalendar/angular';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import {EventInput} from '@fullcalendar/core/structs/event';


@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {
    public events: any [] = ['lalala', 'bababa', 'tatata'];
    options: any;
   // calendarEvents: EventInput [];
    rooms = [
        { id: 'a', title: '303' },
        { id: 'b', title: '305', eventColor: 'green' },
        { id: 'c', title: '307', eventColor: 'red' },
        { id: 'd', title: '309', eventColor: 'yellow' },
        { id: 'e', title: '311', eventColor: 'blue' },
        { id: 'f', title: '317', eventColor: 'orange' },
        { id: 'g', title: '322', eventColor: 'violet' },
    ];

    calendarEvents = [{
        events: [
            {title: 'Java1', resourceId: 'b', start: '2019-10-11T08:30:00',
                end: '2019-10-11T09:20:00', allDay: false, customRender: true},
            { title: 'Java1', resourceId: 'a', start: '2019-10-12T08:50:00',
                end: '2019-10-12T09:50:00', allDay: false },
            { title: 'АПИС', resourceId: 'c', start: '2019-10-10T11:20:00', allDay: false },
            { title: 'Android', resourceId: 'd', start: '2019-10-10T10:40:00', end: '2019-10-10T13:50:00', allDay: false }
        ],
        color: '#07f59e'
    },
        {
            events: [
                {title: 'Java1', start: '2019-10-10T08:30:00', description: 'Java3', end: '2019-10-10T09:20:00', allDay: false},
                { title: 'Android', date: '2019-10-13T10:40:00', end: '2019-10-13T13:50:00', allDay: false }
            ],
            color: '#f5f30f'
        }
    ];

    @ViewChild('fullcalendar', {static: false}) calendarComponent: FullCalendarComponent;
    @ViewChild('external', {static: true}) external: ElementRef;

    constructor(private el: ElementRef, differs: IterableDiffers) {}

    ngOnInit(): void {
        this.options = {
            header: {
                left: 'resourceTimeGridWeek, resourceTimeGrid3Days, resourceTimeGrid5Days, resourceTimeGridDay',
                center: 'title',
                right:  'prev,next today'},

            views: {
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
            },

            buttonText: {
                today:    'Сегодня',
                week:     'Неделя',
                day:      'День',
            },

            slotLabelFormat: {
                hour: 'numeric',
                minute: '2-digit',
                omitZeroMinute: false,
                meridiem: 'short'},

            plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimeGridPlugin],
        };

        new Draggable(this.external.nativeElement, {
            itemSelector: '.fc-event',
            eventData(eventEl) {
                return {
                    title: eventEl.innerText
                };
            }
        });

    }
}
