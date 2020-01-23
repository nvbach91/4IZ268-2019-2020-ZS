// Services are an integral part of Angular applications. In Angular, a service is an instance of a class.
// Services are the place where you share data between parts of your application. 
// For the online store, the cart service is where you store your cart data and methods.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  favourites: string[] = [];

  addToFavourites(songName: string) {
    this.favourites.push(songName);
    console.log(this.favourites);
  }

  getFromFavourites() {
    return this.favourites;
  }

  clearFavourites() {
    this.favourites = [];
    return this.favourites;
  }

  constructor() { }


}
