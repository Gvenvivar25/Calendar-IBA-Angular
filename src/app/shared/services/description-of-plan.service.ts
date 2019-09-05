import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Course, DescriptionOfPlan} from '../../dictionaries/courses/course.model';

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
}
