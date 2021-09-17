import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authService/auth.service';

let loggedIn =
  "<li><a href=\"dashboard\">پلی لسیت‌ها</a></li><li><a id='logout' (click)='logout'>خروج از حساب کاربری</a></li>";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  get isLoggedIn() {
    return !!this.authService.currentUser;
  }

  public logout() {
    this.authService.logOut();
  }
}
