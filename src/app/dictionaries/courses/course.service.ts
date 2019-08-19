import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {catchError, tap} from 'rxjs/operators';
import {Course} from './course.model';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const urlC = 'http://localhost:8080/api/courses';

@Injectable({
    providedIn: 'root'
})

export class CourseService {
    constructor(private httpClient: HttpClient) {}

    getCourse(id: number): Observable<Course> {
        const url = `${urlC}/${id}`;
        return this.httpClient.get<Course>(url).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    getCourses(): Observable<Course []> {
        return this.httpClient.get<Course []>(urlC).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }

    saveCourse(course): Observable<Course> {
        return this.httpClient.post<Course>(urlC, course).pipe(
            tap((res: Course) => console.log(`added course id=${res.id}`)),
            catchError(err => {console.log(err, 'Не удалось добавить курс');
                               return of(null); })
        );
    }

    updateCourse(id: number, course): Observable<any> {
        const url = `${urlC}/${id}`;
        course.id = id;
        return this.httpClient.put(url, course, httpOptions).pipe(
            tap(() => {return console.log(`updated course id=${id}`);
            }),
            catchError(err => {console.log(err, 'Не удалось обновить курс');
                               return of(null); })
        );
    }

    deleteCourse(id: number) {
        const url = `${urlC}/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => console.log(`deleted course id=${id}`)),
            catchError(err => {console.log(err, 'Не удалось удалить курс');
                               return of(null); })
        );
    }
}
