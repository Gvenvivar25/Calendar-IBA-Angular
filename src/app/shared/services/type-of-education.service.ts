import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import { TypeOfEducation} from '../../dictionaries/groups/group.model';
import {catchError} from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const url = 'http://localhost:8080/api/types_of_education';

@Injectable({
    providedIn: 'root'
})

export class TypeOfEducationService {
    constructor(private httpClient: HttpClient) {}

    getTypesOfEducation(): Observable<TypeOfEducation []> {
        return this.httpClient.get<TypeOfEducation []>(url).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }
}
