

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Discipline} from '../disciplines/discipline.model';
import {Observable, of} from 'rxjs';
import {Classroom, TypeOfClassroom} from './classroom.model';
import {catchError, tap} from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import {Teacher, Type} from '../teachers/teacher.model';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const urlC = 'http://localhost:8080/api/classrooms';

@Injectable({
    providedIn: 'root'
})

export class ClassroomService {

    constructor(private httpClient: HttpClient) {}

    getClassroom(id: number): Observable<Classroom> {
        const url = `${urlC}/${id}`;
        return this.httpClient.get<Classroom>(url).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
            );
    }

    getClassrooms(): Observable<Classroom []> {
        return this.httpClient.get<Classroom[]>(urlC).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }

    saveClassroom(classroom): Observable<Classroom> {
        return this.httpClient.post<Classroom>(urlC, classroom).pipe(
            tap((res: Classroom) => console.log(`added classroom id=${res.id}`)),
            catchError(err => {console.log(err, 'Не удалось добавить аудиторию');
                               return of(null); })
        );
    }

    updateClassroom(id: number, classroom): Observable<any> {
        const url = `${urlC}/${id}`;
        classroom.id = id;
        return this.httpClient.put(url, classroom, httpOptions).pipe(
            tap(() => {return console.log(`updated classroom id=${id}`);
            }),
            catchError(err => {console.log(err, 'Не удалось обновить аудиторию');
                               return of(null); })
        );
    }

    deleteClassroom(id: number) {
        const url = `${urlC}/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => console.log(`deleted classroom id=${id}`)),
            catchError(err => {console.log(err, 'Не удалось удалить аудиторию');
                               return of(null); })
        );
    }

    getTypesOfClassroom() {
        const url = 'http://localhost:8080/api/types_of_classroom';
        return this.httpClient.get<TypeOfClassroom []>(url);
    }

}
