import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Song } from '../dashboard/song';
import { switchMap } from 'rxjs/operators';
import { SongService } from '../dashboard/song.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  song!: Song;
  duration!: string;
  currentTime!: string;
  progressPercent!: number;
  isPlaying = true;
  showLyrics = false;

  @ViewChild('audio') audio!: ElementRef;
  constructor(
    public location: Location,
    private route: ActivatedRoute,
    public songService: SongService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => this.songService.getSongById(+params.get('id')!))
      )
      .subscribe((res) => {
        this.song = res;
        console.log(this.song.lyrics.split('\n'));
      });
  }

  updateProgress(event: any) {
    const { duration, currentTime } = event.target;
    this.progressPercent = (currentTime / duration) * 100;
    this.currentTime = this.timeFixer(currentTime.toFixed(0));
    this.duration = this.timeFixer(duration.toFixed(0));
  }

  setTime(change: any) {
    console.log(change);
    this.audio.nativeElement.currentTime =
      (this.audio.nativeElement.duration * change.value) / 100;
  }

  timeFixer(time: number) {
    let min = time / 60;
    let sec = time % 60;
    return this.secFixer(+min.toFixed(0)) + ':' + this.secFixer(sec);
  }

  secFixer(n: number) {
    return n > 9 ? '' + n : '0' + n;
  }

  togglePlay() {
    if (this.isPlaying) this.audio.nativeElement.pause();
    else this.audio.nativeElement.play();
    this.isPlaying = !this.isPlaying;
  }

  toggleLyrics() {
    this.showLyrics = !this.showLyrics;
  }
}
