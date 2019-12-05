import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Group, NumberOfStudents} from '../models/group.model';
import {UrlConstants} from '../url-constants';
import {ToastrService} from 'ngx-toastr';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})

export class GroupService {
    constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

    getGroup(id: number): Observable<Group> {
        const url = `${UrlConstants.URL_GROUP}/${id}`;
        return this.httpClient.get<Group>(url).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    getGroups(): Observable<Group []> {
        return this.httpClient.get<Group []>(UrlConstants.URL_GROUP).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    saveGroup(group): Observable<Group> {
        return this.httpClient.post<Group>(UrlConstants.URL_GROUP, group).pipe(
            tap(() => this.toastr.success(`Группа добавлена!`)),
            catchError(err => {this.toastr.error(`Не удалось добавить группу`, 'Ошибка');
                               console.log(err, 'Не удалось добавить группу');
                               return of(null); })
        );
    }

    updateGroup(id: number, group): Observable<any> {
        const url = `${UrlConstants.URL_GROUP}/${id}`;
        group.id = id;
        return this.httpClient.put(url, group, httpOptions).pipe(
            tap(() => this.toastr.success(`Запись обновлена!`)),
            catchError(err => {this.toastr.error(`Не удалось обновить запись`, 'Ошибка');
                               console.log(err, 'Не удалось обновить запись');
                               return of(null); })
        );
    }

    deleteGroup(id: number) {
        const url = `${UrlConstants.URL_GROUP}/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => this.toastr.success(`Группа удалена!`)),
            catchError(err => {this.toastr.error(`Не удалось удалить группу`, 'Ошибка');
                               console.log(err, 'Не удалось удалить группу');
                               return of(null); })
        );
    }

    saveNumberOfStudents(numberOfPersons): Observable<NumberOfStudents> {
        const url = `${UrlConstants.URL_GROUP}/quantity`;
        return this.httpClient.post<NumberOfStudents>(url, numberOfPersons).pipe(
            tap(() => this.toastr.success(`Количество студентов добавлено в группу!`)),
            catchError(err => {this.toastr.error(`Не удалось добавить количество студентов в группу`, 'Ошибка');
                               console.log(err, 'Не удалось добавить студентов в группу');
                               return of(null); })
        );
    }

    getAllNumberOfStudents(id: number): Observable<NumberOfStudents[]> {
        const url = `${UrlConstants.URL_GROUP}/quantity/group/${id}`;
        return this.httpClient.get<NumberOfStudents[]>(url).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    deleteNumberOfStudents(id: number) {
        const url = `${UrlConstants.URL_GROUP}/quantity/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => this.toastr.success(`Запись удалена!`)),
            catchError(err => {this.toastr.error(`Не удалось удалить запись`, 'Ошибка');
                               console.log(err, 'Не удалось удалить запись');
                               return of(null); })
        );
    }
}
