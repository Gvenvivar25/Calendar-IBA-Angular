import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {TimetableOfClasses} from '../models/timetable-of-classes.model';
import {UrlConstants} from '../url-constants';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})

export class TimetableOfClassesService {
    constructor(private httpClient: HttpClient) {}

    getTimetableOfClasses(time): Observable<TimetableOfClasses []> {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/span${time}`;
        return this.httpClient.get<TimetableOfClasses []>(url).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }


}
