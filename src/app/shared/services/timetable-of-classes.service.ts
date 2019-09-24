import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {TimetableOfClasses} from '../models/timetable-of-classes.model';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const url = 'http://localhost:8080/api/timetable_of_classes';

@Injectable({
    providedIn: 'root'
})

export class TimetableOfClassesService {
    constructor(private httpClient: HttpClient) {}

    getTimetableOfClasses(time): Observable<TimetableOfClasses []> {
        const urlT = `${url}?classDate=${time}`;
        return this.httpClient.get<TimetableOfClasses []>(urlT).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }


}
