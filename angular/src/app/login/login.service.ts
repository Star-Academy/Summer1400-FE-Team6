import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

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
    const responseJson = await LoginService.sendRequest(this.BASE_URL + 'user/login', {email, password});
    localStorage.setItem("id", responseJson.id)
    localStorage.setItem("token", responseJson.token);
    localStorage.setItem("isLogin", "true");
    return responseJson;
  }

}
