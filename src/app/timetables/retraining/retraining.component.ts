import {AfterViewChecked, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ExternalEvent, TimetableOfClassesForEvents} from '../../shared/models/timetable-of-classes.model';
import {TimetableOfClassesService} from '../../shared/services/timetable-of-classes.service';
import {GroupService} from '../../dictionaries/groups/group.service';
import {Group} from '../../dictionaries/groups/group.model';
import {EventInput} from '@fullcalendar/core';

@Component({
  selector: 'app-retraining',
  templateUrl: './retraining.component.html',
  styleUrls: ['./retraining.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RetrainingComponent implements OnInit, AfterViewChecked {

    constructor(private timetableOfClassesService: TimetableOfClassesService, private groupService: GroupService) {}

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
    externalEvents: ExternalEvent[];
    timetableDetail: EventInput;
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
    }

    ngAfterViewChecked() {}

    onSubmit() {
        console.log(this.group);
        this.timetableOfClassesService.findAllSpanByGroupId(this.group).subscribe((res: TimetableOfClassesForEvents[]) => {
         //   console.log(res);
            this.externalEvents = [];
            for (let i = 0, len = Object.keys(res).length; i < len; i++) {
                this.externalEvents.push({title: res[i].timetableOfClassesDto.disciplineDto.shortDisciplineName + ' ' +
                                            res[i].timetableOfClassesDto.groupDto.groupName + '/' + res[i].timetableOfClassesDto.subgroup,
                                            description: res[i].timetableOfClassesDto.teacherDto.lastName,
                                            objectData: res[i].timetableOfClassesDto,
                                            need: res[i].need});

            }
            console.log(this.externalEvents);
        });
        this._opened = false;
    }
}


