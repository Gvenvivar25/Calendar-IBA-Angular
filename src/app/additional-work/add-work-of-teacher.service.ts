import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {UrlConstants} from '../shared/url-constants';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AddWorkOfTeacher, TypeOfAddWork} from './add-work-of-teacher.model';
import {Classroom} from '../dictionaries/classrooms/classroom.model';

@Injectable({
    providedIn: 'root'
})

export class AddWorkOfTeacherService {

    constructor(private httpClient: HttpClient) {}

    getAllAddWork(startDate, endDate): Observable<AddWorkOfTeacher []> {
        const url = `${UrlConstants.URL_ADDWORK}/span?d1=${startDate}&d2=${endDate}`;
        return this.httpClient.get<AddWorkOfTeacher[]>(url).pipe(
            map(events =>
            events.sort((a: AddWorkOfTeacher, b: AddWorkOfTeacher): number => {
                if (a.teacherDto.lastName < b.teacherDto.lastName) {
                return -1; }
                if (a.teacherDto.lastName > b.teacherDto.lastName) {return 1; } else { return 0; }} )
            ),
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    getOneWork(id: number): Observable<AddWorkOfTeacher> {
        const url = `${UrlConstants.URL_ADDWORK}/${id}`;
        return this.httpClient.get<AddWorkOfTeacher>(url).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    addNewWork(newWork): Observable<AddWorkOfTeacher> {
        return this.httpClient.post<AddWorkOfTeacher>(UrlConstants.URL_ADDWORK, newWork).pipe(
            tap((res: AddWorkOfTeacher) => console.log(`added work id=${res.id}`)),
            catchError(err => {console.log(err, 'Не удалось добавить запись');
                               return of(null); })
        );
    }

    updateAddWork(addWork): Observable<any> {
        const url = `${UrlConstants.URL_ADDWORK}/${addWork.id}`;
        return this.httpClient.put(url, addWork).pipe(
            tap(() => {return console.log(`updated classroom id=${addWork.id}`);
            }),
            catchError(err => {console.log(err, 'Не удалось обновить запись');
                               return of(null); })
        );
    }

    deleteAddWork(id: number) {
        const url = `${UrlConstants.URL_ADDWORK}/${id}`;
        return this.httpClient.delete(url).pipe(
            tap(() => console.log(`deleted addWork id=${id}`)),
            catchError(err => {console.log(err, 'Не удалось удалить запись о нагрузке');
                               return of(null); })
        );
    }
    
    getTypesOfAddWork(): Observable<TypeOfAddWork []> {
        return this.httpClient.get<TypeOfAddWork[]>(UrlConstants.URL_TYPE_OF_ADD_WORK).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }
}
