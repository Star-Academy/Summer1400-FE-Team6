import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import { AllSongsComponent } from './dashboard/allsongs/all-songs.component';
import {LandingComponent} from "./landing/landing.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import { FavoriteComponent } from './dashboard/favorite/favorite.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'landing', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'player/:id', component: PlayerComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
