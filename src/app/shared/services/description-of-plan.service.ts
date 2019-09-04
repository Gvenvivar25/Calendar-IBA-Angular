import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {DescriptionOfPlan} from '../../dictionaries/courses/course.model';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const url = 'http://localhost:8080/api/description_of_plans';

@Injectable({
    providedIn: 'root'
})

export class DescriptionOfPlanService {
    constructor(private httpClient: HttpClient) {}

    getDescriptionOfPlans(): Observable<DescriptionOfPlan []> {
        return this.httpClient.get<DescriptionOfPlan []>(url).pipe(
            catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                               return of(null); })
        );

    }
}
