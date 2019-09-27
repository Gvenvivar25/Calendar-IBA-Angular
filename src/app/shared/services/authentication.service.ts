import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlConstants} from '../url-constants';
import {Router} from '@angular/router';
import {AuthenticationRequest} from '../models/auth.model';





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
        this.http.post(this.auth, AuthenticationRequestDto)
            .subscribe((res: any) => {
                localStorage.setItem('token', res.token);
                this.router.navigate([this.redirectToUrl]);
            });
    }

    private saveToken(token: string) {
        localStorage.setItem(AuthenticationService.TOKEN_STORAGE_KEY, token);
    }

    /*public logout(): void {
        this.tokenService.logout()
            .subscribe(() => {
                localStorage.removeItem(AuthenticationService.TOKEN_STORAGE_KEY);
            });
    }*/

    public getToken(): string {
        return localStorage.getItem(AuthenticationService.TOKEN_STORAGE_KEY);
    }
}
