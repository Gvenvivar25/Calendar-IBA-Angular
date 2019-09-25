import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {UrlConstants} from '../shared/url-constants';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', Accept: 'application/XLSX'})
};

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    constructor(private httpClient: HttpClient) {}

    getTeachersReport(format: string, name: string) {
        const url = `${UrlConstants.URL_TEACHER_REPORT}${format}/${name}`;
        return this.httpClient.get(url, httpOptions)
            .pipe(
                catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                                   return of(null); })
            );
    }

    getDisciplinesReport(format: string, name: string) {
        const url = `${UrlConstants.URL_DISCIPLINE_REPORT}${format}/${name}`;
        return this.httpClient.get(url)
            .pipe(
                catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                                   return of(null); })
            );
    }
}
