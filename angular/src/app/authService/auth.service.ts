import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  public async login(email: string, password: string) {
    // const responseJson = await AuthService.sendRequest(
    //   this.BASE_URL + 'user/login',
    //   { email, password }
    // );
    // localStorage.setItem('id', responseJson.id);
    // localStorage.setItem('token', responseJson.token);
    // localStorage.setItem('isLogin', 'true');
    // return responseJson;
  }

  async signUp(user: User) {
    let response = await this.http
      .post<{ token: string; id: number }>(
        this.BASE_URL + 'user/register',
        user,
        this.httpOptions
      )
      .toPromise();
    //Do whatever with response token and id
  }
}
