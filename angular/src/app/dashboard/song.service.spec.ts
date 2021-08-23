import { TestBed } from '@angular/core/testing';

import { SongService } from './song.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('SongService', () => {
  let service: SongService;
  it('should be created', () => {
    service = new SongService({} as any);
    expect(service).toBeTruthy();
  });

  it('non http methods should work', () => {
    service = new SongService({} as any);
    let fakeSong = {
      id: 1,
      artist: 'foo',
      name: 'bar',
      cover: 'baz',
      file: '/',
    };
    expect(service.checkIsLiked(fakeSong)).toBeFalsy();
    service.addToFavorite(fakeSong);
    expect(service.checkIsLiked(fakeSong)).toBeTruthy();
    service.removeFromFavorite(fakeSong);
    expect(service.checkIsLiked(fakeSong)).toBeFalsy();
  });

  it('http methods should work', () => {
    let fakeSong = {
      id: 1,
      artist: 'foo',
      name: 'bar',
      cover: 'baz',
      file: '/',
    };
    let fakeSongs = [fakeSong];
    let http = {
      post: () => {
        return of({ songs: fakeSongs });
      },
      get: () => {
        return of({ song: fakeSong });
      },
    };
    service = new SongService(http as any);
    service
      .getSongById(fakeSong.id)
      .subscribe((song) => expect(song).toEqual(fakeSong));
    let pagingOptions = { sorter: null, desc: false, current: 1, size: 10 };
    service
      .getSongs(pagingOptions)
      .subscribe((songs) => expect(songs).toEqual(fakeSongs));
    let searchOptions = { sorter: null, desc: false, count: 10, phrase: 'foo' };
    service
      .findSong(searchOptions)
      .subscribe((songs) => expect(songs).toEqual(fakeSongs));
  });
});
