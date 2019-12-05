import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Teacher, Type} from '../models/teacher.model';
import {Discipline} from '../models/discipline.model';
import {UrlConstants} from '../url-constants';
import {ToastrService} from 'ngx-toastr';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class TeachersService {
    constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

    getTeachers(): Observable<Teacher[]> {
        return this.httpClient.get<Teacher[]>(UrlConstants.URL_TEACHER)
            .pipe(
                catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                                   console.log(err, 'Отсутсвуют данные в БД');
                                   return of(null); })
            );
    }

    getTeacher(id: number): Observable<Teacher> {
        const url = `${UrlConstants.URL_TEACHER}/${id}`;
        return this.httpClient.get<Teacher>(url)
            .pipe(
                catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                                   console.log(err, 'Отсутсвуют данные в БД');
                                   return of(null); })
            );
    }

    saveTeacher(teacher): Observable<Teacher> {
        return this.httpClient.post<Teacher>(UrlConstants.URL_TEACHER, teacher).pipe(
            tap(() => this.toastr.success(`Преподаватель добавлен!`)),
            catchError(err => {this.toastr.error(`Не удалось добавить преподавателя`, 'Ошибка');
                               console.log(err, 'Не удалось добавить преподавателя');
                               return of(null); })
        );
    }

    updateTeacher(id: number, teacher): Observable<any> {
        const url = `${UrlConstants.URL_TEACHER}/${id}`;
        teacher.id = id;
        return this.httpClient.put(url, teacher, httpOptions).pipe(
            tap(() => this.toastr.success(`Запись обновлена!`)),
            catchError(err => {this.toastr.error(`Не удалось обновить запись`, 'Ошибка');
                               console.log(err, 'Не удалось обновить запись');
                               return of(null); })
        );
    }

    deleteTeacher(id: number): Observable<any> {
        const url = `${UrlConstants.URL_TEACHER}/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => this.toastr.success(`Преподаватель удален!`)),
            catchError(err => {this.toastr.error(`Не удалось удалить преподавателя`, 'Ошибка');
                               console.log(err, 'Не удалось удалить преподавателя');
                               return of(null); })
        );
    }

    getTypesOfEmployment() {
        return this.httpClient.get<Type []>(UrlConstants.URL_TYPE_OF_EMPLOYMENT).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    addDisciplineToTeacher(idTeacher: number, idDiscipline: number) {
        const url = `${UrlConstants.URL_TEACHER}/${idTeacher}/disciplines/${idDiscipline}`;
        return this.httpClient.put(url, [idTeacher, idDiscipline], httpOptions).pipe(
            tap(() => this.toastr.success(`Запись добавлена!`)),
            catchError(err => {this.toastr.error(`Не удалось добавить предмет`, 'Ошибка');
                               console.log(err, 'Не удалось добавить предмет');
                               return of(null); })
        );
    }

    getAllDisciplinesOfTeacher(id: number): Observable<Discipline[]> {
        const url = `${UrlConstants.URL_TEACHER}/${id}/disciplines`;
        return this.httpClient.get<Discipline []>(url).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }

    deleteDisciplineOfTeacher(idTeacher: number, idDiscipline: number) {
        const url = `${UrlConstants.URL_TEACHER}/${idTeacher}/disciplines/${idDiscipline}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => this.toastr.success(`Запись удалена!`)),
            catchError(err => {this.toastr.error(`Не удалось удалить предмет преподавателя`, 'Ошибка');
                               console.log(err, 'Не удалось удалить предмет преподавателя');
                               return of(null); })
        );
    }
}
