import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Discipline} from './discipline.model';
import {UrlConstants} from '../../shared/url-constants';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class DisciplinesService {

    constructor(private httpClient: HttpClient) {}

    getDisciplines(): Observable<Discipline[]> {
        return this.httpClient.get<Discipline[]>(UrlConstants.URL_DISCIPLINE).pipe(
            catchError(err => {console.log(err, 'Не удалось получить данные');
                               return of(null); })
        );
    }

    getDiscipline(id: number): Observable<Discipline> {
        const url = `${UrlConstants.URL_DISCIPLINE}/${id}`;
        return this.httpClient.get<Discipline>(url).pipe(
            catchError(err => {console.log(err, 'Не удалось получить данные');
                               return of(null); })
        );
    }

    saveDisciplines(discipline) {
        return this.httpClient.post<Discipline>(UrlConstants.URL_DISCIPLINE, discipline).pipe(
            tap((res: Discipline) => console.log(`added discipline id=${res.id}`)),
            catchError(err => {console.log(err, 'Не удалось сохранить данные');
                               return of(null); })
        );
    }

    updateDiscipline(id: number, discipline): Observable<any> {
        const url = `${UrlConstants.URL_DISCIPLINE}/${id}`;
        // без id не получается сделать update, поэтому вручную передаю сюда его.
        // возможно стоит как-то через форму реализовать присвоение id
        discipline.id = id;
       // console.log(discipline);
        return this.httpClient.put(url, discipline, httpOptions).pipe(
            tap(() => console.log(`updated discipline id=${id}`)),
            catchError(err => {console.log(err, 'Не удалось обновить данные');
                               return of(null); })
        );
    }

    deleteDiscipline(id: number): Observable<any> {
        const url = `${UrlConstants.URL_DISCIPLINE}/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => console.log(`deleted discipline id=${id}`)),
            catchError(err => {console.log(err, 'Не удалось удалить данные');
                               return of(null); })
        );
    }
}

