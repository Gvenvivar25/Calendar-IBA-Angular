import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {TimetableOfClasses, TimetableOfClassesDto, TimetableOfClassesForEvents} from '../models/timetable-of-classes.model';
import {UrlConstants} from '../url-constants';
import {Classroom} from '../models/classroom.model';
import {ToastrService} from 'ngx-toastr';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})

export class TimetableOfClassesService {
    constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

    getTimetableOfClasses(time): Observable<TimetableOfClasses []> {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/span${time}`;
        return this.httpClient.get<TimetableOfClasses []>(url).pipe(
            catchError(err => {this.toastr.info(`Нет данных за период`);
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }

    getTimetableOfClassesOfGroup(time, groupId): Observable<TimetableOfClasses []> {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/span/group/${groupId}${time}`;
        return this.httpClient.get<TimetableOfClasses []>(url).pipe(
            catchError(err => {this.toastr.info(`Нет данных за период`);
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    getTimetableOfClassesOfTeacher(time, teacherId): Observable<TimetableOfClasses []> {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/span/teacher/${teacherId}${time}`;
        return this.httpClient.get<TimetableOfClasses []>(url).pipe(
            catchError(err => {this.toastr.info(`Нет данных за период`);
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    getTimetableOfClassesOfClassroom(time, classroomId): Observable<TimetableOfClasses []> {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/span/classroom/${classroomId}${time}`;
        return this.httpClient.get<TimetableOfClasses []>(url).pipe(
            catchError(err => {this.toastr.info(`Нет данных за период`);
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    findAllSpanByGroupId(groupId): Observable<TimetableOfClassesForEvents[]> {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/need/${groupId}`;
        return this.httpClient.get<TimetableOfClassesForEvents []>(url).pipe(
            catchError(err => {// this.toastr.info(`Нет данных по группе`);
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    findAllSpanByGroupIdFilterDiscipline(groupId, discId): Observable<TimetableOfClassesForEvents[]> {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/need/${groupId}?d=${discId}`;
        return this.httpClient.get<TimetableOfClassesForEvents []>(url).pipe(
            catchError(err => {this.toastr.info(`Нет данных по заданному предмету`);
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    saveOneTimetableOfClasses(timetable: TimetableOfClassesDto): Observable<TimetableOfClasses> {

        return this.httpClient.post(UrlConstants.URL_TIMETABLE_OF_CLASSES, timetable).pipe(
            tap(() => this.toastr.success(`Запись сохранена!`)),
            catchError(err => {this.toastr.error(`Запись не сохранена`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    getOneTimetableOfClasses(id: number): Observable<TimetableOfClasses> {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/${id}`;
        return this.httpClient.get<TimetableOfClasses>(url).pipe(
            catchError(err => {this.toastr.info(`Нет данных за период`);
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null);
            })
        );
    }

    updateOneTimetableOfClasses(id: number, newTimetable: TimetableOfClassesDto): Observable<TimetableOfClasses> {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/${id}`;
        return this.httpClient.put<TimetableOfClasses>(url, newTimetable).pipe(
            tap(() => this.toastr.success(`Запись обновлена!`)),
            catchError(err => {this.toastr.error(`Запись не сохранена`, 'Ошибка');
                               console.log(err, 'Не удалось обновить запись');
                               return of(null); })
        );
    }

    deleteOneTimetableOfClasses(id: number): Observable<string> {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => this.toastr.success(`Запись удалена!`)),
            catchError(err => {this.toastr.error(`Не удалось удалить запись`, 'Ошибка');
                               console.log(err, 'Не удалось удалить запись');
                               return of(err); })
        );
    }

    getAllFreeClassrooms(date: string, startTime: string, endTime: string): Observable<Classroom []> {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/free?d=${date}&t1=${startTime}&t2=${endTime}`;
        return this.httpClient.get<TimetableOfClasses []>(url).pipe(
            catchError(err => {this.toastr.info(`Нет свободных аудиторий`);
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    confirmTimetableForPeriod(startDate: string, endDate: string) {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/confirm/span?d1=${startDate}&d2=${endDate}`;
        return this.httpClient.put(url, httpOptions).pipe(
            tap(() => this.toastr.success(`Записи подтверждены!`)),
            catchError(err => {this.toastr.error(`Записи не подтверждены`, 'Ошибка');
                               console.log(err, 'Не удалось обновить запись');
                               return of(null); })
        );
    }

    confirmTimetableForGroup(startDate: string, endDate: string, groupId: number) {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/confirm/group/${groupId}?d1=${startDate}&d2=${endDate}`;
        return this.httpClient.put(url, httpOptions).pipe(
            tap(() => this.toastr.success(`Записи подтверждены!`)),
            catchError(err => {this.toastr.error(`Записи не подтверждены`, 'Ошибка');
                               console.log(err, 'Не удалось обновить запись');
                               return of(null); })
        );
    }

    confirmTimetableForTeacher(startDate: string, endDate: string, teacherId: number) {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/confirm/teacher/${teacherId}?d1=${startDate}&d2=${endDate}`;
        return this.httpClient.put(url, httpOptions).pipe(
            tap(() => this.toastr.success(`Записи подтверждены!`)),
            catchError(err => {this.toastr.error(`Записи не подтверждены`, 'Ошибка');
                               console.log(err, 'Не удалось обновить запись');
                               return of(null); })
        );
    }

    confirmTimetable(timetableId: number[]) {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/confirms`;
        return this.httpClient.put(url, timetableId).pipe(
            tap(() => this.toastr.success(`Записи подтверждены!`)),
            catchError(err => {this.toastr.error(`Записи не подтверждены`, 'Ошибка');
                               console.log(err, 'Не удалось обновить запись');
                               return of(null); })
        );
    }

    cancelTimetable(timetableId: number[]) {
        const url = `${UrlConstants.URL_TIMETABLE_OF_CLASSES}/cancel`;
        return this.httpClient.put(url, timetableId).pipe(
            tap(() => this.toastr.success(`Записи отменены!`)),
            catchError(err => {this.toastr.error(`Записи не отменены`, 'Ошибка');
                               console.log(err, 'Не удалось обновить запись');
                               return of(null); })
        );
    }

}
