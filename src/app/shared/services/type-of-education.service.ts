import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import { TypeOfEducation} from '../models/group.model';
import {catchError} from 'rxjs/operators';
import {UrlConstants} from '../url-constants';
import {ToastrService} from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})

export class TypeOfEducationService {
    constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

    getTypesOfEducation(): Observable<TypeOfEducation []> {
        return this.httpClient.get<TypeOfEducation []>(UrlConstants.URL_TYPE_OF_EDUCATION).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }
}
