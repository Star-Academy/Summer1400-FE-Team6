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
  @Input() isLiked!: boolean;
  constructor(private songService: SongService) {}

  ngOnInit(): void {}

  toggleLike(event: any) {
    if (this.isLiked) this.songService.removeFromFavorite(this.song);
    else this.songService.addToFavorite(this.song);
    event.stopPropogation();
  }
}
