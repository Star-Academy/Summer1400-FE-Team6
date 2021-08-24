import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent implements OnInit {
  @Input() song!: Song;

  constructor(private songService: SongService) {}

  ngOnInit(): void {}

  get isLiked() {
    return this.songService.checkIsLiked(this.song);
  }

  toggleLike() {
    if (this.isLiked) this.songService.removeFromFavorite(this.song);
    else this.songService.addToFavorite(this.song);
  }
}
