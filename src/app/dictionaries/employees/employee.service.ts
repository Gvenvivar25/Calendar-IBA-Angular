import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Employee, TypeOfPosition} from './employee.model';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const url = 'http://localhost:8080/api/employees';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    constructor(private httpClient: HttpClient) {}

    getEmployees(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(url)
            .pipe(
                catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                                   return of(null); })
            );
    }

    getEmployee(id: number): Observable<Employee> {
        const urlE = `${url}/${id}`;
        return this.httpClient.get<Employee>(urlE)
            .pipe(
                catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                                   return of(null); })
            );
    }

    saveEmployee(employee): Observable<Employee> {
        return this.httpClient.post<Employee>(url, employee).pipe(
            tap((res: Employee) => console.log(`added employee id=${res.id}`)),
            catchError(err => {console.log(err, 'Не удалось добавить сотрудника');
                               return of(null); })
        );
    }

    updateEmployee(id: number, employee): Observable<any> {
        const urlE = `${url}/${id}`;
        employee.id = id;
        return this.httpClient.put(urlE, employee, httpOptions).pipe(
            tap(() => {
                return console.log(`updated employee id=${id}`);
            }),
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    deleteEmployee(id: number): Observable<any> {
        const urlE = `${url}/${id}`;
        return this.httpClient.delete(urlE, httpOptions).pipe(
            tap(() => console.log(`deleted employee id=${id}`)),
            catchError(err => {console.log(err, 'Не удалось удалить сотрудника');
                               return of(null); })
        );
    }

    getTypesOfPOsition() {
        const urlP = 'http://localhost:8080/api/types_of_position';
        return this.httpClient.get<TypeOfPosition []>(urlP).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }
}
