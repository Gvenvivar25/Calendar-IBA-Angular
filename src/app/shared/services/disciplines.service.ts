import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Discipline} from '../models/discipline.model';
import {UrlConstants} from '../url-constants';
import {ToastrService} from 'ngx-toastr';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class DisciplinesService {

    constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

    getDisciplines(): Observable<Discipline[]> {
        return this.httpClient.get<Discipline[]>(UrlConstants.URL_DISCIPLINE).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Не удалось получить данные');
                               return of(null); })
        );
    }

    getDiscipline(id: number): Observable<Discipline> {
        const url = `${UrlConstants.URL_DISCIPLINE}/${id}`;
        return this.httpClient.get<Discipline>(url).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Не удалось получить данные');
                               return of(null); })
        );
    }

    saveDisciplines(discipline) {
        return this.httpClient.post<Discipline>(UrlConstants.URL_DISCIPLINE, discipline).pipe(
            tap(() => this.toastr.success(`Предмет добавлен!`)),
            catchError(err => {this.toastr.error(`Не удалось добавить предмет`, 'Ошибка');
                               console.log(err, 'Не удалось сохранить данные');
                               return of(null); })
        );
    }

    updateDiscipline(id: number, discipline): Observable<any> {
        const url = `${UrlConstants.URL_DISCIPLINE}/${id}`;
        discipline.id = id;
        return this.httpClient.put(url, discipline, httpOptions).pipe(
            tap(() => this.toastr.success(`Запись обновлена!`)),
            catchError(err => {this.toastr.error(`Не удалось обновить запись`, 'Ошибка');
                               console.log(err, 'Не удалось обновить данные');
                               return of(null); })
        );
    }

    deleteDiscipline(id: number): Observable<any> {
        const url = `${UrlConstants.URL_DISCIPLINE}/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => this.toastr.success(`Предмет удален!`)),
            catchError(err => {this.toastr.error(`Не удалось удалить предмет`, 'Ошибка');
                               console.log(err, 'Не удалось удалить данные');
                               return of(null); })
        );
    }
}

