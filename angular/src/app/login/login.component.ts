import { Component, OnInit, ElementRef , ViewChild } from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('username') emailInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;

  constructor(private  loginServer:LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  public async loginClick(){
    const email = this.emailInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;

    try {
      const token = await this.loginServer.login(email, password);
      await this.router.navigateByUrl('/dashboard');
    } catch {
      console.log('ERROR');
    }
  }
}
