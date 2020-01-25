import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Search } from './search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient, ) { }

  searchForLyrics(search: Search) {
    // this.historyService.addSearch(search);
    return this.http.get(`https://api.lyrics.ovh/v1/${search.artist}/${search.title}`);
  }
}
