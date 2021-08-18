import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../song';
import { SongService } from '../song.service';
import { PagingOptions } from './paging-options';

@Component({
  selector: 'app-allsongs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.scss'],
})
export class AllSongsComponent implements OnInit {
  songs$!: Observable<Song[]>
  pagingOptions: PagingOptions = {
    sorter: null,
    size: 20,
    desc: false,
    current: 1,
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

  getSongs() {
    this.songs$ = this.songService.getSongs(this.pagingOptions);
  }
}
