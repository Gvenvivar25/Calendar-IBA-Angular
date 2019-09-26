import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlConstants} from '../url-constants';
import {Router} from '@angular/router';
import {AuthenticationRequest} from '../models/auth.model';


@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    token;
    auth = UrlConstants.URL_AUTH + '/login';
    constructor(private http: HttpClient, private router: Router) {}

    login(AuthenticationRequestDto: AuthenticationRequest) {
        console.log(AuthenticationRequestDto);
        this.http.post(this.auth, AuthenticationRequestDto)
            .subscribe((resp: any) => {

                this.router.navigate(['/main']);
                localStorage.setItem('auth_token', resp.token);

            });
    }

    logout() {
        localStorage.removeItem('token');
    }

    public get logIn(): boolean {
        return (localStorage.getItem('token') !== null);
    }

    /*login(username: string, password: string) {
        return this.http.post<any>(`/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }*/
}
