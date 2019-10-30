import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {TimetableOfClasses, TimetableOfClassesDto, TimetableOfClassesForEvents} from '../models/timetable-of-classes.model';
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

    getTimetableOfClassesOfGroup(time, groupId): Observable<TimetableOfClasses []> {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/span/group/${groupId}${time}`;
        return this.httpClient.get<TimetableOfClasses []>(url).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    getTimetableOfClassesOfTeacher(time, teacherId): Observable<TimetableOfClasses []> {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/span/teacher/${teacherId}${time}`;
        return this.httpClient.get<TimetableOfClasses []>(url).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    getTimetableOfClassesOfClassroom(time, classroomId): Observable<TimetableOfClasses []> {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/span/classroom/${classroomId}${time}`;
        return this.httpClient.get<TimetableOfClasses []>(url).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    findAllSpanByGroupId(groupId): Observable<TimetableOfClassesForEvents[]> {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/need/${groupId}`;
        return this.httpClient.get<TimetableOfClassesForEvents []>(url).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    saveOneTimetableOfClasses(timetable: TimetableOfClassesDto): Observable<TimetableOfClasses> {

        return this.httpClient.post(UrlConstants.URL_TIMETABLE_OF_CLASSES, timetable).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    getOneTimetableOfClasses(id: number): Observable<TimetableOfClasses> {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/${id}`;
        return this.httpClient.get<TimetableOfClasses>(url).pipe(
            catchError(err => {
                console.log(err, 'Отсутсвуют данные в БД');
                return of(null);
            })
        );
    }

    updateOneTimetableOfClasses(id: number, newTimetable: TimetableOfClassesDto): Observable<TimetableOfClasses> {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/${id}`;
        return this.httpClient.put<TimetableOfClasses>(url, newTimetable).pipe(
            tap(() => {
                return console.log(`updated timetableOfClasses id=${id}`);
            }),
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

}
