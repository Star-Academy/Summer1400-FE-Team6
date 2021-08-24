import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Login} from "../login";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  public readonly BASE_URL = 'https://songs.code-star.ir/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  public async login(login:Login) {
    // const responseJson = await AuthService.sendRequest(
    //   this.BASE_URL + 'user/login',
    //   { email, password }
    // );
    // localStorage.setItem('id', responseJson.id);
    // localStorage.setItem('token', responseJson.token);
    // localStorage.setItem('isLogin', 'true');
    // return responseJson;
    let response = await this.http
      .post<{ token: string; id: number }>(
        this.BASE_URL + 'user/login',
        login,
        this.httpOptions
      )
      .toPromise();
    localStorage.setItem('token', response.token);
    localStorage.setItem('isLogin', 'true');
    return response;

  }

  async signUp(user: User) {
    let response = await this.http
      .post<{ token: string; id: number }>(
        this.BASE_URL + 'user/register',
        user,
        this.httpOptions
      )
      .toPromise();
    localStorage.setItem('token', response.token);
    localStorage.setItem('isLogin', 'true');
    return response;
    //Do whatever with response token and id
  }
}
