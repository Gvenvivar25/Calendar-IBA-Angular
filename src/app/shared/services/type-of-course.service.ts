import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TypeOfCourse} from '../../dictionaries/groups/group.model';
import {catchError} from 'rxjs/operators';

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
