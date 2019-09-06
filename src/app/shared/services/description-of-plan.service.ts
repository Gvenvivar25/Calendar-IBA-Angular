import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { DescriptionOfPlan, LessonPlan, TypeOfWork} from '../../dictionaries/courses/course.model';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const url = 'http://localhost:8080/api/description_of_plans';

@Injectable({
    providedIn: 'root'
})

export class DescriptionOfPlanService {
    constructor(private httpClient: HttpClient) {}

    getDescriptionOfPlan(id: number): Observable<DescriptionOfPlan> {
        const urlD = `${url}/${id}`;
        return this.httpClient.get<DescriptionOfPlan>(urlD).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    getDescriptionOfPlans(): Observable<DescriptionOfPlan []> {
        return this.httpClient.get<DescriptionOfPlan []>(url).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }

    deleteDescriptionOfPlan(id: number) {
        const urlD = `${url}/${id}`;
        return this.httpClient.delete(urlD, httpOptions).pipe(
            tap(() => console.log(`deleted descOfPlan id=${id}`)),
            catchError(err => {console.log(err, 'Не удалось удалить учебный план');
                               return of(null); })
        );
    }

    saveDescriptionOfPlan(descriptionOfPlan): Observable<DescriptionOfPlan> {
        return this.httpClient.post<DescriptionOfPlan>(url, descriptionOfPlan).pipe(
            tap((res: DescriptionOfPlan) => console.log(`added course id=${res.id}`)),
            catchError(err => {console.log(err, 'Не удалось добавить учебный план');
                               return of(null); })
        );
    }

    updateDescriptionOfPlan(id: number, descrOfPlan): Observable<any> {
        const urlD = `${url}/${id}`;
        descrOfPlan.id = id;
        return this.httpClient.put(urlD, descrOfPlan, httpOptions).pipe(
            tap(() => {
                return console.log(`updated descrOfPlan id=${id}`);
            }),
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    getTypesOfWork(): Observable<TypeOfWork []> {
        const urlT = 'http://localhost:8080/api/types_of_work';
        return this.httpClient.get<TypeOfWork []>(urlT).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );
    }

    getAllLessonPlansOfDescrOfPlan(id: number): Observable<LessonPlan[]> {
        const urlL = `${url}/${id}/lesson_plans`;
        return this.httpClient.get<LessonPlan []>(urlL).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }

    addlLessonPlansOfDescrOfPlan(idDescrOfPlan: number, lessonPlan: LessonPlan) {
        const urlL = `${url}/${idDescrOfPlan}/lesson_plans`;
        return this.httpClient.post(urlL, [idDescrOfPlan, lessonPlan], httpOptions).pipe(
            tap(() => console.log(`added lessonPlan to DescrOfPlan id=${idDescrOfPlan}`)),
            catchError(err => {console.log(err, 'Не удалось добавить запись учебного плана');
                               return of(null); })
        );
    }

    deleteLessonPlanOfDescrOfPlan(idDescrOfPlan: number, idLessonPlan: number) {
        const urlL = `${url}/${idDescrOfPlan}/lesson_plans/${idLessonPlan}`;
        return this.httpClient.delete(url, httpOptions).pipe(
            tap(() => console.log(`deleted lessonPlan id=${idLessonPlan} of DescrOfPlan id=${idDescrOfPlan}`)),
            catchError(err => {console.log(err, 'Не удалось удалить запись учебного плана');
                               return of(null); })
        );
    }
}
