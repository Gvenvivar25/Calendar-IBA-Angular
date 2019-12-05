import {AfterViewChecked, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ExternalEvent, NewEvent, TimetableOfClassesForEvents} from '../../shared/models/timetable-of-classes.model';
import {TimetableOfClassesService} from '../../shared/services/timetable-of-classes.service';
import {GroupService} from '../../shared/services/group.service';
import {Group} from '../../shared/models/group.model';

import {Discipline} from '../../shared/models/discipline.model';
import {DisciplinesService} from '../../shared/services/disciplines.service';

@Component({
  selector: 'app-retraining',
  templateUrl: './retraining.component.html',
  styleUrls: ['./retraining.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RetrainingComponent implements OnInit, AfterViewChecked {

    constructor(private timetableOfClassesService: TimetableOfClassesService, private groupService: GroupService,
                private disciplinesService: DisciplinesService) {}

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
// ------------------- конец методов sidebar ---------------------------------------------//

    group: Group;
    groups: Group [];
    discipline: Discipline;
    disciplines: Discipline[];
    externalEvents: ExternalEvent[];
    timetableDetail: NewEvent;
    isNew = null;

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
    ngOnInit(): void {
        this.groupService.getGroups().subscribe((res: Group[]) => {
            this.groups = res;
        } );
        this.disciplinesService.getDisciplines().subscribe((res: Discipline[]) => {
            this.disciplines = res;
        });
    }

    ngAfterViewChecked() {}

    onSubmit() {
        console.log(this.group);
        if (this.discipline) {
            this.timetableOfClassesService.findAllSpanByGroupIdFilterDiscipline(this.group, this.discipline).
            subscribe((res: TimetableOfClassesForEvents[]) => {
                //   console.log(res);
                this.externalEvents = [];
                if (res != null) {
                    for (let i = 0, len = Object.keys(res).length; i < len; i++) {
                        this.externalEvents.push({
                            title: res[i].timetableOfClassesDto.disciplineDto.shortDisciplineName + ' ' +
                                res[i].timetableOfClassesDto.typeOfWork.short_value + ' ' +
                                res[i].timetableOfClassesDto.groupDto.groupName + '-' +
                                res[i].timetableOfClassesDto.subgroup,
                            description: res[i].timetableOfClassesDto.disciplineDto.shortDisciplineName + ' '
                                + res[i].timetableOfClassesDto.teacherDto.lastName + ' ' +
                                res[i].timetableOfClassesDto.teacherDto.firstName.substring(0, 1) + '.' +
                                res[i].timetableOfClassesDto.teacherDto.patronymic.substring(0, 1) + '., гр. ' +
                                res[i].timetableOfClassesDto.groupDto.groupName + '-'
                                + res[i].timetableOfClassesDto.subgroup,
                            objectData: res[i].timetableOfClassesDto,
                            need: res[i].need
                        });
                    }
                    this.externalEvents.sort((a: ExternalEvent, b: ExternalEvent): number => {
                        if (a.title < b.title) {
                            return -1;
                        }
                        if (a.title > b.title) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    console.log(this.externalEvents);
                }
            });
        } else {
            this.timetableOfClassesService.findAllSpanByGroupId(this.group).subscribe((res: TimetableOfClassesForEvents[]) => {
             //   console.log(res);
                this.externalEvents = [];
                if (res != null) {
                    for (let i = 0, len = Object.keys(res).length; i < len; i++) {
                        this.externalEvents.push({
                            title: res[i].timetableOfClassesDto.disciplineDto.shortDisciplineName + ' ' +
                                res[i].timetableOfClassesDto.typeOfWork.short_value + ' ' +
                                res[i].timetableOfClassesDto.groupDto.groupName + '-' +
                                res[i].timetableOfClassesDto.subgroup,
                            description: res[i].timetableOfClassesDto.disciplineDto.shortDisciplineName + ' '
                                + res[i].timetableOfClassesDto.teacherDto.lastName + ' ' +
                                res[i].timetableOfClassesDto.teacherDto.firstName.substring(0, 1) + '.' +
                                res[i].timetableOfClassesDto.teacherDto.patronymic.substring(0, 1) + '., гр. ' +
                                res[i].timetableOfClassesDto.groupDto.groupName + '-'
                                + res[i].timetableOfClassesDto.subgroup,
                            objectData: res[i].timetableOfClassesDto,
                            need: res[i].need
                        });
                    }
                    this.externalEvents.sort((a: ExternalEvent, b: ExternalEvent): number => {
                        if (a.title < b.title) {
                            return -1;
                        }
                        if (a.title > b.title) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    console.log(this.externalEvents);
                }
            });
        }
        this._opened = false;
    }

    onRequestNewEvent(e: NewEvent): void {
        this.isNew = true;
        this.timetableDetail = e;
    }

    onRequestUpdateEvent(e: NewEvent): void {
        this.isNew = false;
        this.timetableDetail = e;
    }

    onCloseTimetableDetail(): void {
        this.timetableDetail = null;
        this.isNew = null;
    }

    onAdd(event: NewEvent): void {
       // this.appointments = [...this.appointments, { id: new Date().getTime().toString(), ...appointment }];
        this.onCloseTimetableDetail();
    }

    onUpdate(event: NewEvent): void {
       /* this.appointments = this.appointments.map(
            a => a.id === appointment.id ? { ...a, ...appointment } : a
        );*/
        this.onCloseTimetableDetail();
    }

    onEventUpdated(event: NewEvent): void {
        this.onUpdate(event);
    }

    onClickButtonOk(event: string) {
        this.onSubmit();

    }
}


