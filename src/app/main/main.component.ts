import {Component, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {EventInput, OptionsInput} from '@fullcalendar/core';
import timeGrigPlugin from '@fullcalendar/timegrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import Tooltip from 'tooltip-js/dist/tooltip.js';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    providers: []
})

export class MainComponent implements OnInit {

    @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;

    calendarEvents: any [] = [{
        events: [
            {title: 'Java1', description: 'Java1, препод: Салапура, группа ПП1.18', start: '2019-09-17T08:30:00',
                end: '2019-09-17T09:20:00', allDay: false},
            { title: 'Java1', start: '2019-09-17T08:50:00', end: '2019-09-17T09:50:00', allDay: false },
            { title: 'АПИС', date: '2019-09-17T11:20:00', end: '2019-09-17T12:40:00', allDay: false },
            { title: 'Android', date: '2019-09-19T10:40:00', end: '2019-09-19T13:50:00', allDay: false }
            ],
        color: '#07f59e'
        },
        {
            events: [
                {title: 'Java1', start: '2019-09-18T08:30:00', end: '2019-09-18T09:20:00', allDay: false},
                { title: 'Android', date: '2019-09-19T10:40:00', end: '2019-09-19T13:50:00', allDay: false }
            ],
            color: '#f5f30f'
        }
    ];

    calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin, listPlugin];

    buttonText = {
        today:    'Сегодня',
        month:    'Месяц',
        week:     'Неделя',
        day:      'День',
        list:     'Список'
    };
    header = {
    left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    center: 'title',
    right:  'prev,next today'};

    slotLabelFormat = {
    hour: 'numeric',
    minute: '2-digit',
    omitZeroMinute: false,
    meridiem: 'short'};

    ngOnInit() {}

    /*MouseOver(info) {
        console.log(info);
        const tooltip = new Tooltip(info.el, {
            title: info.event.extendedProps.description,
            placement: 'top',
            trigger: 'hover',
            container: 'body'
        });
    }*/


    /*handleDateClick(arg) {
        if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
            this.calendarEvents = this.calendarEvents.events.concat({ // add new event data. must create new array
                title: 'New Event',
                start: arg.date,
                allDay: arg.allDay
            });
        }
    }*/


    /* eventClick(model) {
         console.log(model);
     }
     eventDragStop(model) {
         console.log(model);
     }
     dateClick(model) {
         console.log(model);
     }*/
   /* updateHeader() {
        this.option.header = {
            left: 'prev,next myCustomButton',
            center: 'title',
            right: ''
        };
    }
    updateEvents() {
        this.calendarEvents = [{
            title: 'Updaten Event',
            start: this.yearMonth + '-08',
            end: this.yearMonth + '-10'
        }];
    }
    get yearMonth(): string {
        const dateObj = new Date();
        return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
    }*/


}
