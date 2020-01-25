import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Result } from './result';
import { Search } from './search';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  searchHeader: Search = {
    artist: '',
    title: ''
  };
  result: Result = {
    lyrics: null,
    error: null
  };

  upperCaseSplit: Array<string> = [] as Array<string>;

  split: any;

  inputSearch: string;

  favourites: Array<any>;

  first = true;
  firstAdd = true;

  youtubeVideo: SafeResourceUrl;


  constructor(
    private http: HttpClient,
    private changeDetector: ChangeDetectorRef,
    private spinnerService: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    const search = document.getElementById('searchForm');
    this.favourites = [] as Array<Result>;
    search.addEventListener('submit', () => {
      this.searchSong();
    });

  }

  changeSong(item: any) {
    this.split = item;
    this.searchHeader.artist = item.result[0].artist;
    this.searchHeader.title = item.result[0].songName;
    this.SearchLyrics(this.searchHeader);
    this.youtubeVideo = "https://www.youtube.com/embed/" + this.split.result[0].ytVideo;
  }


  addToFavourites(): boolean {
    for (const item of this.favourites) {
      if (this.split.result[0].songName === item.result[0].songName) {
        window.alert('Sorry, your song was already added.');
        return false;
      }
    }
    window.alert('Your song has been added to favourites.');
    this.favourites.push(this.split);
    return true;
  }



  searchForLyrics(search: Search) {
    return this.http.get(`https://api.lyrics.ovh/v1/${search.artist}/${search.title}`);
  }

  searchSong() {
    let queryParams = new HttpParams();
    let headerParams: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
    let requestOptions = {
      method: 'POST',
      headers: headerParams,
      params: queryParams,
      body: {
        "key": "free",
        "id": "9m9c8U4f",
        "data": {
          "search": this.inputSearch
        }
      }
    };
    this.spinnerService.show();
    this.http.request('POST', "https://macgyver.services/", requestOptions).subscribe(
      (response: any) => {
        console.log(response);
        if (!this.TestAPIDataResponse(response)) {
          this.split = null;
          this.first = false;
          return;
        }
         else if (response.result[0] == "off") {
          window.alert('Vysledek nenalezen');
          // this.split = null;
          this.first = false;
          return; 

        }
       
        this.result = {
          lyrics: null,
          error: null,
        };
        this.searchHeader.artist = this.split.result[0].artist;
        this.searchHeader.title = this.split.result[0].songName;
        this.SearchLyrics(this.searchHeader);
      },
      error => {
        this.spinnerService.hide();
        window.alert('Vysledek nenalezen. :(');
        console.log('error here')
      },
      () => {
        this.spinnerService.hide();
        console.log('completed here')
      },
    );
  }

  SearchLyrics(search: Search) {
    this.searchForLyrics(search)
      .subscribe(
        (data: Result) => {
          this.result.lyrics = data.lyrics;
          this.upperCaseSplit = data.lyrics.split(/(?=[A-Z])/);
          if (this.firstAdd) {
            this.firstAdd = false;
            const add = document.getElementById('favouritesForm');
            add.addEventListener('submit', () => {
              this.addToFavourites();
            });
          }
          this.spinnerService.hide();
        },
        error => {
          this.result.error = 'Lyrics not found :(';
          this.result.lyrics = "";
          this.upperCaseSplit = [this.result.error];
          this.spinnerService.hide();
        }
      );
  }



  TestAPIDataResponse(response): boolean {
    if (response.result[0] == "off") {
      return true;
    }
    // window.alert('Vysledek nenalezen');
    this.split = response;
    this.changeDetector.detectChanges();
    this.youtubeVideo = "https://www.youtube.com/embed/" + this.split.result[0].ytVideo;
    return true;
  }
}

// formular aby slo dat Enter
// podminka pridavani do oblibenych( kdyz je tak nepridavat)
// localstorage.setitem to favourites
// pri nacteni stranky zavolat localstorage.getitem favourites  