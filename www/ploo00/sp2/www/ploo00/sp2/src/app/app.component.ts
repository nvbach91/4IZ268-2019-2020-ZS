import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Result } from './result';
import { SearchService } from './search.service';
import { Search } from './search';
import { FavouritesService } from './favourites.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent implements OnInit {
export class AppComponent {
  title = 'app1';
  split;
  xhr = new XMLHttpRequest();
  lyricsxhr = new XMLHttpRequest();
  input;
  youtubeVideo: SafeResourceUrl;

  upperCaseSplit: Array<string>;

  searchHeader: Search = {
    artist: '',
    title: ''
  };
  result: Result = {
    lyrics: null,
    error: null
  };
  searching: boolean = false;

  favourites;

  constructor(
    private searchService: SearchService,
    private favouriteService: FavouritesService,
    private changeDetector: ChangeDetectorRef
  ) { }

  getFromFavourites() {
    let result = this.favouriteService.getFromFavourites();
    this.changeDetector.markForCheck();
    return result;
  }


  Search() {
    let data = JSON.stringify({
      "key": "free",
      "id": "9m9c8U4f",
      "data": {
        "search": this.input
      }
    });

    this.xhr.addEventListener("readystatechange", () => {
      if (this.xhr.readyState === this.xhr.DONE) {
        this.Test(JSON.parse(this.xhr.response));
        this.result = {
          lyrics: null,
          error: null
        };
        this.searchHeader.artist = this.split.result[0].artist;
        this.searchHeader.title = this.split.result[0].songName;
        this.searchService.searchForLyrics(this.searchHeader)
          .subscribe(
            (data: Result) => {
              this.result.lyrics = data.lyrics;
              this.upperCaseSplit = data.lyrics.split(/(?=[A-Z])/);
              console.log(this.upperCaseSplit);
            },
            error => {
              this.result.error = error.error.error;
            }
          );
      }
    });

    this.xhr.open("POST", "https://macgyverapi-music-graph-v1.p.rapidapi.com/");
    this.xhr.setRequestHeader("x-rapidapi-host", "macgyverapi-music-graph-v1.p.rapidapi.com");
    this.xhr.setRequestHeader("x-rapidapi-key", "46b7fc600emsh628750cad11f12fp1d4efcjsn9a89619387de");
    this.xhr.setRequestHeader("content-type", "application/json");
    this.xhr.setRequestHeader("accept", "application/json");

    this.xhr.send(data);
  }

  // ngOnInit() {
  //   this.route.paramMap.subscribe(params => {
  //     this.favouriteService = this.favouriteService[+params.get('songName')];
  //   });
  // }

  addToFavourites() {
    window.alert('Your song has been added to favourites');
    this.favourites = this.getFromFavourites();
    this.favouriteService.addToFavourites(this.split.result[0].songName);
  }

  Test(response: any) {
    this.split = response;
    console.log(this.split);
    this.youtubeVideo = "https://www.youtube.com/embed/" + this.split.result[0].ytVideo;
  }

  Youtube() {
    return this.youtubeVideo;
  }
}

