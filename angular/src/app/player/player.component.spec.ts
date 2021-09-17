import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerComponent } from './player.component';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../dashboard/song';
import { of } from 'rxjs';
import { SongService } from '../dashboard/song.service';
import { ElementRef } from '@angular/core';

let fakeSong = { id: 1, artist: 'bar', name: 'foo', cover: 'baz', file: '/' };
let fakeSongs = [fakeSong];

class MockSongService {
  allSongs: Song[] = fakeSongs;

  getSongById(id: number) {
    return of(this.allSongs.find((el) => el.id === id));
  }
}

class MockActivatedRoute {
  params = { get: (param: string) => 1 };
  paramMap = of(this.params);
}

describe('PlayerComponent', () => {
  let component: PlayerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlayerComponent,
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: SongService, useClass: MockSongService },
      ],
    });
    component = TestBed.inject(PlayerComponent);
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(PlayerComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    component.ngOnInit();
    expect(component.song).toEqual(fakeSong);
  });

  it('update progress should work', () => {
    let event = { target: { duration: 360.2, currentTime: 180.1 } };
    component.updateProgress(event);
    expect(component.progressPercent).toEqual(50);
    expect(component.duration).toEqual('06:00');
    expect(component.currentTime).toEqual('03:00');
  });

  it('togglePlay should work', () => {
    component.audio = { nativeElement: { play: () => {}, pause: () => {} } };
    component.togglePlay();
    expect(component.isPlaying).toBeFalsy();
    component.togglePlay();
    expect(component.isPlaying).toBeTruthy();
  });
});
