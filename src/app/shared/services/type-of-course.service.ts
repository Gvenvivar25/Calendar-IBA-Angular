import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {catchError} from 'rxjs/operators';
import {TypeOfCourse} from '../../dictionaries/courses/course.model';
import {UrlConstants} from '../url-constants';

@Injectable({
    providedIn: 'root'
})

export class TypeOfCourseService {
    constructor(private httpClient: HttpClient) {}

    getTypesOfCourse(): Observable<TypeOfCourse []> {
        return this.httpClient.get<TypeOfCourse []>(UrlConstants.URL_TYPE_OF_COURSE).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }
}
