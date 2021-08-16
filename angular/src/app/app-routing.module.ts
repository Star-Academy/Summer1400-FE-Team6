import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongsComponent } from './songs/songs.component';
import { AllsongsComponent } from './songs/allsongs/allsongs.component';

const routes: Routes = [
  { path: '', redirectTo: '/songs', pathMatch: 'full' },
  {
    path: 'songs',
    component: SongsComponent,
    children: [
      { path: '', redirectTo: 'allsongs', pathMatch: 'full' },
      {
        path: 'allsongs',
        component: AllsongsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
