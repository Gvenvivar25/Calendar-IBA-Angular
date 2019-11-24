import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlConstants} from '../url-constants';
import {AuthenticationModel} from '../models/auth.model';
import {BehaviorSubject, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';


@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    auth = UrlConstants.URL_AUTH + '/login';

    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private toastr: ToastrService) {}

    get isLoggedIn() {
        console.log(this.loggedIn);
        return this.loggedIn.asObservable();
    }

   get userRole() {
       return localStorage.getItem('role');
   }

   public setLoggedIn(value) {
        this.loggedIn.next(value);
    }

    public get currentToken(): boolean {
        return localStorage.getItem('token') !==  null;
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }

    public login(authenticationRequestDto: AuthenticationModel) {
       return this.http.post<any>(this.auth, authenticationRequestDto)
           .pipe(map((res: any) => {
                localStorage.setItem('role', res.roles[0]);
                localStorage.setItem('token', res.token);
                this.loggedIn.next(true);
                return res;
            }),
               catchError(err => { if (err.status === 403) {
                   this.toastr.error(`Доступ запрещен`, 'Ошибка');
                   console.log(err, 'Доступ запрещен');
                   return of(null);
               } else {this.toastr.error(`Неверный логин или пароль`, 'Ошибка');
                       console.log(err, 'Неверный логин или пароль');
                       return of(null); }
               }));
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.loggedIn.next(false);
    }

}


