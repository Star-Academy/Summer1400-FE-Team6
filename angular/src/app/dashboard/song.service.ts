import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PagingOptions } from './allsongs/paging-options';
import { Song } from './song';
import {map, mergeMap} from 'rxjs/operators'
import { merge, Observable } from 'rxjs';

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
  constructor(private http: HttpClient) {}

  getSongs(pagingOptions: PagingOptions) {
    return this.http.post<{songs: Song[]}>(
      this.baseUrl + '/song/page',
      pagingOptions,
      this.httpOptions
    ).pipe(
      map((res) => res.songs)
    );
  }
}
