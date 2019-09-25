import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Employee, TypeOfPosition} from './employee.model';
import {UrlConstants} from '../../shared/url-constants';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    constructor(private httpClient: HttpClient) {}

    getEmployees(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(UrlConstants.URL_EMPLOYEE)
            .pipe(
                catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                                   return of(null); })
            );
    }

    getEmployee(id: number): Observable<Employee> {
        const url = `${UrlConstants.URL_EMPLOYEE}/${id}`;
        return this.httpClient.get<Employee>(url)
            .pipe(
                catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                                   return of(null); })
            );
    }

    saveEmployee(employee): Observable<Employee> {
        return this.httpClient.post<Employee>(UrlConstants.URL_EMPLOYEE, employee).pipe(
            tap((res: Employee) => console.log(`added employee id=${res.id}`)),
            catchError(err => {console.log(err, 'Не удалось добавить сотрудника');
                               return of(null); })
        );
    }

    updateEmployee(id: number, employee): Observable<any> {
        const url = `${UrlConstants.URL_EMPLOYEE}/${id}`;
        employee.id = id;
        return this.httpClient.put(url, employee, httpOptions).pipe(
            tap(() => {
                return console.log(`updated employee id=${id}`);
            }),
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    deleteEmployee(id: number): Observable<any> {
        const url = `${UrlConstants.URL_EMPLOYEE}/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => console.log(`deleted employee id=${id}`)),
            catchError(err => {console.log(err, 'Не удалось удалить сотрудника');
                               return of(null); })
        );
    }

    getTypesOfPOsition() {
        return this.httpClient.get<TypeOfPosition []>(UrlConstants.URL_TYPE_OF_POSITION).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }
}
