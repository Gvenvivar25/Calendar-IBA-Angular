import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UrlConstants} from '../url-constants';
import {Router} from '@angular/router';
import {AuthenticationRequest} from '../models/auth.model';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    static readonly TOKEN_STORAGE_KEY = 'token';
    auth = UrlConstants.URL_AUTH + '/login';
    redirectToUrl = '/main';

    constructor(private http: HttpClient, private router: Router) { }

    public isLoggedIn(): boolean {
        return !!this.getToken();
    }

    public login(AuthenticationRequestDto: AuthenticationRequest): void {
        this.http.post(this.auth, AuthenticationRequestDto, httpOptions)
            .subscribe((res: any) => {
                sessionStorage.setItem('token', res.token);
                this.router.navigate([this.redirectToUrl]);
            });
    }

    private saveToken(token: string) {
        sessionStorage.setItem(AuthenticationService.TOKEN_STORAGE_KEY, token);
    }

    /*public logout(): void {
        this.tokenService.logout()
            .subscribe(() => {
                localStorage.removeItem(AuthenticationService.TOKEN_STORAGE_KEY);
            });
    }*/

    public getToken(): string {
        return sessionStorage.getItem(AuthenticationService.TOKEN_STORAGE_KEY);
    }
}
