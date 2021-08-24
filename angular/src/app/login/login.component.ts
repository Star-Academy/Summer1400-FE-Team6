import { Component, OnInit, ElementRef , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../authService/auth.service";
import {Login} from "../login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: Login ={
    username:'',
    password:''
  }

  constructor(private  authService:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  // public async loginClick(){
  //
  //   try {
  //     const token = await this.authService.login(this.login);
  //     await this.router.navigateByUrl('/dashboard');
  //   } catch {
  //     console.log('ERROR');
  //   }
  // }

  public signupClick() {
    this.authService.login(this.login);
    this.router.navigateByUrl('/dashboard');

  }

}
