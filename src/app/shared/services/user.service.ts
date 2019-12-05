import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {catchError, tap} from 'rxjs/operators';
import {UrlConstants} from '../url-constants';
import {RoleDto, RoleName, Status, User} from '../models/user.model';
import {ToastrService} from 'ngx-toastr';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private httpClient: HttpClient, private toastr: ToastrService) {
    }

    getUser(id: number): Observable<User> {
        const url = `${UrlConstants.URL_USER}/${id}`;
        return this.httpClient.get<User>(url).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null);
            })
        );
    }

    getUsers(): Observable<User []> {
        return this.httpClient.get<User[]>(UrlConstants.URL_USER).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null);
            })
        );

    }

    saveUser(user): Observable<User> {
        return this.httpClient.post<User>(UrlConstants.URL_USER, user).pipe(
            tap(() => this.toastr.success(`Пользователь добавлен!`)),
            catchError(err => {this.toastr.error('Не удалось добавить пользователя', 'Ошибка');
                               console.log(err, 'Не удалось добавить пользователя');
                               return of(null);
            })
        );
    }

    updateUser(id: number, user): Observable<any> {
        const url = `${UrlConstants.URL_USER}/${id}`;
        user.id = id;
        return this.httpClient.put(url, user, httpOptions).pipe(
            tap(() => this.toastr.success(`Запись обновлена!`)),
            catchError(err => {this.toastr.error(`Не удалось обновить пользователя`, 'Ошибка');
                               console.log(err, 'Не удалось обновить пользователя');
                               return of(null);
            })
        );
    }

    deleteUser(id: number) {
        const url = `${UrlConstants.URL_USER}/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => this.toastr.success(`Пользователь удален!`)),
            catchError(err => {this.toastr.error(`Не удалось удалить пользователя`, 'Ошибка');
                               console.log(err, 'Не удалось удалить пользователя');
                               return of(null);
            })
        );
    }

    getAllRoles(): Observable<RoleName []> {
        return this.httpClient.get<RoleName[]>(UrlConstants.URL_ROLE).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null);
            })
        );
    }

    getAllRolesOfUser(id: number): Observable<RoleDto []> {
        const url = `${UrlConstants.URL_USER}/${id}/roles`;
        return this.httpClient.get<RoleDto[]>(url).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null);
            })
        );
    }

    deleteUserRole(id: number, role: string) {
        const url = `${UrlConstants.URL_USER}/${id}/roles?rolename=${role}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => this.toastr.success(`Запись удалена!`)),
            catchError(err => {this.toastr.error(`Не удалось удалить роль`, 'Ошибка');
                               console.log(err, 'Не удалось удалить роль');
                               return of(null);
            })
        );
    }

    addRoleToUser(userId: number, role: string): Observable<RoleDto> {
        const url = `${UrlConstants.URL_USER}/${userId}/roles?rolename=${role}`;
        return this.httpClient.put(url, httpOptions).pipe(
            tap(() => this.toastr.success(`Роль добавлена!`)),
            catchError(err => {this.toastr.error(`Не удалось добавить роль`, 'Ошибка');
                               console.log(err, 'Не удалось добавить роль');
                               return of(null);
            })
        );
    }

    getAllStatuses(): Observable<Status []> {
        return this.httpClient.get<Status[]>(UrlConstants.URL_STATUS).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null);
            })
        );
    }
}

