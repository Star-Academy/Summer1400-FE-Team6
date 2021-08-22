import { Component, OnInit, ElementRef , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../authService/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('username') emailInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;

  constructor(private  authService:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public async loginClick(){
    const email = this.emailInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;

    try {
      const token = await this.authService.login(email, password);
      await this.router.navigateByUrl('/dashboard');
    } catch {
      console.log('ERROR');
    }
  }
}
