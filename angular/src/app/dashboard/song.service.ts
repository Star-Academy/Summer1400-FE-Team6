import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PagingOptions } from './allsongs/paging-options';
import { Song } from './song';
import { map } from 'rxjs/operators';
import { SearchOptions } from './allsongs/search-options';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  baseUrl = 'https://songs.code-star.ir';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  likedSongs!: Song[];

  constructor(private http: HttpClient) {
    this.likedSongs = JSON.parse(localStorage.getItem('likedSongs') ?? '[]');
  }

  checkIsLiked(song: Song) {
    return this.likedSongs.some(el => el.id === song.id)
  }

  removeFromFavorite(song: Song) {
    let index = this.likedSongs.findIndex((el) => el.id === song.id);
    this.likedSongs.splice(index, 1);
    localStorage.setItem('likedSongs', JSON.stringify(this.likedSongs));
  }

  addToFavorite(song: Song) {
    this.likedSongs.push(song);
    localStorage.setItem('likedSongs', JSON.stringify(this.likedSongs));
  }

  getSongs(pagingOptions: PagingOptions) {
    return this.http
      .post<{ songs: Song[] }>(
        this.baseUrl + '/song/page',
        pagingOptions,
        this.httpOptions
      )
      .pipe(map((res) => res.songs));
  }
  findSong(searchOptions: SearchOptions) {
    return this.http
      .post<{ songs: Song[] }>(
        this.baseUrl + '/song/find',
        searchOptions,
        this.httpOptions
      )
      .pipe(map((res) => res.songs));
  }
}
