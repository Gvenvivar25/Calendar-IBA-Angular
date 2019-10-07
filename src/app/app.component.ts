import {Component, HostListener} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calendar';
  /*  @HostListener('window:beforeunload', ['$event'])
    clearLocalStorage(event) {
        localStorage.clear();
        console.log('token cleared!');
    }*/

    constructor() {}
}
