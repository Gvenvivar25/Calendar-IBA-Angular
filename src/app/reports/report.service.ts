import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {UrlConstants} from '../shared/url-constants';
import {ToastrService} from 'ngx-toastr';



@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(private httpClient: HttpClient, private toastr: ToastrService) {}


    downloadReport(format: string, name: string): Observable<any>  {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'text/csv; charset=utf-8');
        const url = `${UrlConstants.URL_REPORT}/${name}/${format}/${name}`;
        return this.httpClient.get(url, {
            headers,
            responseType: 'blob' as 'json'
        })
            .pipe(
                catchError(err => {this.toastr.error(`Не удалось загрузить отчет`, 'Ошибка');
                                   console.log(err, 'Отсутсвуют данные в БД');
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
                catchError(err => { if (err.status === 406) {
                    this.toastr.error(`Заполните настройки периода отчета`, 'Ошибка');
                    console.log(err, 'Заполните настройки периода отчета');
                    return of(null);
                } else {this.toastr.error(`Не удалось загрузить отчет`, 'Ошибка');
                    console.log(err, 'Не удалось загрузить отчет по расписанию');
                    return of(null); }
                })
            );
    }

    getDisciplinesReport(format: string, name: string) {
        const url = `${UrlConstants.URL_DISCIPLINE_REPORT}${format}/${name}`;
        return this.httpClient.get(url)
            .pipe(
                catchError(err => {this.toastr.error(`Не удалось загрузить отчет`, 'Ошибка');
                                   console.log(err, 'Отсутсвуют данные в БД');
                                   return of(null); })
            );
    }

    downloadAllTimetableForPeriod(format: string, name: string, start: string, end: string): Observable<any>  {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'text/csv; charset=utf-8');
        const url = `${UrlConstants.URL_TIMETABLE_REPORT}/${format}/${name}?d1=${start}&d2=${end}`;
        return this.httpClient.get(url, {
            headers,
            responseType: 'blob' as 'json'
        })
            .pipe(
                catchError(err => { if (err.status === 406) {
                    this.toastr.error(`Заполните настройки периода отчета`, 'Ошибка');
                    console.log(err, 'Заполните настройки периода отчета');
                    return of(null);
                } else {this.toastr.error(`Не удалось загрузить отчет`, 'Ошибка');
                        console.log(err, 'Не удалось загрузить отчет по расписанию');
                        return of(null); }
                })
            );
    }

    downloadTimetableForTeacherForPeriod(format: string, name: string, teacherId: number, start: string, end: string): Observable<any>  {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'text/csv; charset=utf-8');
        const url = `${UrlConstants.URL_TIMETABLE_REPORT}/teacher/${teacherId}/${format}/${name}?d1=${start}&d2=${end}`;
        return this.httpClient.get(url, {
            headers,
            responseType: 'blob' as 'json'
        })
            .pipe(
                catchError(err => {this.toastr.error(`Не удалось загрузить отчет`, 'Ошибка');
                                   console.log(err, 'Не удалось загрузить отчет по расписанию');
                                   return of(null); })
            );
    }

    downloadTimetableForGroupForPeriod(format: string, name: string, groupId: number, start: string, end: string): Observable<any>  {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'text/csv; charset=utf-8');
        const url = `${UrlConstants.URL_TIMETABLE_REPORT}/group/${groupId}/${format}/${name}?d1=${start}&d2=${end}`;
        return this.httpClient.get(url, {
            headers,
            responseType: 'blob' as 'json'
        })
            .pipe(
                catchError(err => { if (err.status === 406) {
                    this.toastr.error(`Заполните настройки отчета`, 'Ошибка');
                    console.log(err, 'Заполните настройки отчета');
                    return of(null);
                } else {this.toastr.error(`Не удалось загрузить отчет`, 'Ошибка');
                    console.log(err, 'Не удалось загрузить отчет по расписанию');
                    return of(null); }
                })
            );
    }

    downloadReportForm02015(format: string, name: string, start: string, end: string): Observable<any>  {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'text/csv; charset=utf-8');
        const url = `${UrlConstants.URL_TEACHER_REPORT}/form02015/${format}/${name}?d1=${start}&d2=${end}`;
        return this.httpClient.get(url, {
            headers,
            responseType: 'blob' as 'json'
        })
            .pipe(
                catchError(err => { if (err.status === 406) {
                    this.toastr.error(`Заполните настройки отчета`, 'Ошибка');
                    console.log(err, 'Заполните настройки отчета');
                    return of(null);
                } else {this.toastr.error(`Не удалось загрузить отчет`, 'Ошибка');
                    console.log(err, 'Не удалось загрузить отчет по расписанию');
                    return of(null); }
                })
            );
    }

    downloadReportForm02015ForTeacher(id: number, format: string, name: string, start: string, end: string): Observable<any>  {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'text/csv; charset=utf-8');
        const url = `${UrlConstants.URL_TEACHER_REPORT}/${id}/form02015/${format}/${name}?d1=${start}&d2=${end}`;
        return this.httpClient.get(url, {
            headers,
            responseType: 'blob' as 'json'
        })
            .pipe(
                catchError(err => { if (err.status === 406) {
                    this.toastr.error(`Заполните настройки отчета`, 'Ошибка');
                    console.log(err, 'Заполните настройки отчета');
                    return of(null);
                } else {this.toastr.error(`Не удалось загрузить отчет`, 'Ошибка');
                    console.log(err, 'Не удалось загрузить отчет по расписанию');
                    return of(null); }
                })
            );
    }

    downloadReportForm02015ForGroup(id: number, format: string, name: string, start: string, end: string): Observable<any>  {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'text/csv; charset=utf-8');
        const url = `${UrlConstants.URL_TEACHER_REPORT}/group/${id}/form02015/${format}/${name}?d1=${start}&d2=${end}`;
        return this.httpClient.get(url, {
            headers,
            responseType: 'blob' as 'json'
        })
            .pipe(
                catchError(err => { if (err.status === 406) {
                    this.toastr.error(`Заполните настройки отчета`, 'Ошибка');
                    console.log(err, 'Заполните настройки отчета');
                    return of(null);
                } else {this.toastr.error(`Не удалось загрузить отчет`, 'Ошибка');
                    console.log(err, 'Не удалось загрузить отчет по расписанию');
                    return of(null); }
                })
            );
    }
    downloadReportGroupConsolidated(id: number, format: string, name: string, start: string, end: string): Observable<any>  {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'text/csv; charset=utf-8');
        const url = `${UrlConstants.URL_TEACHER_REPORT}/group/${id}/consolidated/${format}/${name}?d1=${start}&d2=${end}`;
        return this.httpClient.get(url, {
            headers,
            responseType: 'blob' as 'json'
        })
            .pipe(
                catchError(err => { if (err.status === 406) {
                    this.toastr.error(`Заполните настройки отчета`, 'Ошибка');
                    console.log(err, 'Заполните настройки отчета');
                    return of(null);
                } else {this.toastr.error(`Не удалось загрузить отчет`, 'Ошибка');
                    console.log(err, 'Не удалось загрузить отчет по расписанию');
                    return of(null); }
                })
            );
    }
}
