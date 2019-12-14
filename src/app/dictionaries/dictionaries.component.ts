import {Component} from '@angular/core';
import {AuthenticationService} from '../shared/services/authentication.service';

@Component({
    selector: 'app-dictionaries',
    templateUrl: './dictionaries.component.html',
    styleUrls: ['./dictionaries.component.scss']
})
export class DictionariesComponent {
    private _opened: boolean = true;
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

    constructor(private authService: AuthenticationService) {}

    get isAdmin() {
        const role = this.authService.userRole;
        if (role === 'ROLE_ADMIN') { return true; } else { return false; }
    }

    get isAdminOrManagerOrView() {
        const role = this.authService.userRole;
        if (role === 'ROLE_ADMIN' || role === 'ROLE_MANAGER' || role === 'ROLE_VIEW') { return true; } else { return false; }
    }

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

}
