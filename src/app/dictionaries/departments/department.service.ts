import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Department} from './department.model';
import {UrlConstants} from '../../shared/url-constants';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})

export class DepartmentService {
    constructor(private httpClient: HttpClient) {}

    getDepartment(id: number): Observable<Department> {
        const url = `${UrlConstants.URL_DEPARTMENT}/${id}`;
        return this.httpClient.get<Department>(url).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    getDepartments(): Observable<Department []> {
        return this.httpClient.get<Department []>(UrlConstants.URL_DEPARTMENT).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }

    saveDepartment(department): Observable<Department> {
        return this.httpClient.post<Department>(UrlConstants.URL_DEPARTMENT, department).pipe(
            tap((res: Department) => console.log(`added department id=${res.id}`)),
            catchError(err => {console.log(err, 'Не удалось добавить кафедру');
                               return of(null); })
        );
    }

    updateDepartment(id: number, department): Observable<any> {
        const url = `${UrlConstants.URL_DEPARTMENT}/${id}`;
        department.id = id;
        return this.httpClient.put(url, department, httpOptions).pipe(
            tap(() => {return console.log(`updated department id=${id}`);
            }),
            catchError(err => {console.log(err, 'Не удалось обновить кафедру');
                               return of(null); })
        );
    }

    deleteDepartment(id: number) {
        const url = `${UrlConstants.URL_DEPARTMENT}/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => console.log(`deleted department id=${id}`)),
            catchError(err => {console.log(err, 'Не удалось удалить кафедру');
                               return of(null); })
        );
    }
}
