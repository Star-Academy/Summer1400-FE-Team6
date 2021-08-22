import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public readonly BASE_URL = 'https://songs.code-star.ir/';


  private static async sendRequest(url: string, body?: object): Promise<any> {
    const init: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      init.method = 'POST';
      init.body = JSON.stringify(body);
    }

    return fetch(url, init).then((res) => {
      if (res.ok) return res.json();
      throw res.json();
    });
  }


  public async login(email: string, password: string): Promise<string> {
    const responseJson = await AuthService.sendRequest(this.BASE_URL + 'user/login', {email, password});
    localStorage.setItem("id", responseJson.id)
    localStorage.setItem("token", responseJson.token);
    localStorage.setItem("isLogin", "true");
    return responseJson;
  }

  public async sginup(username: string, email: string, password: string, firstname: string, lastname: string): Promise<string> {

    const responseJson = await AuthService.sendRequest(this.BASE_URL + 'user/register', {
      username,
      email,
      password,
      firstname,
      lastname
    });
    localStorage.setItem("id", responseJson.id)
    localStorage.setItem("token", responseJson.token);
    localStorage.setItem("isLogin", "true");
    return responseJson;
  }
}
