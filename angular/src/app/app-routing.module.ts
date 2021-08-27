import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllSongsComponent } from './dashboard/allsongs/all-songs.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FavoriteComponent } from './dashboard/favorite/favorite.component';
import { PlayerComponent } from './player/player.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './authService/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'player/:id',
    component: PlayerComponent,
    canActivate: [AuthService],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthService],
    children: [
      { path: '', redirectTo: 'allsongs', pathMatch: 'full' },
      {
        path: 'allsongs',
        component: AllSongsComponent,
      },
      {
        path: 'favorite',
        component: FavoriteComponent,
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
