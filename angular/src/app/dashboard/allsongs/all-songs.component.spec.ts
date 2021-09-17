import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSongsComponent } from './all-songs.component';
import { Song } from '../song';
import { of } from 'rxjs';

let fakeSong = { id: 1, artist: 'bar', name: 'foo', cover: 'baz', file: '/' };
let fakeSongs = [fakeSong];

class MockSongService {
  allSongs: Song[] = fakeSongs;

  getSongs(options: any) {
    return of(this.allSongs);
  }

  findSong(options: any) {
    return of(this.allSongs);
  }
}

describe('AllSongsComponent', () => {
  let component: AllSongsComponent;

  it('should create', () => {
    let mockSongService = new MockSongService();
    component = new AllSongsComponent(mockSongService as any);
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('trackBy should work', () => {
    let mockSongService = new MockSongService();
    component = new AllSongsComponent(mockSongService as any);
    expect(component.trackById(0, fakeSong)).toEqual(1);
  });

  it('find song should work', () => {
    let mockSongService = new MockSongService();
    component = new AllSongsComponent(mockSongService as any);
    component.performSearch('foo');
    expect(component.displayedSongs).toEqual(fakeSongs);
    component.performSearch('');
    expect(component.displayedSongs).toEqual(fakeSongs);
  });

  it('change filter should work', () => {
    let mockSongService = new MockSongService();
    component = new AllSongsComponent(mockSongService as any);
    component.changeFilter({});
    expect(component.displayedSongs).toEqual(fakeSongs);
    component.options.phrase = 'foo';
    let event = { target: { id: 'itemsPerPage' } };
    component.changeFilter(event);
    event.target.id = 'foo';
    component.changeFilter(event);
  });

  it('paging should work', () => {
    let mockSongService = new MockSongService();
    component = new AllSongsComponent(mockSongService as any);
    component.nextPage();
    expect(component.options.current).toEqual(2);
    component.previousPage();
    expect(component.options.current).toEqual(1);
    component.options.phrase = 'foo';
    component.nextPage();
    component.previousPage();
    expect(component.isLastPage()).toBeTruthy();
    component.options.phrase = '';
    expect(component.isLastPage()).toBeFalsy();
  });
});
