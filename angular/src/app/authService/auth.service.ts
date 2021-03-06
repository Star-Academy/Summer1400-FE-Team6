import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

interface AuthenticatedUser {
  id: number;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  currentUser?: AuthenticatedUser;
  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('user'))
      this.currentUser = JSON.parse(localStorage.getItem('user')!);
  }
  public readonly BASE_URL = 'https://songs.code-star.ir/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public login(username: string, password: string, rememberMe: boolean) {
    this.http
      .post<AuthenticatedUser>(
        this.BASE_URL + 'user/login',
        { username, password },
        this.httpOptions
      )
      .subscribe((user) => {
        this.currentUser = user;
        if (rememberMe)
          localStorage.setItem('user', JSON.stringify(this.currentUser));
        this.router.navigateByUrl('/dashboard');
      });
  }

  signUp(user: User) {
    this.http
      .post<{ token: string; id: number }>(
        this.BASE_URL + 'user/register',
        user,
        this.httpOptions
      )
      .subscribe((user) => {
        this.currentUser = user;
        this.router.navigateByUrl('/dashboard');
      });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.currentUser) this.router.navigateByUrl('/login');
    return !!this.currentUser;
  }

  logOut() {
    this.currentUser = undefined;
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }
}
