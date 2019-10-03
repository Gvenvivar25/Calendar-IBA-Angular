import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UrlConstants} from '../url-constants';
import {Router} from '@angular/router';
import {AuthenticationRequest} from '../models/auth.model';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({ providedIn: 'root' })

export class AuthenticationService {
  //  static readonly TOKEN_STORAGE_KEY = 'token';
    auth = UrlConstants.URL_AUTH + '/login';
   /* private currentTokenSubject: BehaviorSubject<Token>;
    public currentToken: Observable<Token>;*/
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private router: Router) {
           /* this.currentTokenSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('token')));
            this.currentToken = this.currentTokenSubject.asObservable();*/
        }

    get isLoggedIn() {
        console.log(this.loggedIn);
        return this.loggedIn.asObservable();
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
    /*public get currentTokenValue(): Token {
        return this.currentTokenSubject.value;
    }*/

    public login(AuthenticationRequestDto: AuthenticationRequest) {
       return this.http.post<any>(this.auth, AuthenticationRequestDto)
           .pipe(map((res: any) => {
                localStorage.setItem('token', res.token);
             //   this.currentTokenSubject.next(res);
                this.loggedIn.next(true);
                return res;

            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
     //   this.currentTokenSubject.next(null);
        this.loggedIn.next(false);
    }

    /*public isLoggedIn(): boolean {
        console.log(this.currentTokenSubject.value);
        if (this.currentTokenSubject.value == null) { return false; } else { return true; }
      //  return !!this.currentTokenSubject.value;
    }*/

    /*public login(AuthenticationRequestDto: AuthenticationRequest): void {
       this.http.post(this.auth, AuthenticationRequestDto, httpOptions)
            .subscribe((res: any) => {
                localStorage.setItem('token', res.token);
                this.router.navigate([this.redirectToUrl]);
            });
    }*/

   /* private saveToken(token: string) {
        localStorage.setItem(AuthenticationService.TOKEN_STORAGE_KEY, token);
    }*/

    /*public logout(): void {
        this.tokenService.logout()
            .subscribe(() => {
                localStorage.removeItem(AuthenticationService.TOKEN_STORAGE_KEY);
            });
    }*/


}

export class Token {
    public username: string;
    public token: string;
}
