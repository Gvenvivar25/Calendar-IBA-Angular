import {AfterViewChecked, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import Tooltip from 'tooltip.js';
import {TimetableOfClasses} from '../../shared/models/timetable-of-classes.model';
import {EventInput} from '@fullcalendar/core/structs/event';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {TimetableOfClassesService} from '../../shared/services/timetable-of-classes.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {GroupService} from '../../dictionaries/groups/group.service';
import {Group} from '../../dictionaries/groups/group.model';
import {Classroom} from '../../dictionaries/classrooms/classroom.model';
import interactionPlugin, { ThirdPartyDraggable } from '@fullcalendar/interaction';

@Component({
  selector: 'app-retraining',
  templateUrl: './retraining.component.html',
  styleUrls: ['./retraining.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RetrainingComponent implements OnInit, AfterViewChecked {

    private _opened: boolean = false;
    private _modeNum: number = 1;
    private _positionNum: number = 0;
    private _dock: boolean = false;
    private _closeOnClickOutside: boolean = false; // автоскрытие меню по клику мимо
    private _closeOnClickBackdrop: boolean = false;
    private _showBackdrop: boolean = false;
    private _animate: boolean = true;
    private _trapFocus: boolean = false;
    private _autoFocus: boolean = false;
    private _keyClose: boolean = false;
    private _autoCollapseHeight: number = null;
    private _autoCollapseWidth: number = null;

    private _MODES: Array<string> = ['over', 'push', 'slide'];
    private _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];


    // ------------------- методы sidebar ---------------------------------------------//

    private _toggleOpened(): void {
        this._opened = !this._opened;
    }

    private _toggleMode(): void {
        this._modeNum++;
        if (this._modeNum === this._MODES.length) {
            this._modeNum = 0;
        }
    }

    private _toggleAutoCollapseHeight(): void {
        this._autoCollapseHeight = this._autoCollapseHeight ? null : 300;
    }

    private _toggleAutoCollapseWidth(): void {
        this._autoCollapseWidth = this._autoCollapseWidth ? null : 500;
    }

    private _togglePosition(): void {
        this._positionNum++;
        if (this._positionNum === this._POSITIONS.length) {
            this._positionNum = 0;
        }
    }

    private _toggleDock(): void {
        this._dock = !this._dock;
    }

    private _toggleCloseOnClickOutside(): void {
        this._closeOnClickOutside = !this._closeOnClickOutside;
    }

    private _toggleCloseOnClickBackdrop(): void {
        this._closeOnClickBackdrop = !this._closeOnClickBackdrop;
    }

    private _toggleShowBackdrop(): void {
        this._showBackdrop = !this._showBackdrop;
    }

    private _toggleAnimate(): void {
        this._animate = !this._animate;
    }

    private _toggleTrapFocus(): void {
        this._trapFocus = !this._trapFocus;
    }

    private _toggleAutoFocus(): void {
        this._autoFocus = !this._autoFocus;
    }

    private _toggleKeyClose(): void {
        this._keyClose = !this._keyClose;
    }
// ------------------- конец методов sidebar ---------------------------------------------//

    constructor(private timetableOfClassesService: TimetableOfClassesService, private groupService: GroupService) {}
    ngOnInit(): void {
        /*this.groupService.getGroups().subscribe((res: Group[]) => {
            this.groups = res;
        } );
*/
        /*this.classesForm = new FormGroup({
            group: new FormControl([]),
        });*/
    }

    ngAfterViewChecked() {

    }

   /* addValueToMap(key: string, value: number) {
        this.groupNeedMapStr.set(key, value);
    }*/

    /*onSubmit() {
        console.log(this.group);


        this.timetableOfClassesService.findAllSpanByGroupId(this.group).subscribe((res: Map<TimetableOfClasses, number>) => {
            console.log(res);
            this.groupNeedMapStr = new Map<string, number>();
            for (let [key, value] of Object.entries(res)) {
                console.log('ключ: ' + key + ' значение: ' + value);
                this.addValueToMap(key, value);
            }
            console.log(this.groupNeedMapStr);
            /!*
            res.forEach((value: number, key: TimetableOfClasses) => {
                this.events.set({title: key.disciplineDto.shortDisciplineName + ' ' + key.typeOfWork,
                    description: key.disciplineDto.shortDisciplineName + ' ' + key.teacherDto.lastName + ' ' +
                key.typeOfWork, start: null, end: null}, value);
                 } ) ;*!/
        });
      //  console.log(this.events);
    }*/

    // метод для передачи Диме периода для ивентов из БД
/*
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

    drop(date) {
        console.log('drop: ', date);
    }

*/



}

export class EventTimetable {
    title: string;
    description: string;
    start: string;
    end: string;
}
