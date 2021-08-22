import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../authService/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('username') usernameInput!: ElementRef;
  @ViewChild('email') emailInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;
  @ViewChild('fName') firstnameInput!: ElementRef;
  @ViewChild('lName') lastnameInput!: ElementRef;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  public async signupClick() {
    let username = this.emailInput.nativeElement.value;
    let email = this.emailInput.nativeElement.value;
    let password = this.passwordInput.nativeElement.value;
    let firstname = this.passwordInput.nativeElement.value;
    let lastname = this.passwordInput.nativeElement.value;

    try {
      const token = await this.authService.sginup(username, email, password, firstname, lastname);
      await this.router.navigateByUrl('/dashboard');
    } catch {
      console.log('ERROR');
    }
  }

}
