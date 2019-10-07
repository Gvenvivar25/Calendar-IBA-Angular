import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {

    constructor(private http: HttpClient) {}

    downloadFile(): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'text/csv; charset=utf-8');

        return this.http.get('http://localhost:8080/api/report/disciplines/XLSX/report', {
            headers,
            responseType: 'blob' as 'json'
        });
    }

}
