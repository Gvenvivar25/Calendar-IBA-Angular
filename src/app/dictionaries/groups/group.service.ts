import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Group, NumberOfStudents} from './group.model';
import {UrlConstants} from '../../shared/url-constants';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})

export class GroupService {
    constructor(private httpClient: HttpClient) {}

    getGroup(id: number): Observable<Group> {
        const url = `${UrlConstants.URL_GROUP}/${id}`;
        return this.httpClient.get<Group>(url).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    getGroups(): Observable<Group []> {
        return this.httpClient.get<Group []>(UrlConstants.URL_GROUP).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    saveGroup(group): Observable<Group> {
        return this.httpClient.post<Group>(UrlConstants.URL_GROUP, group).pipe(
            tap((res: Group) => console.log(`added group id=${res.id}`)),
            catchError(err => {console.log(err, 'Не удалось добавить группу');
                               return of(null); })
        );
    }

    updateGroup(id: number, group): Observable<any> {
        const url = `${UrlConstants.URL_GROUP}/${id}`;
        group.id = id;
        return this.httpClient.put(url, group, httpOptions).pipe(
            tap(() => {return console.log(`updated group id=${id}`);
            }),
            catchError(err => {console.log(err, 'Не удалось обновить группу');
                               return of(null); })
        );
    }

    deleteGroup(id: number) {
        const url = `${UrlConstants.URL_GROUP}/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => console.log(`deleted group id=${id}`)),
            catchError(err => {console.log(err, 'Не удалось удалить группу');
                               return of(null); })
        );
    }

    saveNumberOfStudents(numberOfPersons): Observable<NumberOfStudents> {
        const url = `${UrlConstants.URL_GROUP}/quantity`;
        return this.httpClient.post<NumberOfStudents>(url, numberOfPersons).pipe(
            tap((res: NumberOfStudents) => console.log(`added students to group id=${res.groupDto.id}`)),
            catchError(err => {console.log(err, 'Не удалось добавить студентов в группу');
                               return of(null); })
        );
    }

    getAllNumberOfStudents(id: number): Observable<NumberOfStudents[]> {
        const url = `${UrlConstants.URL_GROUP}/quantity/group/${id}`;
        return this.httpClient.get<NumberOfStudents[]>(url).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    deleteNumberOfStudents(id: number) {
        const url = `${UrlConstants.URL_GROUP}/quantity/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => console.log(`deleted studentsNumber id=${id}`)),
            catchError(err => {console.log(err, 'Не удалось удалить запись');
                               return of(null); })
        );
    }
}
