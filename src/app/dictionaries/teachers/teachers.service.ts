import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Teacher, Type} from './teacher.model';
import {Discipline} from '../disciplines/discipline.model';


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
                catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                                   return of(null); })
            );
    }

    getTeacher(id: number): Observable<Teacher> {
        const url = `${teachUrl}/${id}`;
        return this.httpClient.get<Teacher>(url)
            .pipe(
                catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                                   return of(null); })
            );
    }

    saveTeacher(teacher): Observable<Teacher> {
        return this.httpClient.post<Teacher>(teachUrl, teacher).pipe(
            tap((res: Teacher) => console.log(`added teacher id=${res.id}`)),
            catchError(err => {console.log(err, 'Не удалось добавить преподавателя');
                               return of(null); })
        );
    }

    updateTeacher(id: number, teacher): Observable<any> {
        const url = `${teachUrl}/${id}`;
        // без id не получается сделать update, поэтому вручную передаю сюда его.
        // возможно стоит как-то через форму реализовать присвоение id
        teacher.id = id;
        // console.log(discipline);
        return this.httpClient.put(url, teacher, httpOptions).pipe(
            tap(() => {
                return console.log(`updated teacher id=${id}`);
            }),
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    deleteTeacher(id: number): Observable<any> {
        const url = `${teachUrl}/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => console.log(`deleted teacher id=${id}`)),
            catchError(err => {console.log(err, 'Не удалось удалить преподавателя');
                               return of(null); })
        );
    }

    getTypesOfEmployment() {
        const url = 'http://localhost:8080/api/types_of_employment';
        return this.httpClient.get<Type []>(url);
    }

    addDisciplineToTeacher(idTeacher: number, idDiscipline: number) {
        const url = `${teachUrl}/${idTeacher}/disciplines/${idDiscipline}`;
        return this.httpClient.put(url, [idTeacher, idDiscipline], httpOptions).pipe(
            tap(() => console.log(`added discipline id=${idDiscipline} to teacher id=${idTeacher}`)),
            catchError(err => {console.log(err, 'Не удалось добавить дисциплину');
                               return of(null); })
        );
    }

    getAllDisciplinesOfTeacher(id: number): Observable<Discipline[]> {
        const url = `${teachUrl}/${id}/disciplines`;
        return this.httpClient.get<Discipline []>(url).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }

    deleteDisciplineOfTeacher(idTeacher: number, idDiscipline: number) {
        const url = `${teachUrl}/${idTeacher}/disciplines/${idDiscipline}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => console.log(`deleted discipline id=${idDiscipline} of teacher id=${idTeacher}`)),
            catchError(err => {console.log(err, 'Не удалось удалить дисциплину преподавателя');
                               return of(null); })
        );
    }
}
