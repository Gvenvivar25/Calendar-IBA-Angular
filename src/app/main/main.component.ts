import { Component, ViewChild, ViewEncapsulation} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {EventInput} from '@fullcalendar/core';
import timeGrigPlugin from '@fullcalendar/timegrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import Tooltip from 'tooltip.js';
import {TimetableOfClasses} from '../shared/models/timetable-of-classes.model';
import {TimetableOfClassesService} from '../shared/services/timetable-of-classes.service';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: []
})

export class MainComponent {
    tooltip: Tooltip;
    timetableOfClasses: TimetableOfClasses [];
    calendarEvents: EventInput [];
    time: string;

    @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;
    constructor(private timetableOfClassesService: TimetableOfClassesService) {
    }


    // ------------------- настройки отображения расписания ----------------------------------//

    /*events =  {
        url: 'http://localhost:8080/api/timetable_of_classes?classDate=2019-09-09',
        method: 'POST',
        extraParams: {
            custom_param1: 'something',
            custom_param2: 'somethingelse'
        },
        failure() {
        alert('there was an error while fetching events!');
    },
    color: 'yellow',   // a non-ajax option
    textColor: 'black' // a non-ajax option
};*/

    /*calendarEvents = [{
        events: [
            {title: 'Java1', description: 'Java1, препод: Салапура, группа ПП1.18', start: '2019-09-17T08:30:00',
                end: '2019-09-17T09:20:00', allDay: false, customRender: true},
            { title: 'Java1', start: '2019-09-17T08:50:00', description: 'Java1, препод: Storojev, группа ПП1.18',
                end: '2019-09-17T09:50:00', allDay: false },
            { title: 'АПИС', date: '2019-09-17T11:20:00', description: 'Java2', end: '2019-09-17T12:40:00', allDay: false },
            { title: 'Android', date: '2019-09-19T10:40:00', end: '2019-09-19T13:50:00', allDay: false }
        ],
        color: '#07f59e'
    },
        {
            events: [
                {title: 'Java1', start: '2019-09-18T08:30:00', description: 'Java3', end: '2019-09-18T09:20:00', allDay: false},
                { title: 'Android', date: '2019-09-19T10:40:00', end: '2019-09-19T13:50:00', allDay: false }
            ],
            color: '#f5f30f'
        }
    ];*/

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

    // ------------------- конец настроек расписания ----------------------------------//


 // метод для передачи Диме периода для ивентов из БД
    getDaysPeriod(info) {
        const startDay = this.calendarComponent.getApi().view.currentStart;
        const endDay = this.calendarComponent.getApi().view.currentEnd;
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
                            title: data[i].disciplineDto.shortDisciplineName + ' ' +  data[i].teacherDto.lastName + ' ауд. ' +
                                data[i].classroomDto.number,
                            start: data[i].classDate + 'T' + data[i].beginTime,
                            end: data[i].classDate + 'T' + data[i].finishTime,
                            description: data[i].disciplineDto.shortDisciplineName + ' ' + data[i].teacherDto.lastName + ' ауд. ' +
                                data[i].classroomDto.number + ' группа ' + data[i].groupDto.groupName + ' подгр.' + data[i].subgroup,
                            color: '#88ff71',
                        }
                    );
                }
                console.log(this.calendarEvents);
            }
        );

        }

/*    MouseOver(event) {
        console.log(event);

    }*/
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
