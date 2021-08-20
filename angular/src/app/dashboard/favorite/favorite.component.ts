import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../song.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  favoriteSongs!: Song[];
  constructor(
    private songService: SongService
  ) { }

  ngOnInit(): void {
    this.favoriteSongs = [...this.songService.likedSongs];
  }

}
