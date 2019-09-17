import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {catchError} from 'rxjs/operators';
import {TypeOfCourse} from '../../dictionaries/courses/course.model';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const url = 'http://localhost:8080/api/types_of_course';

@Injectable({
    providedIn: 'root'
})

export class TypeOfCourseService {
    constructor(private httpClient: HttpClient) {}

    getTypesOfCourse(): Observable<TypeOfCourse []> {
        return this.httpClient.get<TypeOfCourse []>(url).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }
}
