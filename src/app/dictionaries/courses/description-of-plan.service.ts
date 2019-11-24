import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { DescriptionOfPlan, LessonPlan, TypeOfWork} from './course.model';
import {UrlConstants} from '../../shared/url-constants';
import {ToastrService} from 'ngx-toastr';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})

export class DescriptionOfPlanService {
    constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

    getDescriptionOfPlan(id: number): Observable<DescriptionOfPlan> {
        const url = `${UrlConstants.URL_DESCRIPTION_OF_PLAN}/${id}`;
        return this.httpClient.get<DescriptionOfPlan>(url).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    getDescriptionOfPlans(): Observable<DescriptionOfPlan []> {
        return this.httpClient.get<DescriptionOfPlan []>(UrlConstants.URL_DESCRIPTION_OF_PLAN).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }

    deleteDescriptionOfPlan(id: number) {
        const url = `${UrlConstants.URL_DESCRIPTION_OF_PLAN}/${id}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => this.toastr.success(`Учебный план удален!`)),
            catchError(err => {this.toastr.error(`Не удалось удалить учебный план`, 'Ошибка');
                               console.log(err, 'Не удалось удалить учебный план');
                               return of(null); })
        );
    }

    saveDescriptionOfPlan(descriptionOfPlan): Observable<DescriptionOfPlan> {
        return this.httpClient.post<DescriptionOfPlan>(UrlConstants.URL_DESCRIPTION_OF_PLAN, descriptionOfPlan).pipe(
            tap(() => this.toastr.success(`Учебный план добавлен!`)),
            catchError(err => {this.toastr.error(`Не удалось добавить учебный план`, 'Ошибка');
                               console.log(err, 'Не удалось добавить учебный план');
                               return of(null); })
        );
    }

    updateDescriptionOfPlan(id: number, descrOfPlan): Observable<any> {
        const url = `${UrlConstants.URL_DESCRIPTION_OF_PLAN}/${id}`;
        descrOfPlan.id = id;
        return this.httpClient.put(url, descrOfPlan, httpOptions).pipe(
            tap(() => this.toastr.success(`Данные обновлены!`)),
            catchError(err => {this.toastr.error(`Не удалось обновить запись`, 'Ошибка');
                               console.log(err, 'Не удалось обновить запись');
                               return of(null); })
        );
    }

    getTypesOfWork(): Observable<TypeOfWork []> {
        return this.httpClient.get<TypeOfWork []>(UrlConstants.URL_TYPE_OF_WORK).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    getAllLessonPlansOfDescrOfPlan(id: number): Observable<LessonPlan[]> {
        const url = `${UrlConstants.URL_DESCRIPTION_OF_PLAN}/${id}/lesson_plans`;
        return this.httpClient.get<LessonPlan []>(url).pipe(
            catchError(err => {this.toastr.error(`Отсутсвуют данные в БД`, 'Ошибка');
                               console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }

    addlLessonPlansOfDescrOfPlan(idDescrOfPlan: number, lessonPlan: LessonPlan) {
        const url = `${UrlConstants.URL_DESCRIPTION_OF_PLAN}/${idDescrOfPlan}/lesson_plans`;
        return this.httpClient.post(url,  lessonPlan, httpOptions).pipe(
            tap(() => this.toastr.success(`Запись добавлена!`)),
            catchError(err => {this.toastr.error(`Не удалось добавить запись учебного плана`, 'Ошибка');
                               console.log(err, 'Не удалось добавить запись учебного плана');
                               return of(null); })
        );
    }

    deleteLessonPlanOfDescrOfPlan(idDescrOfPlan: number, idLessonPlan: number) {
        const url = `${UrlConstants.URL_DESCRIPTION_OF_PLAN}/${idDescrOfPlan}/lesson_plans/${idLessonPlan}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => this.toastr.success(`Запись удалена!`)),
            catchError(err => {this.toastr.error(`Не удалось удалить запись учебного плана`, 'Ошибка');
                               console.log(err, 'Не удалось удалить запись учебного плана');
                               return of(null); })
        );
    }
}
