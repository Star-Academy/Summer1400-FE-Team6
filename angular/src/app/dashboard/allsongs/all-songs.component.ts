import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../song';
import { SongService } from '../song.service';
import { PagingOptions } from './paging-options';
import { SearchOptions } from './search-options';

@Component({
  selector: 'app-allsongs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.scss'],
})
export class AllSongsComponent implements OnInit {
  songs$!: Observable<Song[]>;
  pagingOptions: PagingOptions = {
    sorter: null,
    size: 10,
    desc: false,
    current: 1,
  };
  searchOptions: SearchOptions = {
    count: 10,
    phrase: '',
    desc: this.pagingOptions.desc,
    sorter: this.pagingOptions.sorter,
  };
  sorters = [
    { value: null, viewValue: 'جدیدترین' },
    { value: 'name', viewValue: 'نام آهنگ' },
    { value: 'artist', viewValue: 'نام خواننده' },
  ];
  itemsPerPage = [10, 15, 20, 25];

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.getSongs();
  }

  trackById(index: number, song: Song) {
    return song.id;
  }

  getSongs() {
    this.songs$ = this.songService.getSongs(this.pagingOptions);
  }

  searchSong() {
    if (!this.searchOptions.phrase) this.getSongs();
    else {
      this.songs$ = this.songService.findSong(this.searchOptions);
    }
  }
}
