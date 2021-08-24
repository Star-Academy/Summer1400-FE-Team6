import { SongComponent } from './song.component';
import { Song } from '../song';

class MockSongService {
  likedSongs: Song[] = [];
  checkIsLiked(song: Song) {
    return this.likedSongs.some((el) => el.id === song.id);
  }
  addToFavorite(song: Song) {
    this.likedSongs.push(song);
  }
  removeFromFavorite(song: Song) {
    let index = this.likedSongs.findIndex((el) => song.id === el.id);
    this.likedSongs.splice(index, 1);
  }
}

describe('SongComponent', () => {
  let component: SongComponent;
  it('should create', () => {
    component = new SongComponent({} as any);
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('liking should work', () => {
    let fakeSong: Song = {
      id: 1,
      name: 'foo',
      artist: 'bar',
      cover: 'baz',
      file: '/',
    };
    let mockSongService = new MockSongService();
    component = new SongComponent(mockSongService as any);
    component.song = fakeSong;
    expect(component.isLiked).toBeFalsy();
    component.toggleLike();
    expect(component.isLiked).toBeTruthy();
    component.toggleLike();
    expect(component.isLiked).toBeFalsy();
  });
});
