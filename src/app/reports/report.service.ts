import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {UrlConstants} from '../shared/url-constants';



@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(private httpClient: HttpClient) {}


    downloadReport(format: string, name: string): Observable<any>  {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'text/csv; charset=utf-8');
        const url = `${UrlConstants.URL_REPORT}/${name}/${format}/${name}`;
        return this.httpClient.get(url, {
            headers,
            responseType: 'blob' as 'json'
        })
            .pipe(
                catchError(err => {console.log(err, 'Отсутсвуют данные в БД');
                                   return of(null); })
            );
    }

    downloadReportForPeriod(format: string, name: string, start: string, end: string): Observable<any>  {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'text/csv; charset=utf-8');
        const url = `${UrlConstants.URL_REPORT}/${name}/${format}/${name}?d1=${start}&d2=${end}`;
        return this.httpClient.get(url, {
            headers,
            responseType: 'blob' as 'json'
        })
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
