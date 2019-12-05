import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Classroom, TypeOfClassroom} from '../models/classroom.model';
import {catchError, tap} from 'rxjs/operators';
import {UrlConstants} from '../url-constants';
import {ToastrService} from 'ngx-toastr';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})

export class ClassroomService {

    constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

    getClassroom(id: number): Observable<Classroom> {
        const url = `${UrlConstants.URL_CLASSROOM}/${id}`;
        return this.httpClient.get<Classroom>(url).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
            );
    }

    getClassrooms(): Observable<Classroom []> {
        return this.httpClient.get<Classroom[]>(UrlConstants.URL_CLASSROOM).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }

    saveClassroom(classroom): Observable<Classroom> {
        return this.httpClient.post<Classroom>(UrlConstants.URL_CLASSROOM, classroom).pipe(
            tap((res: Classroom) => this.toastr.success(`Аудитория ${res.number} добавлена!`)),
            catchError(err => {this.toastr.error(`Не удалось добавить аудиторию`, 'Ошибка');
                               console.log(err, 'Не удалось добавить аудиторию');
                               return of(null); })
        );
    }

    updateClassroom(id: number, classroom): Observable<any> {
        const url = `${UrlConstants.URL_CLASSROOM}/${id}`;
        classroom.id = id;
        return this.httpClient.put(url, classroom, httpOptions).pipe(
            tap(() => this.toastr.success(`Данные сохранены!`)),
            catchError(err => {this.toastr.error(`Не удалось сохранить изменения`, 'Ошибка');
                               console.log(err, 'Не удалось обновить аудиторию');
                               return of(null); })
        );
    }

    deleteClassroom(id: number) {
        const url = `${UrlConstants.URL_CLASSROOM}/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => this.toastr.success(`Аудитория удалена!`)),
            catchError(err => {this.toastr.error(`Не удалось удалить аудиторию`, 'Ошибка');
                               console.log(err, 'Не удалось удалить аудиторию');
                               return of(null); })
        );
    }

    getTypesOfClassroom() {
        return this.httpClient.get<TypeOfClassroom []>(UrlConstants.URL_TYPE_OF_CLASSROOM);
    }

}
