import { Component, OnInit } from '@angular/core';
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
  displayedSongs: Song[] = [];
  fetchedSongs: Song[] = [];
  isSearchboxOpen = false;
  isFetching!: boolean;
  options: PagingOptions & SearchOptions = {
    sorter: null,
    desc: false,
    current: 1,
    size: 10,
    count: 10,
    phrase: '',
  };
  sorters = [
    { value: null, viewValue: 'جدیدترین' },
    { value: 'name', viewValue: 'نام آهنگ' },
    { value: 'artist', viewValue: 'نام خواننده' },
  ];
  itemsPerPage = [10, 15, 20, 25];

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.getAllSongs();
  }

  trackById(index: number, song: Song) {
    return song.id;
  }

  getAllSongs() {
    this.isFetching = true;
    this.songService.getSongs(this.options).subscribe((songs) => {
      this.displayedSongs = songs;
      this.isFetching = false;
    });
  }

  findSong() {
    this.isFetching = true;
    this.songService.findSong(this.options).subscribe((songs) => {
      this.fetchedSongs = songs;
      this.pageFetchedSongs();
      this.isFetching = false;
    });
  }

  performSearch(searchedPhrase: string) {
    this.options.current = 1;
    this.options.phrase = searchedPhrase;
    if (!searchedPhrase) this.getAllSongs();
    else {
      this.findSong();
    }
  }

  pageFetchedSongs() {
    this.displayedSongs = this.fetchedSongs.slice(
      (this.options.current - 1) * this.options.size,
      this.options.current * this.options.size
    );
  }

  changeFilter(event: any) {
    this.options.current = 1;
    if (!this.options.phrase) {
      this.getAllSongs();
    } else {
      if (event.target.id === 'itemsPerPage') {
        this.pageFetchedSongs();
      } else {
        this.findSong();
      }
    }
  }

  nextPage() {
    this.options.current++;
    if (this.options.phrase) this.pageFetchedSongs();
    else this.getAllSongs();
  }

  previousPage() {
    this.options.current--;
    if (this.options.phrase) this.pageFetchedSongs();
    else this.getAllSongs();
  }

  isLastPage() {
    if (!this.options.phrase) return false;
    return this.fetchedSongs.length <= this.options.current * this.options.size;
  }
}
