import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {catchError} from 'rxjs/operators';
import {TypeOfCourse} from '../models/course.model';
import {UrlConstants} from '../url-constants';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})

export class TypeOfCourseService {
    constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

    getTypesOfCourse(): Observable<TypeOfCourse []> {
        return this.httpClient.get<TypeOfCourse []>(UrlConstants.URL_TYPE_OF_COURSE).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }
}
