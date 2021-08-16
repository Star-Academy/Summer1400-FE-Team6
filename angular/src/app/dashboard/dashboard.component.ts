import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-songs',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isMenuOpen = false;
  constructor() {}
  ngOnInit(): void {}
}
