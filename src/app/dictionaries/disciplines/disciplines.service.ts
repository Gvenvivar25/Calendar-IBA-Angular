import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Discipline} from './discipline.model';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const discUrl = 'http://localhost:8080/api/disciplines';

@Injectable({
    providedIn: 'root'
})
export class DisciplinesService {
   disciplinesChanged = new Subject<Discipline[]>();

    constructor(private httpClient: HttpClient) {}
    getDisciplines(): Observable<Discipline[]> {
        return this.httpClient.get<Discipline[]>(discUrl)
            .pipe(
                catchError(() => Observable.throw('Сервер не доступен'))
            );

    }

    getDiscipline(id: number): Observable<Discipline> {
        const url = `${discUrl}/${id}`;
        return this.httpClient.get<Discipline>(url)
            .pipe(
            catchError(() => Observable.throw('Сервер не доступен'))
        );
    }

    saveDisciplines(discipline) {
        return this.httpClient.post<Discipline>(discUrl, discipline).pipe(
            tap((discipline: Discipline) => console.log(`added discipline id=${discipline.id}`)),
            catchError(() => Observable.throw('addDiscipline'))
        );
    }

    updateDiscipline(id: number, discipline): Observable<any> {
        const url = `${discUrl}/${id}`;
        // без id не получается сделать update, поэтому вручную передаю сюда его. возможно стоит как-то через форму реализовать присвоение id
        discipline.id = id;
       // console.log(discipline);
        return this.httpClient.put(url, discipline, httpOptions).pipe(
            tap(_ => console.log(`updated discipline id=${id}`)),
            catchError(() => Observable.throw('updateDiscipline'))
        );

    }

    deleteDiscipline(id: number): Observable<any> {
        const url = `${discUrl}/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(_ => console.log(`deleted discipline id=${id}`)),
            catchError(() => Observable.throw('deleteDiscipline'))
        );
    }
}

