import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Teacher} from './teacher.model';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const teachUrl = 'http://localhost:8080/api/teachers';

@Injectable({
    providedIn: 'root'
})
export class TeachersService {
    constructor(private httpClient: HttpClient) {}
    getTeachers(): Observable<Teacher[]> {
        return this.httpClient.get<Teacher[]>(teachUrl)
            .pipe(
                catchError(() => Observable.throw('Сервер не доступен'))
            );
    }

    getTeacher(id: number): Observable<Teacher> {
        const url = `${teachUrl}/${id}`;
        return this.httpClient.get<Teacher>(url)
            .pipe(
                catchError(() => Observable.throw('Сервер не доступен'))
            );
    }

    saveTeachers(teacher) {
        return this.httpClient.post<Teacher>(teachUrl, teacher).pipe(
            tap((res: Teacher) => console.log(`added teacher id=${teacher.id}`)),
            catchError(() => Observable.throw('addTeacher'))
        );
    }

    updateTeacher(id: number, teacher): Observable<any> {
        const url = `${teachUrl}/${id}`;
        // без id не получается сделать update, поэтому вручную передаю сюда его.
        // возможно стоит как-то через форму реализовать присвоение id
        teacher.id = id;
        // console.log(discipline);
        return this.httpClient.put(url, teacher, httpOptions).pipe(
            tap(_ => console.log(`updated teacher id=${id}`)),
            catchError(() => Observable.throw('updateTeacher'))
        );
    }

    deleteTeacher(id: number): Observable<any> {
        const url = `${teachUrl}/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(_ => console.log(`deleted teacher id=${id}`)),
            catchError(() => Observable.throw('deleteTeacher'))
        );
    }
}
