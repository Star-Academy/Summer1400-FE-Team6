import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

let loggedIn = "<li><a href=\"dashboard\">پلی لسیت‌ها</a></li><li><a id='logout' (click)='logout'>خروج از حساب کاربری</a></li>";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {

    if(localStorage.getItem("isLogin") === "true"){
      let navBar = document.getElementById("nav-top");
      // @ts-ignore
      navBar.innerHTML = loggedIn;
    }
  }


  public logout(){
    localStorage.clear();
    localStorage.setItem("isLogin", "false");
    this.router.navigateByUrl('');
  }

}
