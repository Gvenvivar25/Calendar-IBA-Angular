import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Teacher} from '../dictionaries/teachers/teacher.model';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const urlR = 'http://localhost:8080/api/report';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    constructor(private httpClient: HttpClient) {}

    getTeachersReport(format: string, name: string) {
        const url = `${urlR}/teachers/${format}/${name}`;
        return this.httpClient.get(url)
            .pipe(
                catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                                   return of(null); })
            );
    }

    getDisciplinesReport(format: string, name: string) {
        const url = `${urlR}/disciplines/${format}/${name}`;
        return this.httpClient.get(url)
            .pipe(
                catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                                   return of(null); })
            );
    }
}
