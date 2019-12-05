import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Employee, TypeOfPosition} from '../models/employee.model';
import {UrlConstants} from '../url-constants';
import {ToastrService} from 'ngx-toastr';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

    getEmployees(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(UrlConstants.URL_EMPLOYEE)
            .pipe(
                catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                                   console.log(err, 'Отсутсвуют данные в БД');
                                   return of(null); })
            );
    }

    getEmployee(id: number): Observable<Employee> {
        const url = `${UrlConstants.URL_EMPLOYEE}/${id}`;
        return this.httpClient.get<Employee>(url)
            .pipe(
                catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                                   console.log(err, 'Отсутсвуют данные в БД');
                                   return of(null); })
            );
    }

    saveEmployee(employee): Observable<Employee> {
        return this.httpClient.post<Employee>(UrlConstants.URL_EMPLOYEE, employee).pipe(
            tap(() => this.toastr.success(`Сотрудник добавлен!`)),
            catchError(err => {this.toastr.error(`Не удалось добавить сотрудника`, 'Ошибка');
                               console.log(err, 'Не удалось добавить сотрудника');
                               return of(null); })
        );
    }

    updateEmployee(id: number, employee): Observable<any> {
        const url = `${UrlConstants.URL_EMPLOYEE}/${id}`;
        employee.id = id;
        return this.httpClient.put(url, employee, httpOptions).pipe(
            tap(() => this.toastr.success(`Запись обновлена!`)),
            catchError(err => {this.toastr.error(`Не удалось обновить запись`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    deleteEmployee(id: number): Observable<any> {
        const url = `${UrlConstants.URL_EMPLOYEE}/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => this.toastr.success(`Сотрудник удален!`)),
            catchError(err => {this.toastr.error(`Не удалось удалить сотрудника`, 'Ошибка');
                               console.log(err, 'Не удалось удалить сотрудника');
                               return of(null); })
        );
    }

    getTypesOfPOsition() {
        return this.httpClient.get<TypeOfPosition []>(UrlConstants.URL_TYPE_OF_POSITION).pipe(
            catchError(err => {this.toastr.error(`Отсутствует связь с БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }
}
