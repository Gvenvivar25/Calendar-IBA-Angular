import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import { TypeOfEducation} from '../../dictionaries/groups/group.model';
import {catchError} from 'rxjs/operators';
import {UrlConstants} from '../url-constants';


@Injectable({
    providedIn: 'root'
})

export class TypeOfEducationService {
    constructor(private httpClient: HttpClient) {}

    getTypesOfEducation(): Observable<TypeOfEducation []> {
        return this.httpClient.get<TypeOfEducation []>(UrlConstants.URL_TYPE_OF_EDUCATION).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }
}
