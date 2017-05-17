import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/RX';

@Injectable()
export class WeatherService{
  http;
  apiKey;
  conditionsUrl;
  searchUrl;

  static get parameters(){
    return [Http];
  }

  constructor(http){
    this.http = http;
    this.apiKey = 'a55c2d8da7411b58';
    this.conditionsUrl = 'http://localhost:8100/api/'+this.apiKey+'/conditions/q/';
    this.searchUrl = 'http://localhost:8100/search/aq?query=';
  }

  getWeather(zmw){
    return this.http.get(this.conditionsUrl+'/zmw:'+zmw+'.json').map(res => res.json());
  }

  searchCities(text){
    return this.http.get(this.searchUrl+''+text).map(res => res.json());
  }
}
