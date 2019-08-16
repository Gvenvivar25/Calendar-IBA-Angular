

import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const url = 'http://localhost:8080/api/types_of_classroom';

@Injectable({
    providedIn: 'root'
})

export class ClassroomService {

}